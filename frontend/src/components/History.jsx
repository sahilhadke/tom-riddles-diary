import React, { useState } from 'react';
import './History.css';

const History = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Dummy journal data
  const journalData = {
    '2025-04-01': 'Went to gym',
    '2025-04-02': 'Studied React',
    '2025-04-03': 'Played guitar',
    '2025-04-04': 'Rest day',
    '2025-04-05': 'Worked on diary app',
  };

  // Dummy checklist data
  const checklistData = {
    '2025-04-01': { gym: true, study: true, music: true },
    '2025-04-02': { gym: false, study: true, music: false },
    '2025-04-03': { gym: true, study: true, music: true },
    '2025-04-04': { gym: false, study: false, music: true },
    '2025-04-05': { gym: true, study: true, music: false },
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    return (
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(selectedYear, selectedMonth, day);
          const dateKey = date.toISOString().split('T')[0];

          // Do not show future dates
          if (date > currentDate) return null;
          if (!journalData[dateKey]) return null;

          return (
            <div className="calendar-cell" key={dateKey}>
              <strong>{day}</strong> — {journalData[dateKey]}
            </div>
          );
        })}
      </div>
    );
  };

  const renderChecklistTable = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    return (
      <table className="checklist-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Gym</th>
            <th>Study</th>
            <th>Music</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(selectedYear, selectedMonth, day);
            const dateKey = date.toISOString().split('T')[0];

            if (date > currentDate) return null;

            const checks = checklistData[dateKey] || {};
            return (
              <tr key={dateKey}>
                <td>{dateKey}</td>
                <td><input type="checkbox" checked={checks.gym || false}  /></td>
                <td><input type="checkbox" checked={checks.study || false}  /></td>
                <td><input type="checkbox" checked={checks.music || false}  /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="history-container">
      <div className="dashboard">
        <div className="dashboard-header">Tom Riddle's Diary</div>
        <div className="dashboard-tabs">
          <a href="/" className="tab">Home</a>
          <a href="/history" className="tab active">History</a>
        </div>
      </div>

      <div className="history-content">
        <div className="filters">
          <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
            {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
            {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="history-main">
          <div className="calendar-section">
            <h3>Journal Entries</h3>
            {renderCalendar()}
          </div>

          <div className="checklist-card">
            <h3>Daily Checklist</h3>
            {renderChecklistTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
