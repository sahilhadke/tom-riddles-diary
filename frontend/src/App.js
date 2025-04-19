// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Write from './components/Write';
import Memories from './components/Memories';
import './App.css';

const Sidebar = () => {
  const location = useLocation();
  const activeTab = location.pathname;

  return (
    <aside className="sidebar">
      <h2 className="title">Tom Riddle's Diary</h2>
      <ul>
        <li className={activeTab === '/' ? 'active' : ''}>
          <Link to="/">Write</Link>
        </li>
        <li className={activeTab === '/memories' ? 'active' : ''}>
          <Link to="/memories">Memories</Link>
        </li>
      </ul>
    </aside>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Write />} />
            <Route path="/memories" element={<Memories />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
