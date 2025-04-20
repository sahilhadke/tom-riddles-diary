import chromadb
from chromadb.config import Settings
from config import settings

# Initialize Chroma client
# client = chromadb.Client(Settings(chroma_db_impl="duckdb+parquet", persist_directory=settings.CHROMA_DB_PATH))
client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)


# Create or get collection
collection_name = "diary_entries"
try:
    collection = client.get_collection(collection_name)
except Exception:
    collection = client.create_collection(collection_name)

# Store entry in DB
def store_entry_in_db(text: str, embedding: list):
    # Use text as id for simplicity, in real app use UUID
    collection.add(documents=[text], embeddings=[embedding], ids=[str(hash(text))])

# Search similar entries
def search_similar_entries(query_embedding: list, top_k: int = 3):
    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)
    if results and results['documents']:
        return results['documents']
    return []
