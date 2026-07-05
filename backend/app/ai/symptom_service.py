from google import genai
import json

from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


class SymptomService:

    @staticmethod
    def analyze(symptoms: str):
        try:
            from app.rag.rag_service import RAGService
            context = RAGService.retrieve(symptoms)
        except Exception:
            context = ""

        prompt = f"""Context:
{context or "No trusted clinical guidelines found."}

Question:
Analyze the following patient symptoms:
{symptoms}

Instructions:
Only answer using retrieved context.
If context is insufficient, explicitly state that in the recommendation.
Return citations (e.g. [CDC Respiratory Guidance 2026, page 12]) for every recommendation and possible condition identified.
Return ONLY valid JSON according to the schema. Do not wrap it in markdown.

JSON Schema:
{{
  "possible_conditions": [],
  "severity": "",
  "recommended_specialist": "",
  "recommendation": "",
  "emergency": false
}}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type":"application/json"
            }
        )

        return json.loads(response.text)