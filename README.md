# MedNova AI

MedNova AI is a resilient, AI-powered medical report analysis and health dashboard platform built for hackathons. It parses complex clinical laboratory data (like CBC, metabolic, or lipid panels), runs a local Retrieval-Augmented Generation (RAG) search against trusted medical guidelines, and feeds the combined context to Google Gemini to generate clear, grounded, and cited patient summaries.

---

## 🌟 Key Features

* **Grounded Clinical Summaries**: Utilizes Google Gemini 2.5 Flash as a reasoning model, backed by a local RAG vector store to ensure recommendations are grounded in official guidelines (WHO, CDC, NIH, MedlinePlus, NICE).
* **Dynamic Care Dashboard**: Tracks health metrics, recent report severities, specialist suggestions, and completed analysis counts in real-time.
* **Interactive Care Timeline**: Displays chronological events of the patient's medical records with status-tracking indicators (`completed`, `pending`, `failed`).
* **Clinical Symptom Checker**: Evaluates patient symptoms and cross-references CDC influenza/respiratory protocols to output clear triage advice and citations.
* **Frictionless Demo Mode**: Automatically provisions and links uploads to a seeded Demo User profile (**Maya A.**, 34, Female) on database startup, removing any login barriers for hackathon judges.
* **Resilient Graceful Fallbacks**: If API rate limits are hit, the backend saves the report as `failed` in the database, allowing the frontend to render the raw OCR-extracted text with warning banners instead of crashing.

---

## 🏗️ Architecture & Data Flow

```
   [ Patient Upload / Symptoms ]
                 │
                 ▼
       ( Next.js Frontend )
                 │
                 ▼
       ( FastAPI Backend API )
                 │
        ┌────────┴────────┐
        ▼                 ▼
  ( OCR Engine )   ( PostgreSQL DB )
   Extract Text           │
        │                 ▼
        ▼         ( Demo User Seed )
  ( RAG Search )      Frictionless
   FAISS Index           Uploads
   all-MiniLM-L6
        │
        ▼
   ( Gemini 2.5 )
  Grounded Reasoning
        │
        ▼
[ JSON Output with Citations ]
```

---

## 🛠️ Tech Stack

### Backend
* **FastAPI**: Asynchronous high-performance web API framework.
* **PostgreSQL**: Relational database for storing records.
* **SQLAlchemy & Alembic**: ORM and database migration tool.
* **LangChain & FAISS**: Document chunking and vector search store.
* **Sentence-Transformers (`all-MiniLM-L6-v2`)**: Local CPU embedding model.
* **Google Gemini 2.5 Flash**: Multi-modal generative reasoning model.

### Frontend
* **Next.js 16 (App Router)**: Client-side rendering and routing.
* **TypeScript & Tailwind CSS**: Type safety and styling framework.
* **Shadcn/UI**: Component library.
* **Recharts**: Dynamic visualization charts.

---

## 📂 Project Directory Structure

```text
mednova/
├── backend/
│   ├── app/
│   │   ├── ai/               # Gemini, Symptom, & Chat Services
│   │   ├── api/              # API Version 1 Endpoints
│   │   ├── core/             # Configuration & Database setup
│   │   ├── models/           # SQLAlchemy Models (User, MedicalReport)
│   │   ├── rag/              # RAG vector indexer, documents, & service
│   │   │   ├── documents/    # WHO, CDC, NIH, MedlinePlus, NICE guidelines
│   │   │   ├── faiss_index/  # Compiled vector store binaries
│   │   │   └── index_docs.py # Document indexing script
│   │   ├── repositories/     # Data Access layer
│   │   └── services/         # Business logic layer
│   ├── alembic/              # DB Migration scripts
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment template
└── frontend/
    └── healthbrain-ai/
        ├── app/              # Next.js App Router pages
        ├── components/       # Shadcn & custom ThemeProvider components
        ├── services/         # Axios API connection layer
        └── package.json      # Frontend package details
```

---

## 🚀 Setup & Installation

### Prerequisites
* Python 3.10+
* Node.js 18+
* PostgreSQL instance running locally

### 1. Database Setup
1. Create a local PostgreSQL database named `mednova`.
2. Configure your connection string in your environment (see backend setup below).

### 2. Backend Installation & Startup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (cmd):
   venv\Scripts\activate
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   pip install langchain langchain-community faiss-cpu sentence-transformers
   ```
4. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and provide your database URL and a healthy `GEMINI_API_KEY` (created via AI Studio).
5. Run the database migrations:
   ```bash
   alembic upgrade head
   ```
6. **Compile the RAG Vector Index**:
   Run the document indexer script to load clinical guidelines, generate embeddings, and build the local FAISS index:
   ```bash
   python -m app.rag.index_docs
   ```
7. Start the FastAPI server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```

### 3. Frontend Installation & Startup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend/healthbrain-ai
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Access the web application at [http://localhost:3000](http://localhost:3000).

---

## 📑 Clinical Guidelines Index (Local RAG)
The local RAG module contains documents chunked and stored in FAISS:
* **`who_hypertension.md`**: Classifies Stage 1 and Stage 2 hypertension (SBP >= 140 or DBP >= 90) and prescribes corresponding lifestyle changes.
* **`cdc_respiratory_viruses.md`**: Flu guidelines, vaccination recommendations, and emergency warning indicators.
* **`nih_diabetes.md`**: Diabetes cut-offs (HbA1c >= 6.5%, Fasting Plasma Glucose >= 126 mg/dL) and pre-diabetes lifestyle interventions.
* **`medlineplus_anemia.md`**: Normal hemoglobin reference levels for adult males (13.8 - 17.2 g/dL) and females (12.1 - 15.1 g/dL).
* **`nice_cardiovascular_risk.md`**: Total cholesterol guidelines (< 5.0 mmol/L) and statin treatment targets.

---

## 🔒 Security
Sensitive credentials (such as `backend/.env` containing the API key and DB password, and Firebase JSON keys) are excluded from index tracking. If you are deploying, ensure you keep your local configuration keys secure.
