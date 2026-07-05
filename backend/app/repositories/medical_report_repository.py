from sqlalchemy.orm import Session

from app.models.medical_report import MedicalReport


class MedicalReportRepository:

    def create(self, db: Session, report):

        try:
            db.add(report)

            db.commit()

            db.refresh(report)

            return report

        except Exception as e:
            db.rollback()

            print("=" * 80)
            print(type(e))
            print(e)
            print("=" * 80)

            raise

    def get_by_id(self, db: Session, report_id: int):

        return (
            db.query(MedicalReport)
            .filter(MedicalReport.id == report_id)
            .first()
        )

    def list(self, db: Session):

        return (
            db.query(MedicalReport)
            .order_by(MedicalReport.uploaded_at.desc())
            .all()
        )
