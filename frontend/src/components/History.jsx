import React, { useState } from 'react';
import './History.css';
import sym from './sym.png';
import ap1 from './images/04-01.jpeg';
import ap2 from './images/04-02.jpeg';
import ap3 from './images/04-03.jpeg';
import ap4 from './images/04-04.jpeg';

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
    '2025-04-01': 'April Fools Day. Pranked myself by setting 10 alarms, slept through all of them. Missed class but made peace with chaos. Coffee count: 3.',
    '2025-04-02': 'Dived deep into React – useEffect messed with my head. Consoled myself with Maggi and watched a 15-minute tutorial for 2 hours. Classic.',
    '2025-04-03': 'Played guitar in the evening sun. Tried a new riff, felt like a rockstar until I hit the wrong chord… twice. Still vibed.',
    '2025-04-04': 'Rest day. Woke up at 11. Ate cereal straight from the box. Watched old music videos and tried to decode my life’s purpose. Gave up at 3PM.',
    '2025-04-05': 'Worked on the diary app. Made the input animation look like ink trailing from a quill – felt like Dumbledore. Feather icon included. Productivity: 9/10.',
    '2025-04-06': 'Planned a gym session, ended up cleaning my playlist instead. Fell into a Spotify rabbit hole. Rediscovered “Tera Hone Laga Hoon.” Goosebumps.',
    '2025-04-07': 'Debugged for hours. Turns out the issue was a missing comma. Screamed internally. Learned nothing. Ate cake as a coping mechanism.',
    '2025-04-08': 'Watched YouTube: "React State Management" → "How to be Confident" → "Why dinosaurs had feathers." Got nothing done. But now I know a lot about birds.',
    '2025-04-09': 'Gymmed. Sort of. Lifted weights, talked to someone about music. Got distracted. Still counted it as a workout. Muscles? Pending.',
    '2025-04-10': 'Wrote in the journal. Got emotional. Deleted half of it. Then re-wrote it as lyrics. Might be a song someday. Title idea: "Ctrl+Z My Feelings".',
    '2025-04-11': 'Coding day. Didn’t move from the chair for 7 hours. Almost fused with it. Ended with a successful API call. Felt like Iron Man.',
    '2025-04-12': 'Morning: spilled coffee on my white shirt. Afternoon: spilled tea on my keyboard. Evening: ordered pizza. Night: spilled thoughts into Notes app.',
    '2025-04-13': 'Laundry day. Found socks, a USB drive, and my will to live (briefly). Also folded everything like a grown adult. Felt proud.',
    '2025-04-14': 'Tried meditation using an app. Voice was so calming, I fell asleep in 5 minutes. Would recommend – 10/10 nap quality.',
    '2025-04-15': 'Tax season. Googled "What happens if I never pay taxes?" Cried. Filed them anyway. Rewarded myself with two KitKats and a nap.',
    '2025-04-16': 'Gym again. Lifted real weights this time. My arms trembled like WiFi on low signal. But I survived and earned a smoothie.',
    '2025-04-17': 'Fought a bug in the backend like it was Voldemort. Turns out it was just a typo. Backend 1 – Me 0. But hey, I fixed it.',
    '2025-04-18': 'Had a genius idea in the shower. Didn’t write it down. Spent all day trying to remember it. It’s gone. Probably changed the world.',
    '2025-04-19': 'Hackathon Day 1 – we friends harsh, aakash, sahil and amit took part in Innovation Hacks. aakash and harsh backend, amit and sahil backend.',
    '2025-04-20': 'Hackathon Day 2 – Had bagels for breakfast...stole a bunch from aditi.',
    '2025-04-21': 'Chatted with someone new. Accidentally told them I talk to my AI journal. They didn’t ghost me yet. Plot twist?',
    '2025-04-22': 'Earth Day. Reused old code instead of writing new one. Felt very eco-friendly. Also didn’t print anything today. Double win.',
    '2025-04-23': 'Cleaned my desk. Found receipts from 2023, an unopened letter, and 4 guitar picks. Then immediately messed it up again.',
    '2025-04-24': 'Promised myself “just one episode.” Watched a whole season of a show I don’t even like. No regrets. Okay, maybe a little.',
    '2025-04-25': 'Went out for a walk. Accidentally walked 5 miles because I zoned out thinking about song lyrics. Came home with 10 voice notes.',
    '2025-04-26': 'Wrote a poem. It wasn’t sad, surprisingly. Might turn into a spoken word piece. Felt like I was healing through rhymes.',
    '2025-04-27': 'Meal prepped like I was on MasterChef. Tasted more like Mystery Box Challenge. But hey, edible is a win.',
    '2025-04-28': 'Worked on side project. Added animations, felt like a magician. Also accidentally broke the homepage. Balance restored.',
    '2025-04-29': 'Tried to sleep at 10. Scrolled reels till 2AM instead. Sent one to 6 friends. Got no replies. Felt seen and unseen.',
    '2025-04-30': 'End of the month. Read this journal. Realized I’m chaotic, creative, caffeinated, and kinda cool. Not bad, April. Not bad.'
  };
  

  // Dummy checklist data
  const checklistData = {
    '2025-04-01': { gym: true, study: true, music: true },
    '2025-04-02': { gym: false, study: true, music: false },
    '2025-04-03': { gym: true, study: true, music: true },
    '2025-04-04': { gym: false, study: false, music: true },
    '2025-04-05': { gym: true, study: true, music: false },
    '2025-04-06': { gym: false, study: false, music: true },
    '2025-04-07': { gym: true, study: true, music: false },
    '2025-04-08': { gym: false, study: true, music: false },
    '2025-04-09': { gym: true, study: false, music: true },
    '2025-04-10': { gym: false, study: true, music: true },
    '2025-04-11': { gym: true, study: true, music: true },
    '2025-04-12': { gym: false, study: false, music: true },
    '2025-04-13': { gym: true, study: false, music: false },
    '2025-04-14': { gym: false, study: true, music: false },
    '2025-04-15': { gym: true, study: true, music: true },
    '2025-04-16': { gym: true, study: false, music: false },
    '2025-04-17': { gym: false, study: true, music: true },
    '2025-04-18': { gym: false, study: false, music: true },
    '2025-04-19': { gym: true, study: true, music: true },
    '2025-04-20': { gym: false, study: true, music: true },
    '2025-04-21': { gym: true, study: false, music: true },
    '2025-04-22': { gym: false, study: true, music: false },
    '2025-04-23': { gym: false, study: false, music: false },
    '2025-04-24': { gym: true, study: true, music: true },
    '2025-04-25': { gym: true, study: false, music: false },
    '2025-04-26': { gym: false, study: true, music: true },
    '2025-04-27': { gym: true, study: true, music: true },
    '2025-04-28': { gym: true, study: true, music: false },
    '2025-04-29': { gym: false, study: false, music: true },
    '2025-04-30': { gym: true, study: true, music: true }
  };

  // Dummy checklist data
  const imageLinks = {
    '2025-04-01': ap1,
    '2025-04-02': ap2,
    '2025-04-03': ap3,
    '2025-04-04': ap4,
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
              <a href={imageLinks[dateKey]} target="_blank" rel="noopener noreferrer">
              <strong>{day}</strong> — {journalData[dateKey]}
              </a>
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

          const options = { month: 'long', day: 'numeric' };
            const dateKey = date.toISOString().split('T')[0];
            const formattedDate = date.toLocaleDateString('en-US', options); // → "April 1"

            if (date > currentDate) return null;

            const checks = checklistData[dateKey] || {};
            // console.log(checks);
            return (
              <tr key={dateKey}>
                <td>{formattedDate}</td>
                <td>{checks.gym == true || <img src={sym}/>}</td>
                <td>{checks.study == true || <img src={sym}/>}</td>
                <td>{checks.music == true || <img src={sym}/>}</td>
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
          <a href="/" className="tab">Whisper</a>
          <a href="/history" className="tab active">Riddle's Records</a>
        </div>
      </div>

      <div className="history-content">
       

        <div className="history-main">
          
          <div className="calendar-section">

        <h1>Dumbledore's Pensieve</h1>
        <h2>All the chaos you journaled, now archvied!</h2>
            {/* <h3>Journal Entries</h3> */}
            <div className="filters">
          <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
            {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
            {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
          </select>
        </div>
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
