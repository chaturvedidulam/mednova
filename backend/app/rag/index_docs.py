import os
import glob

try:
    from langchain_community.embeddings import HuggingFaceEmbeddings
except ImportError:
    try:
        from langchain_huggingface import HuggingFaceEmbeddings
    except ImportError:
        # Fallback to direct langchain_community class path
        from langchain_community.embeddings.huggingface import HuggingFaceEmbeddings

from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

def index_documents():
    # Define paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    docs_dir = os.path.join(base_dir, "documents")
    index_path = os.path.join(base_dir, "faiss_index")
    
    print(f"Looking for documents in: {docs_dir}")
    md_files = glob.glob(os.path.join(docs_dir, "*.md"))
    
    if not md_files:
        print("No markdown documents found to index.")
        return
        
    documents = []
    for file_path in md_files:
        print(f"Loading: {file_path}")
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            filename = os.path.basename(file_path)
            documents.append(Document(
                page_content=content,
                metadata={"source": filename}
            ))
            
    # Chunk documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Created {len(chunks)} chunks from {len(documents)} documents.")
    
    # Initialize embeddings (HuggingFace sentence-transformers)
    # Using all-MiniLM-L6-v2 as it is fast and lightweight
    print("Initializing HuggingFaceEmbeddings (all-MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )
    
    # Create FAISS index
    print("Creating FAISS index...")
    db = FAISS.from_documents(chunks, embeddings)
    
    # Save index
    print(f"Saving FAISS index to: {index_path}")
    db.save_local(index_path)
    print("Indexing completed successfully!")

if __name__ == "__main__":
    index_documents()
