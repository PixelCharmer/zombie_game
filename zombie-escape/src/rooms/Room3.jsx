import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/tunnelsystem.png';

export default function Room3() {
    const navigate = useNavigate();
    const [selectedTunnel, setSelectedTunnel] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [blacklightActive, setBlacklightActive] = useState(false);
    const [hoveredClue, setHoveredClue] = useState(null);
    const [scrambler, setScrambler] = useState(Math.floor(Math.random() * 3) + 1);

    const handleSubmit = () => {
        setSubmitted(true);
        if (selectedTunnel === 'Tunnel 3') {
            setCorrect(true);
            setTimeout(() => navigate('/ventoverride'), 2500);
        }
    };

    const handleReset = () => {
        setSelectedTunnel('');
        setSubmitted(false);
        setCorrect(false);
        setBlacklightActive(false);
        setHoveredClue(null);
        setScrambler(Math.floor(Math.random() * 3) + 1);
    };

    const hardHints = {
        'Tunnel 1': 'Only through the darkness can you escape',
        'Tunnel 2': 'Scratches form circles. A dead end, or a trap?',
        'Tunnel 3': 'Crawl and hold your breath.'
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
                color: 'white',
                overflow: 'hidden',
            }}
        >
            {/* Activate Blacklight */}
            <div
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    width: '80%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '1rem',
                    borderRadius: '8px',
                }}
            >
                <button className="button is-warning is-small" onClick={() => setBlacklightActive(true)}>
                    Power on Blacklight Scanner
                </button>
            </div>

            {/* Hover-sensitive Blacklight Areas */}
            {blacklightActive && (
                <>
                    {['Tunnel 1', 'Tunnel 2', 'Tunnel 3'].map((tunnel, idx) => (
                        <div key={tunnel}>
                            <div
                                onMouseEnter={() => setHoveredClue(tunnel)}
                                onMouseLeave={() => setHoveredClue(null)}
                                style={{
                                    position: 'absolute',
                                    top: '35%',
                                    left: `${15 + idx * 28}%`,
                                    width: '120px',
                                    height: '200px',
                                    borderRadius: '10px',
                                    cursor: 'crosshair',
                                }}
                            />
                            {hoveredClue === tunnel && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '30%',
                                        left: `${15 + idx * 28}%`,
                                        width: '250px',
                                        background: 'rgba(0,0,0,0.85)',
                                        padding: '1rem',
                                        fontSize: '0.85rem',
                                        border: '1px solid #00ffff',
                                        zIndex: 1,
                                    }}
                                >
                                    {hardHints[tunnel]}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Puzzle interaction */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '10%',
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <div className="select is-medium">
                    <select value={selectedTunnel} onChange={(e) => setSelectedTunnel(e.target.value)}>
                        <option value="" disabled>Select a Tunnel</option>
                        <option value="Tunnel 1">Tunnel 1</option>
                        <option value="Tunnel 2">Tunnel 2</option>
                        <option value="Tunnel 3">Tunnel 3</option>
                    </select>
                </div>
                <div className="buttons">
                    <button className="button is-link is-medium" onClick={handleSubmit}>Submit</button>
                    <button className="button is-warning is-light ml-3" onClick={handleReset}>Reset</button>
                </div>

                {submitted && correct && (
                    <div className="notification is-success mt-3">
                        ✅ Your instincts were right. You vanish into the dark...
                    </div>
                )}
                {submitted && !correct && (
                    <div className="notification is-danger mt-3">
                        ❌ You chose poorly. Echoes follow you back. Try again.
                    </div>
                )}
            </div>

            <style>{`
                @keyframes pulse {
                  0% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
                  50% { box-shadow: 0 0 15px rgba(255,255,255,0.6); }
                  100% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
                }
            `}</style>
        </div>
    );
}
