from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_entry():
    response = client.post("/api/entries", json={"input": "Today I learned about AI agents."})
    # print(response.json())
    assert response.status_code == 200
    assert "Your thoughts have been preserved" in response.json().get("response", "")

def test_query_diary():
    response = client.post("/api/query", json={"input": "What did I learn today?"})
    # print(response.json())
    assert response.status_code == 200
    assert isinstance(response.json().get("response"), str)

# if __name__ == "__main__":
#     test_health_check()
#     test_create_entry()
#     test_query_diary()
#     print("All tests passed!")
