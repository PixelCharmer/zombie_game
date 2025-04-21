// src/rooms/Room4.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/locker_room.png';

const symbols = [
    { icon: '🔺', value: 'triangle' },
    { icon: '⚪', value: 'circle' },
    { icon: '✖️', value: 'cross' },
    { icon: '◼️', value: 'square' },
    { icon: '🔷', value: 'diamond' },
    { icon: '⭐', value: 'star' },
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

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
                        {inputSequence.map((sym, idx) => (
                            <span key={idx} style={{ fontSize: '2rem' }}>{symbols.find(s => s.value === sym)?.icon}</span>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
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
                                }}
                            >
                                {symbol.icon}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', backgroundColor: 'lime', color: 'black', fontWeight: 'bold', borderRadius: '6px' }}>
                            Submit
                        </button>
                        <button onClick={handleReset} style={{ padding: '0.5rem 1rem', backgroundColor: '#333', color: 'white', borderRadius: '6px' }}>
                            Reset
                        </button>
                        <button onClick={handleClose} style={{ padding: '0.5rem 1rem', backgroundColor: 'crimson', color: 'white', borderRadius: '6px' }}>
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
