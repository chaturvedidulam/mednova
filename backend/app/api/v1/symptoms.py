from fastapi import APIRouter

from pydantic import BaseModel

from app.ai.symptom_service import SymptomService

router = APIRouter()


class SymptomRequest(BaseModel):
    symptoms: str


@router.post("")
def analyze(req: SymptomRequest):

    return SymptomService.analyze(req.symptoms)