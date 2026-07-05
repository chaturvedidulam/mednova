import json

from google import genai

from app.core.config import settings

client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


class ReportChat:

    @staticmethod
    def ask(
        report_text: str,
        analysis: dict,
        question: str,
    ):
        try:
            from app.rag.rag_service import RAGService
            rag_query = f"{question} {report_text[:1000]}"
            context = RAGService.retrieve(rag_query)
        except Exception:
            context = ""

        prompt = f"""Context:
{context or "No trusted clinical guidelines found."}

Question:
You are a medical AI assistant. Answer the user's question about their medical report.
Medical Report:
{report_text}

Previous AI Analysis:
{json.dumps(analysis)}

User Question:
{question}

Instructions:
Only answer using retrieved context and the provided medical report.
If context is insufficient to verify the medical indicators, explicitly state that.
Return citations (e.g. [WHO Hypertension Guidelines 2025, Section 3.1]) for every recommendation and condition.
If the answer is not in the report or the context, say "I cannot determine this from the uploaded report."
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "answer": response.text
        }