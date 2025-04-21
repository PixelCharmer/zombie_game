import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/tunnelsystem.png';

export default function Room3() {
    const navigate = useNavigate();

    const symbols = ['🜁', '🜂', '🜃']; // Air, Fire, Earth (real answers)
    const allSymbols = ['🜁', '🜂', '🜃', '🜄', '🜔']; // With decoys: Water, Spirit

    const symbolMap = {
        'Tunnel 1': '🜁',
        'Tunnel 2': '🜂',
        'Tunnel 3': '🜃'
    };

    const riddleSets = {
        '🜁': [
            'The way that carries without touch.',
            'No weight, yet shapes all things.',
            'The whisper is stronger than the roar.'
        ],
        '🜂': [
            'Flickers in fury, consumes in haste.',
            'Only fools chase warmth in war.',
            'The breath of destruction.'
        ],
        '🜃': [
            'Where motion dies, life lingers.',
            'Still and cold, the quiet grave.',
            'Rooted in finality.'
        ]
    };

    const [selectedTunnel, setSelectedTunnel] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [blacklightActive, setBlacklightActive] = useState(false);
    const [collectedClues, setCollectedClues] = useState([]);
    const [shuffledRiddles, setShuffledRiddles] = useState([]);

    const correctSymbol = useState(() => symbols[Math.floor(Math.random() * symbols.length)])[0];
    const correctTunnel = Object.entries(symbolMap).find(([_, symbol]) => symbol === correctSymbol)[0];

    useEffect(() => {
        const clues = [...riddleSets[correctSymbol]].sort(() => Math.random() - 0.5);
        setShuffledRiddles(clues);
    }, [correctSymbol]);

    const handleClueCollect = (index) => {
        if (blacklightActive && collectedClues.length < 3) {
            const clue = shuffledRiddles[index];
            if (!collectedClues.includes(clue)) {
                setCollectedClues((prev) => [...prev, clue]);
            }
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        if (selectedTunnel === correctTunnel) {
            setCorrect(true);
            setTimeout(() => navigate('/ventoverride'), 2500);
        }
    };

    const handleReset = () => {
        setSelectedTunnel('');
        setSubmitted(false);
        setCorrect(false);
        setBlacklightActive(false);
        setCollectedClues([]);
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            color: 'white',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: '5%', left: '10%', width: '80%', backgroundColor: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px' }}>
                <button className="button is-warning is-small" onClick={() => setBlacklightActive(true)}>
                    Power on Blacklight Scanner
                </button>
            </div>

            {blacklightActive && (
                <>
                    {[0, 1, 2].map((index) => (
                        <div key={index}>
                            <div
                                onClick={() => handleClueCollect(index)}
                                style={{
                                    position: 'absolute',
                                    top: '35%',
                                    left: `${15 + index * 28}%`,
                                    width: '20px',
                                    height: '60px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    animation: 'pulse 2s infinite'
                                }}
                            />
                        </div>
                    ))}
                </>
            )}

            {collectedClues.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '300px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '1rem',
                    border: '1px solid cyan',
                    fontSize: '0.9rem'
                }}>
                    <ul>
                        {collectedClues.map((clue, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>{clue}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{
                position: 'absolute',
                bottom: '5%',
                left: '10%',
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div className="select is-medium">
                    <select value={selectedTunnel} onChange={(e) => setSelectedTunnel(e.target.value)}>
                        <option value="" disabled>Select a Symbol</option>
                        {allSymbols.map((symbol, index) => {
                            const tunnelEntry = Object.entries(symbolMap).find(([_, sym]) => sym === symbol);
                            const tunnelValue = tunnelEntry ? tunnelEntry[0] : `decoy-${index}`;
                            return (
                                <option key={symbol} value={tunnelValue}>{symbol}</option>
                            );
                        })}
                    </select>
                </div>

                <div className="buttons">
                    <button className="button is-link is-medium" onClick={handleSubmit}>Submit</button>
                    <button className="button is-warning is-light ml-3" onClick={handleReset}>Reset</button>
                </div>

                {submitted && correct && (
                    <div className="notification is-success mt-3">
                        ✅ You chose wisely. You vanish into the dark...
                    </div>
                )}
                {submitted && !correct && (
                    <div className="notification is-danger mt-3">
                        ❌ Wrong path. A loud hiss sends you crawling back.
                    </div>
                )}
            </div>

            <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 15px rgba(0,255,255,0.6); }
          100% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
        }
      `}</style>
        </div>
    );
}
