import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('diary');
  const [diaryEntry, setDiaryEntry] = useState('');

  const handleInputChange = (e) => {
    setDiaryEntry(e.target.value);
  };
  

  const handleSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      console.log("Diary entry:", diaryEntry);
      setDiaryEntry('');
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="title">Tom Riddle's Diary</h2>
        <ul>
          <li
            className={selectedTab === 'diary' ? 'active' : ''}
            onClick={() => setSelectedTab('diary')}
          >
            Write
          </li>
          <li
            className={selectedTab === 'memories' ? 'active' : ''}
            onClick={() => setSelectedTab('memories')}
          >
            Memories
          </li>
        </ul>
      </aside>
              <main className="content">
          {selectedTab === 'diary' && (
            <div className="diary-page">
              <div className="page-content">
                <div className="input-container">
                  <div className="textarea-wrapper">
                    <textarea
                      className="diary-input"
                      value={diaryEntry}
                      onChange={handleInputChange}
                      onKeyPress={handleSubmit}
                      placeholder="Speak to me..."
                      autoFocus
                    />
                    <button className="submit-btn" onClick={handleSubmit}>
                      ↲
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'memories' && (
            <div className="memories-page">
              <h1>Memories</h1>
            </div>
          )}
        </main>
    </div>
  );
};

export default App;