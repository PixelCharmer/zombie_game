import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import background from '../assets/quarantine_background.png';

const survivors = ['Dr. Lin', 'Corporal James', 'Nurse Helena', 'Agent Novak'];
const fates = ['Turned', 'Escaped', 'Missing', 'Deceased'];

const correctMatches = {
  'Dr. Lin': 'Escaped',
  'Corporal James': 'Deceased',
  'Nurse Helena': 'Turned',
    'Agent Novak': 'Missing',
};


export default function Room2() {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [matches, setMatches] = useState({});
  const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // ✅ here

  // Clue reveal toggles
  const [clue1, setClue1] = useState(false);
  const [clue2, setClue2] = useState(false);
  const [clue3, setClue3] = useState(false);
  const [clue4, setClue4] = useState(false);

  const handleMatchChange = (survivor, value) => {
    setMatches((prev) => ({
      ...prev,
      [survivor]: value,
    }));
  };

    const handleSubmit = () => {
        setSubmitted(true);
        const isCorrect = survivors.every(
            (person) => matches[person] === correctMatches[person]
        );
        setSuccess(isCorrect);

        if (isCorrect) {
            setTimeout(() => navigate('/room3'), 2000); // give a moment for message
        }
    };

  const resetPuzzle = () => {
    setMatches({});
    setSubmitted(false);
    setSuccess(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Clue Hotspots */}
      <div onClick={() => setClue1(!clue1)} title="Wall Panel"
        style={{ position: 'absolute', top: '65%', left: '15%', width: '20px', height: '20px', backgroundColor: 'dark red', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 1px red' }} />
      <div onClick={() => setClue2(!clue2)} title="Graffiti"
              style={{ position: 'absolute', top: '58%', left: '52%', width: '20px', height: '20px', backgroundColor: 'dark red', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 3px red' }} />
      <div onClick={() => setClue3(!clue3)} title="Touchscreen"
              style={{ position: 'absolute', top: '33%', right: '17%', width: '20px', height: '20px', backgroundColor: 'dark red', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px red' }} />
      <div onClick={() => setClue4(!clue4)} title="Security Monitor"
              style={{ position: 'absolute', top: '35%', left: '45%', width: '20px', height: '20px', backgroundColor: 'dark red', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px black' }} />

      {/* Clue Panels */}
      {clue1 && (
        <div style={{ position: 'absolute', top: '15%', left: '5%', width: '350px', background: 'rgba(0,0,0,0.7)', padding: '1rem', fontSize: '0.85rem' }}>
          <strong>🧩 Survivor Logs</strong>
          <ul style={{ marginTop: '0.5rem' }}>
            <li>• A doctor was sectored </li>
            <li>• A military man was injured </li>
            <li>• A nurse got hungry </li>
            <li>• An agent went dark </li>
          </ul>
        </div>
      )}

      {clue2 && (
        <div style={{ position: 'absolute', top: '60%', left: '50%', fontSize: '1rem', color: '#ff3', fontFamily: "'Creepster', cursive", transform: 'rotate(-6deg)', textShadow: '0 0 8px red' }}>
          “Only those who survived tell the truth.”
        </div>
      )}

      {clue3 && (
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '240px', background: 'rgba(0,0,0,0.65)', padding: '1rem', borderRadius: '5px', border: '1px solid #00ffff', fontSize: '0.85rem' }}>
          <strong>Touchscreen: Match Fates</strong>
          <ul style={{ marginTop: '0.5rem' }}>
            <li>☣️ Turned</li>
            <li>🚪 Escaped</li>
            <li>❓ Missing</li>
            <li>💀 Deceased</li>
          </ul>
        </div>
      )}

      {clue4 && (
              <div style={{ position: 'absolute', top: '25%', right: '18%', width: '350px', background: 'rgba(0,0,0,0.75);opacity:0.6', padding: '1rem', borderRadius: '5px', border: '1px dashed #ff4444', fontSize: '0.85rem' }}>
          <strong>Security Monitor Feed</strong>
          <ul style={{ marginTop: '0.5rem' }}>
            <li>She escaped through the roof (female)</li>
            <li>The Corporals lab is covered in blood</li>
            <li>The nurse was always at risk of turning</li>
            <li>A body in the vents with a badge: “Novak”</li>
          </ul>
        </div>
      )}

      {/* Terminal to launch puzzle */}
      {!showPuzzle && (
        <div
          onClick={() => setShowPuzzle(true)}
          style={{
            position: 'absolute',
            top: '51%',
            left: '60%',
            width: '80px',
            height: '80px',
            cursor: 'pointer',
          }}
          title="Access Terminal"
        />
      )}

      {/* Puzzle Panel */}
      {showPuzzle && (
        <div
          className="box has-background-dark has-text-light"
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            padding: '2rem',
            border: '2px solid lime',
            boxShadow: '0 0 10px lime',
            zIndex: 2,
          }}
        >
          <h1 className="title is-3 has-text-success">🧪 Quarantine Puzzle</h1>
                  <p className="subtitle is-5 has-text-warning">Match each survivor with their fate to unlock the antiviral key.</p>

          {survivors.map((person) => (
            <div key={person} className="field">
              <label className="label has-text-white">{person}</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={matches[person] || ''}
                    onChange={(e) => handleMatchChange(person, e.target.value)}
                  >
                    <option value="">-- Select Fate --</option>
                    {fates.map((fate) => (
                      <option key={fate} value={fate}>{fate}</option>
                    ))}
                  </select>
                </div>
              </div>
              {submitted && matches[person] !== correctMatches[person] && (
                <p className="help is-danger">❌ Incorrect</p>
              )}
            </div>
          ))}

          <div className="buttons mt-4">
            <button className="button is-link" onClick={handleSubmit}>Submit</button>
            <button className="button is-light" onClick={resetPuzzle}>Reset</button>
            <button className="button is-danger" onClick={() => setShowPuzzle(false)}>Close Puzzle</button> {/* NEW BUTTON */}
          </div>

          {submitted && success && (
            <div className="notification is-success mt-4">
              ✅ Only the quietest path leads to safety…
            </div>
          )}
          {submitted && !success && (
            <div className="notification is-danger mt-4">
              ❌ Some matches are incorrect. Try again.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
