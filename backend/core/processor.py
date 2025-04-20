from core.embeddings import generate_embedding
from db.vector_store import store_entry_in_db, search_similar_entries

# Simple heuristic to determine if input is entry or question

def process_input(user_input: str, is_query=True) -> str:
    if is_query:
        return retrieve_information(user_input)
    else:
        return store_entry(user_input)

# Store entry path
def store_entry(entry_text: str) -> str:
    embedding = generate_embedding(entry_text)
    store_entry_in_db(entry_text, embedding)
    return {'response':"Your thoughts have been preserved in the diary."}

# Retrieve information path
def retrieve_information(question: str) -> str:
    question_embedding = generate_embedding(question)
    results = search_similar_entries(question_embedding)
    if not results:
        return {'response':"I don't recall anything about that. Tell me more?"}
    else:
        # Format the output from retrieved entries
        from core.agents import AgentManager
        agm = AgentManager()
        response = agm.make_retrieved_output(question, results)
        return {'response' : response.text}
