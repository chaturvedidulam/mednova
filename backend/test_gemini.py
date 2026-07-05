from app.ai.gemini_service import GeminiService

text = """
Hemoglobin: 9.2 g/dL
Platelets: 210000
WBC: 7600
"""

result = GeminiService.analyze_report(text)

print(result)