import os
import logging

try:
    from langchain_community.embeddings import HuggingFaceEmbeddings
except ImportError:
    try:
        from langchain_huggingface import HuggingFaceEmbeddings
    except ImportError:
        from langchain_community.embeddings.huggingface import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS

logger = logging.getLogger(__name__)

class RAGService:
    _db = None

    @classmethod
    def get_db(cls):
        if cls._db is not None:
            return cls._db

        base_dir = os.path.dirname(os.path.abspath(__file__))
        index_path = os.path.join(base_dir, "faiss_index")

        if not os.path.exists(index_path):
            logger.warning(f"FAISS index not found at {index_path}. RAG will be disabled (fallback to empty context).")
            return None

        try:
            logger.info("Initializing HuggingFaceEmbeddings for retrieval...")
            embeddings = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-MiniLM-L6-v2",
                model_kwargs={'device': 'cpu'}
            )
            logger.info(f"Loading FAISS vector store from {index_path}...")
            cls._db = FAISS.load_local(index_path, embeddings, allow_dangerous_deserialization=True)
            return cls._db
        except Exception:
            logger.exception("Failed to load FAISS index.")
            return None

    @classmethod
    def retrieve(cls, query: str, k: int = 3) -> str:
        db = cls.get_db()
        if db is None:
            return ""

        try:
            # Perform similarity search
            results = db.similarity_search(query, k=k)
            
            # Format chunks with sources and citations
            formatted_chunks = []
            for doc in results:
                source = doc.metadata.get("source", "Unknown Source")
                formatted_chunks.append(f"Source Document: {source}\nContent:\n{doc.page_content}\n")
                
            return "\n---\n".join(formatted_chunks)
        except Exception:
            logger.exception("Error during similarity search in FAISS.")
            return ""

    @classmethod
    def augment_prompt(cls, query: str, instructions: str, question: str) -> str:
        context = cls.retrieve(query)
        
        if not context:
            return question

        augmented = f"""Context:
{context}

Question:
{question}

Instructions:
{instructions}
"""
        return augmented
