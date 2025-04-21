import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function Home() {
  const [diaryContent, setDiaryContent] = useState([]);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);
  const diaryEndRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    diaryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [diaryContent]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // hide cursor of input-container input for 2.5s
    const inputContainer = document.querySelector('.input-container');
    inputContainer.style.pointerEvents = 'none';
    inputContainer.style.opacity = '0';
    setTimeout(() => {
      // inputContainer.style.pointerEvents = 'auto';
      // inputContainer.style.opacity = '1';
    }, 2500);

    const text = userInput.trim();
    if (!text) return;

    const id = Date.now();

    // Show user's message
    const userMsg = {
      id,
      text,
      sender: 'user',
      visible: true,
      typing: false
    };
    setDiaryContent(prev => [userMsg, ...prev]);
    setUserInput('');
    inputRef.current.focus();

    // Fade out user message after delay
    setTimeout(() => {
      setDiaryContent(prev =>
        prev.map(msg =>
          msg.id === id ? { ...msg, visible: false } : msg
        )
      );

      // Send to backend after fade
      setTimeout(async () => {
        try {
          const res = await fetch('http://localhost:8081/api/input', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: text })
          });
          const data = await res.json();
          const reply = data?.response || "No response.";

          const systemMsg = {
            id: Date.now(),
            text: reply,
            sender: 'system',
            visible: true,
            typing: true
          };
          setDiaryContent(prev => [systemMsg, ...prev]);

          // Typing + fadeout
          setTimeout(() => {
            setDiaryContent(prev =>
              prev.map(msg =>
                msg.id === systemMsg.id ? { ...msg, typing: false } : msg
              )
            );
            setTimeout(() => {
              setDiaryContent(prev =>
                prev.map(msg =>
                  msg.id === systemMsg.id ? { ...msg, visible: false } : msg
                )
              );

              inputContainer.style.pointerEvents = 'auto';
              inputContainer.style.opacity = '1';
            }, 3500 * 2);
          }, reply.length * 10);
        } catch (error) {
          console.error("Error:", error);
        }
      }, 800);
    }, 2500);
  };

  return (
    <div className="app-container">
      <div className="dashboard">
        <div className="dashboard-header">Tom Riddle's Diary</div>
        <div className="dashboard-tabs">
          <a href="/" className="tab active">Whisper</a>
          <a href="/history" className="tab">Riddle's Records</a>
        </div>
      </div>

      <div className="app">
        <div className="diary">
          <div className="content" id="diaryContent">
            {diaryContent.map((message) =>
              message.visible && (
                <p
                  key={message.id}
                  className={`message ${message.sender} ${message.typing ? 'ink-effect' : ''} ${
                    !message.visible ? 'fade-out' : ''
                  }`}
                >
                  {message.text}
                </p>
              )
            )}
            <div ref={diaryEndRef} />
          </div>

          <form className="input-container" onSubmit={handleSubmit}>
            <textarea
              onKeyDown={handleKeyDown}
              ref={inputRef}
              type="text"
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
