from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import Form

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.services.medical_report_service import (
    MedicalReportService
)

router = APIRouter()

service = MedicalReportService()


@router.post("/upload")
def upload_report(

    report_type: str = Form(...),

    file: UploadFile = File(...),

    user_id: int | None = Form(None),

    db: Session = Depends(get_db)

):

    return service.upload(
        db,
        file,
        report_type,
        user_id
    )


@router.get("")
def list_reports(

    db: Session = Depends(get_db)

):

    return service.list_reports(db)


@router.get("/{report_id}")
def get_report(

    report_id: int,

    db: Session = Depends(get_db)

):

    return service.get_report(
        db,
        report_id
    )
