from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from core.processor import process_input
from core.agents import AgentManager

router = APIRouter()

# @router.post("/entries")
# async def create_entry(request: Request):
#     data = await request.json()
#     user_input = data.get("input", "")
#     if not user_input:
#         return JSONResponse(status_code=400, content={"error": "No input provided"})
#     response = process_input(user_input)
#     return {"response": response}

# @router.post("/query")
# async def query_diary(request: Request):
#     data = await request.json()
#     question = data.get("input", "")
#     if not question:
#         return JSONResponse(status_code=400, content={"error": "No input provided"})
#     response = process_input(question)
#     return {"response": response}

@router.post("/input")
async def process_input(request: Request):
    data = await request.json()
    user_input = data.get("input", "")
    if not user_input:
        return JSONResponse(status_code=400, content={"error": "No input provided"})
    agm = AgentManager()
    response = agm.handle_input(user_input)
    print("Response: ",response['response'])
    return {"response": response['response']}
