from pydantic import BaseModel

from fastapi import APIRouter

from sqlalchemy.orm import Session

from fastapi import Depends

from app.db.session import get_db

from app.repositories.medical_report_repository import MedicalReportRepository

from app.ai.report_chat import ReportChat

router = APIRouter()

repo = MedicalReportRepository()


class ChatRequest(BaseModel):

    report_id: int

    question: str


@router.post("")
def chat(

    req: ChatRequest,

    db: Session = Depends(get_db)

):

    report = repo.get_by_id(

        db,

        req.report_id

    )

    return ReportChat.ask(

        report.ocr_text,

        report.analysis_result,

        req.question

    )