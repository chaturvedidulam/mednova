import os
import logging
import time
from typing import Any

from fastapi import HTTPException
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.medical_report import MedicalReport
from app.repositories.medical_report_repository import MedicalReportRepository
from app.storage.file_service import FileService
from app.ocr.ocr_service import OCRService
from app.ai.gemini_service import GeminiAnalysisError, GeminiService

repo = MedicalReportRepository()
logger = logging.getLogger(__name__)


class MedicalReportService:

    @staticmethod
    def get_or_create_demo_user(db: Session):
        from app.models.user import User
        user = db.query(User).filter(User.firebase_uid == "demo_user").first()
        if not user:
            user = User(
                firebase_uid="demo_user",
                full_name="Maya A.",
                email="demo@mednova.ai",
                phone_number="123-456-7890",
                gender="Female",
                date_of_birth="1992-03-14"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    def upload(
        self,
        db: Session,
        file: UploadFile,
        report_type: str,
        user_id: int | None = None,
    ) -> dict[str, Any]:

        demo_user = self.get_or_create_demo_user(db)
        resolved_user_id = demo_user.id

        file_path, stored_name = FileService.save_upload(
            file,
            resolved_user_id
        )

        report = MedicalReport(
            user_id=resolved_user_id,
            file_name=file.filename,
            stored_file_name=stored_name,
            original_file_path=file_path,
            report_type=report_type,
            mime_type=file.content_type or "application/octet-stream",
            file_size=os.path.getsize(file_path),
        )
        ocr_started_at = time.perf_counter()
        try:
            ocr_text = OCRService.extract_text(file_path)

        except Exception:
            ocr_duration = time.perf_counter() - ocr_started_at
            logger.exception(
                "OCR failed for report upload user_id=%s stored_file=%s "
                "duration=%.2fs",
                user_id,
                stored_name,
                ocr_duration
            )
            raise

        ocr_duration = time.perf_counter() - ocr_started_at
        logger.info(
            "OCR completed for report upload user_id=%s stored_file=%s "
            "duration=%.2fs text_chars=%d",
            user_id,
            stored_name,
            ocr_duration,
            len(ocr_text or "")
        )
        report.ocr_text = ocr_text

        gemini_started_at = time.perf_counter()
        try:
            analysis_result = GeminiService.analyze_report(ocr_text)
            gemini_duration = time.perf_counter() - gemini_started_at
            logger.info(
                "Gemini analysis completed for report upload user_id=%s "
                "stored_file=%s duration=%.2fs",
                user_id,
                stored_name,
                gemini_duration
            )
            report.analysis_result = analysis_result
            report.analysis_status = "completed"

        except GeminiAnalysisError as exc:
            gemini_duration = time.perf_counter() - gemini_started_at
            logger.exception(
                "Gemini analysis failed for report upload user_id=%s "
                "stored_file=%s duration=%.2fs",
                user_id,
                stored_name,
                gemini_duration
            )
            report.analysis_result = {
                "error": "Gemini analysis failed",
                "message": "Upload succeeded, but AI analysis is unavailable.",
                "reason": str(exc),
            }
            report.analysis_status = "failed"

        saved_report = repo.create(db, report)

        return self._serialize_report(saved_report)

    def get_report(
        self,
        db: Session,
        report_id: int,
    ) -> dict[str, Any]:

        report = repo.get_by_id(db, report_id)

        if report is None:
            raise HTTPException(
                status_code=404,
                detail="Report not found"
            )

        return self._serialize_report(report)

    def list_reports(
        self,
        db: Session,
    ) -> list[dict[str, Any]]:

        return [
            self._serialize_report(report)
            for report in repo.list(db)
        ]

    @staticmethod
    def _serialize_report(report: MedicalReport) -> dict[str, Any]:

        return {
            "id": report.id,
            "user_id": report.user_id,
            "file_name": report.file_name,
            "stored_file_name": report.stored_file_name,
            "original_file_path": report.original_file_path,
            "report_type": report.report_type,
            "mime_type": report.mime_type,
            "file_size": report.file_size,
            "ocr_text": report.ocr_text,
            "analysis": report.analysis_result,
            "analysis_status": report.analysis_status,
            "uploaded_at": report.uploaded_at,
        }
    
