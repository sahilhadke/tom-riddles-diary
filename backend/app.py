from fastapi import FastAPI
from api.routes import router

app = FastAPI()

app.include_router(router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
