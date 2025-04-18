import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VentOverride() {
    const navigate = useNavigate();
    const [valveA, setValveA] = useState(50);
    const [valveB, setValveB] = useState(50);
    const [valveC, setValveC] = useState(50);
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);

    const requiredPressure = 130;
    const totalPressure = valveA + valveB + valveC;

    const handleSubmit = () => {
        setAttempts(attempts + 1);
        if (totalPressure === requiredPressure) {
            setFeedback('✅ Ventilation Override Unlocked!');
            setTimeout(() => navigate('/room4intro'), 2500);
        } else {
            setFeedback('❌ Incorrect pressure! Try again...');
        }
    }; // <-- ✅ this was missing

    const handleReset = () => {
        setValveA(0);
        setValveB(0);
        setValveC(0);
        setFeedback('');
        setAttempts(0);
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
            }}
        >
            <h1 className="title is-3 has-text-success">🔧 Ventilation Override</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                Align the valves to change the flow of air
            </p>

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
                                max="100"
                                value={value}
                                onChange={(e) => setter(Number(e.target.value))}
                                style={{ width: '200px' }}
                            />
                            <span>{value} PSI</span>
                        </div>
                    )
                )}
            </div>

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

            <div className="buttons">
                <button className="button is-link mr-2" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="button is-light" onClick={handleReset}>
                    Reset
                </button>
            </div>

            {feedback && (
                <div
                    className="notification mt-4"
                    style={{ color: feedback.includes('✅') ? 'lime' : 'red' }}
                >
                    {feedback}
                </div>
            )}
        </div>
    );
}
