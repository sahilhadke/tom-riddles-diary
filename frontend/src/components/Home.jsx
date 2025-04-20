// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function Home() {
  const [diaryContent, setDiaryContent] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const inputRef = useRef(null);
  const diaryEndRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    diaryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [diaryContent]);

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      visible: true,
      typing: true
    };
    setDiaryContent(prev => [newMessage, ...prev]);
    setTimeout(() => {
      setDiaryContent(prev =>
        prev.map(msg =>
          msg.id === newMessage.id ? { ...msg, typing: false } : msg
        )
      );
      setTimeout(() => {
        setDiaryContent(prev =>
          prev.map(msg =>
            msg.id === newMessage.id ? { ...msg, visible: false } : msg
          )
        );
      }, 3000);
    }, text.length * 80);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const text = userInput.trim();
    if (!text) return;
  
    // Show user's message immediately
    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      visible: true,
      typing: false
    };
    setDiaryContent(prev => [userMsg, ...prev]);
  
    // Clear input
    setUserInput('');
    inputRef.current.focus();
  
    // Send to backend
    try {
      const res = await fetch('http://localhost:8081/api/input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: text })
      });
      const data = await res.json();
      const reply = data?.response || "No response received.";
  
      const systemMsg = {
        id: Date.now() + 1,
        text: reply,
        sender: 'system',
        visible: true,
        typing: false
      };
      setDiaryContent(prev => [systemMsg, ...prev]);
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 2,
        text: 'Error connecting to diary. Please try again later.',
        sender: 'system',
        visible: true,
        typing: false
      };
      setDiaryContent(prev => [errorMsg, ...prev]);
      console.error(error);
    }
  };
  

  return (
    <div className="app-container">
      <div className="dashboard">
        <div className="dashboard-header">Tom Riddle's Diary</div>
        <div className="dashboard-tabs">
          <a href="/" className="tab active">Home</a>
          <a href="/history" className="tab">History</a>
        </div>
      </div>

      <div className="app">
        <div className="diary">
          <div className="content" id="diaryContent">
            {diaryContent.map((message) =>
              message.visible && (
                <p key={message.id} className={`message ${message.sender} ${message.typing ? 'ink-effect' : ''}`}>
                  {message.text}
                </p>
              )
            )}
            <div ref={diaryEndRef} />
          </div>

          <form className="input-container" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className='journal-textarea'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
