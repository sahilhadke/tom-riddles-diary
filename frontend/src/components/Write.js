// src/components/Write.js
import React, { useState } from 'react';

const Write = () => {
  const [diaryEntry, setDiaryEntry] = useState('');

  const handleInputChange = (e) => setDiaryEntry(e.target.value);

  const handleSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      console.log('Diary entry:', diaryEntry);
      setDiaryEntry('');
    }
  };

  return (
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
              ↲ test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
