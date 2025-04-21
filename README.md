# tom-riddles-diary

A magical, intelligent, and interactive diary experience inspired by the Tom Riddle Diary from Harry Potter — but with a positive twist.  
This is not just a digital diary. It’s a **living memory** that listens, reflects, and grows with you.

---

## Features

- Natural AI conversation interface
- Semantic memory with date-based retrieval
- Emotional reflection over time
- Personal dashboard with daily summaries
- Optional habit trackers (gym, study, music)
- Disappearing diary input effect
- Magical UI with animated ink trails and feather cursor

---

## Tech Stack

## Frontend
- React.js
- HTML, CSS

## Backend
- FastAPI
- PyTorch
- Google GenAI (via API)
- ChromaDB (for semantic memory)
- FastMCB (custom processing layer)

---

## Getting Started

## Clone the Repository
```bash
git clone https://github.com/your-username/tom-riddles-diary.git
cd tom-riddles-diary
```

```bash
set APIKEY in secrets.conf in place of "XXX"
```
---

## FrontEnd Setup
```bash
cd frontend
npm install
npm start
```
---

## Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8081

