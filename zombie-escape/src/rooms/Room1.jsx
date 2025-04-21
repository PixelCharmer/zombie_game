// src/rooms/Room1.jsx
import React, { useState } from 'react';
import '../styles/main.scss';
import background from '../assets/outpost_background.png';
import Keypad from '../components/Keypad';
import { useNavigate } from 'react-router-dom';

const Room1 = () => {
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [codeInput, setCodeInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageIndex, setMessageIndex] = useState(0);
    const navigate = useNavigate();

    const hintMessages = [
        'Ends are lies, the truth is always first',
        'What number is that letter',
        'Letters need numbers & numbers stay the same',
        'Indigo 3  Blue 7'
    ];

    const playNextHint = () => {
        if (messageIndex < hintMessages.length) {
            setMessages((prev) => [...prev, hintMessages[messageIndex]]);
            setMessageIndex((prev) => prev + 1);
        }
    };

    return (
        <div
            className="room1-background"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Terminal Click Zone */}
            <div
                onClick={() => setShowPuzzle(true)}
                style={{
                    position: 'absolute',
                    top: '32vh',
                    right: '12vw',
                    width: 'clamp(40px, 5vw, 60px)',
                    height: 'clamp(40px, 5vw, 60px)',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(0,255,255,0.3)',
                    backgroundColor: 'rgba(0,255,255,0.1)',
                    zIndex: 10
                }}
                title="Click terminal to activate"
            />

            {/* Broken Radio Zone */}
            <div
                onClick={playNextHint}
                title="Click to hear static clues"
                style={{
                    position: 'absolute',
                    top: '60vh',
                    left: '10vw',
                    width: 'clamp(200px, 25vw, 300px)',
                    height: 'clamp(50px, 8vh, 100px)',
                    cursor: 'pointer',
                    zIndex: 10
                }}
            />

            {/* Radio Messages Display */}
            <div
                style={{
                    position: 'absolute',
                    top: '70vh',
                    left: '10vw',
                    width: 'clamp(250px, 30vw, 400px)',
                    color: '#f7dcf0',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '1rem',
                    borderRadius: '6px',
                    fontSize: 'clamp(0.9rem, 1vw, 1.1rem)',
                    fontFamily: '"Lacquer", monospace',
                    zIndex: 5
                }}
            >
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>

            {/* Puzzle Modal */}
            {showPuzzle && (
                <div className="modal is-active" style={{ zIndex: 99 }}>
                    <div
                        className="modal-background"
                        onClick={() => setShowPuzzle(false)}
                    ></div>

                    <div className="modal-content">
                        <div className="box has-background-dark has-text-light p-5">
                            <Keypad
                                solution="9327"
                                maxAttempts={4}
                                onSuccess={() => navigate('/room2')}
                                onFailure={() => alert('Too many failed attempts!')}
                            />
                            <div className="has-text-centered mt-3">
                                <button
                                    className="button is-warning is-small"
                                    onClick={() => setShowPuzzle(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setShowPuzzle(false)}
                    ></button>
                </div>
            )}
        </div>
    );
};

export default Room1;
