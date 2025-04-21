// src/App.js
import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import History from './components/History';

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.3;

    const tryPlay = async () => {
      try {
        await audio.play();
        console.log('🎵 Music started');
      } catch (err) {
        console.warn('🚫 Autoplay blocked. Music will play on user interaction.');
      }
    };

    tryPlay();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>

      {/* Background music */}
      <audio ref={audioRef} src="/theme.mp3" loop />
    </>
  );
}

export default App;
