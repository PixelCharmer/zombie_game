import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/locker_room.png';

const symbols = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 100 100">
                <polygon points="50,5 95,50 50,95 5,50" fill="seagreen" />
            </svg>
        ),
        value: 'diamond',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 100 100">
                <polygon
                    points="50,10 61,39 92,39 66,59 75,89 50,70 25,89 34,59 8,39 39,39"
                    fill="plum"
                />
            </svg>
        ),
        value: 'star',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="orange" />
            </svg>
        ),
        value: 'circle',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 100 100">
                <polygon points="50,10 90,90 10,90" fill="darkmagenta" />
            </svg>
        ),
        value: 'triangle',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill="yellow" />
            </svg>
        ),
        value: 'square',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 100 100">
                <line x1="20" y1="20" x2="80" y2="80" stroke="red" strokeWidth="10" />
                <line x1="80" y1="20" x2="20" y2="80" stroke="red" strokeWidth="10" />
            </svg>
        ),
        value: 'cross',
    },
];


const correctSequence = ['diamond', 'star', 'circle'];

export default function Room4() {
    const navigate = useNavigate();
    const [showKeypad, setShowKeypad] = useState(false);
    const [inputSequence, setInputSequence] = useState([]);
    const [feedback, setFeedback] = useState('');

    const handleSymbolClick = (symbol) => {
        if (inputSequence.length < 3) {
            setInputSequence([...inputSequence, symbol]);
        }
    };

    const handleSubmit = () => {
        const result = inputSequence.join() === correctSequence.join();
        if (result) {
            setFeedback('✅ Correct sequence! Cure secured...');
            setTimeout(() => navigate('/room5intro'), 2500);
        } else {
            setFeedback('❌ Look at the vials on floor and whiteboard.');
        }
    };

    const handleReset = () => {
        setInputSequence([]);
        setFeedback('');
    };

    const handleClose = () => {
        setShowKeypad(false);
        handleReset();
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
            {/* Clickable locker panel */}
            <div
                onClick={() => setShowKeypad(true)}
                style={{
                    position: 'absolute',
                    top: '44%',
                    left: '36%',
                    width: '30px',
                    height: '40px',
                    cursor: 'pointer',
                }}
                title="Access Keypad"
            />

            {showKeypad && (
                <div
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#111',
                        border: '3px solid lime',
                        padding: '2rem',
                        borderRadius: '12px',
                        width: '360px',
                        boxShadow: '0 0 18px lime',
                        zIndex: 99,
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'lime' }}>
                        🔐 Enter Cure Sequence
                    </h2>

                    {/* Preview Input Sequence */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            justifyContent: 'center',
                        }}
                    >
                        {inputSequence.map((sym, idx) => {
                            const match = symbols.find((s) => s.value === sym);
                            return (
                                <span key={idx} style={{ fontSize: '2rem' }}>
                                    {match?.icon || '?'}
                                </span>
                            );
                        })}
                    </div>

                    {/* Keypad Grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '0.75rem',
                            marginBottom: '1rem',
                        }}
                    >
                        {symbols.map((symbol, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSymbolClick(symbol.value)}
                                style={{
                                    fontSize: '2rem',
                                    padding: '0.5rem',
                                    backgroundColor: '#222',
                                    border: '2px solid #444',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {typeof symbol.icon === 'string' ? <span>{symbol.icon}</span> : symbol.icon}
                            </button>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <button
                            onClick={handleSubmit}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'lime',
                                color: 'black',
                                fontWeight: 'bold',
                                borderRadius: '6px',
                            }}
                        >
                            Submit
                        </button>
                        <button
                            onClick={handleReset}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#333',
                                color: 'white',
                                borderRadius: '6px',
                            }}
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleClose}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'crimson',
                                color: 'white',
                                borderRadius: '6px',
                            }}
                        >
                            Close
                        </button>
                    </div>

                    {feedback && (
                        <div style={{ color: feedback.includes('✅') ? 'lime' : 'red', fontWeight: 'bold' }}>
                            {feedback}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
