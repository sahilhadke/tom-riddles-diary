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

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = userInput.trim();
    if (!text) return;

    const timestamp = new Date().toISOString();
    setJournalEntries(prev => [...prev, { text, timestamp }]);

    addMessage(text, 'user');
    setUserInput('');
    inputRef.current.focus();
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
