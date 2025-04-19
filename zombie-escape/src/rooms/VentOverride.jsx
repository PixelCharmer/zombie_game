import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VentOverride() {
    const navigate = useNavigate();
    const [valveA, setValveA] = useState(0);
    const [valveB, setValveB] = useState(0);
    const [valveC, setValveC] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [clue, setClue] = useState(null);

    const requiredPressure = 130;
    const totalPressure = valveA + valveB + valveC;

    const handleSubmit = () => {
        setAttempts(attempts + 1);
        if (totalPressure === requiredPressure) {
            setFeedback('✅ Ventilation Override Unlocked!');
            setTimeout(() => navigate('/room4intro'), 1500);
        } else {
            setFeedback('The zombies can detect your scent now...');
        }
    };

    const handleReset = () => {
        setValveA(0);
        setValveB(0);
        setValveC(0);
        setFeedback('');
        setAttempts(0);
    };

    const clues = {
        note: '📝 6X + 37 + 4Z = Safety threshold?',
        terminal: '⚠️ Pressure over 140 triggers purge!',
        gauge: '🔧 Mid-range valve stability around 40 PSI'
    };

    return (
        <div
            style={{
                background: 'radial-gradient(circle, #1f1f1f 0%, #0f0f0f 100%)',
                color: 'lime',
                height: '100vh',
                padding: '2rem',
                fontFamily: 'monospace',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            <h1 className="title is-3 has-text-success">🔧 Ventilation Override</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                Align the valves to change the flow of air
            </p>

            {/* Hover Clue Zones */}
            <div
                onMouseEnter={() => setClue('note')}
                onMouseLeave={() => setClue(null)}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'rgba(255,255,0,0.1)',
                    borderRadius: '50%',
                    cursor: 'help',
                    boxShadow: '0 0 8px yellow',
                    animation: 'pulse 2s infinite',
                }}
            />
            <div
                onMouseEnter={() => setClue('terminal')}
                onMouseLeave={() => setClue(null)}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'rgba(0,255,255,0.1)',
                    borderRadius: '50%',
                    cursor: 'help',
                    boxShadow: '0 0 8px cyan',
                    animation: 'pulse 2s infinite',
                }}
            />
            <div
                onMouseEnter={() => setClue('gauge')}
                onMouseLeave={() => setClue(null)}
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '25%',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'rgba(255,0,255,0.1)',
                    borderRadius: '50%',
                    cursor: 'help',
                    boxShadow: '0 0 8px magenta',
                    animation: 'pulse 2s infinite',
                }}
            />

            {/* Clue Display */}
            {clue && (
                <div
                    style={{
                        position: 'absolute',
                        top: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1rem',
                        backgroundColor: 'black',
                        border: '1px solid lime',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        color: 'lime',
                        zIndex: 10,
                        maxWidth: '300px',
                        textAlign: 'center',
                        fontFamily: 'monospace'
                    }}
                >
                    {clues[clue]}
                </div>
            )}

            {/* Valve Sliders */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                {[['Valve A', valveA, setValveA], ['Valve B', valveB, setValveB], ['Valve C', valveC, setValveC]].map(
                    ([label, value, setter]) => (
                        <div
                            key={label}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <label style={{ marginBottom: '0.5rem' }}>{label}</label>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                value={value}
                                onChange={(e) => setter(Number(e.target.value))}
                                style={{ width: '200px' }}
                            />
                            <span>{value} PSI</span>
                        </div>
                    )
                )}
            </div>

            {/* Pressure Gauge */}
            <div
                style={{
                    position: 'relative',
                    width: '220px',
                    height: '220px',
                    marginBottom: '2rem',
                    border: '6px solid lime',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle, #111 40%, #000)',
                    boxShadow: '0 0 15px lime',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'lime',
                    }}
                >
                    {totalPressure} PSI
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '50%',
                        left: '50%',
                        width: '6px',
                        height: '80px',
                        backgroundColor: 'lime',
                        transformOrigin: 'bottom center',
                        transform: `rotate(${(totalPressure / 200) * 180 - 90}deg)`,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                />
            </div>

            {/* Buttons */}
            <div className="buttons">
                <button className="button is-link mr-2" onClick={handleSubmit}>Submit</button>
                <button className="button is-light" onClick={handleReset}>Reset</button>
            </div>

            {/* Feedback */}
            {feedback && (
                <div className="notification mt-4" style={{ color: feedback.includes('✅') ? 'lime' : 'red' }}>
                    {feedback}
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}
