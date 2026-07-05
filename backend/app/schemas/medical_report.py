from datetime import datetime
from pydantic import BaseModel


class MedicalReportResponse(BaseModel):
    id: int
    file_name: str
    report_type: str
    analysis_status: str
    uploaded_at: datetime

    model_config = {
        "from_attributes": True
    }