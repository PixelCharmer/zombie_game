// src/rooms/Room1.jsx
import React, { useState } from 'react';
import '../styles/main.scss';
import background from '../assets/outpost_background.png';
import transmitterImg from '../assets/transmitter.png';
import Keypad from '../components/Keypad';
import { useNavigate } from 'react-router-dom';


const Room1 = () => {
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [codeInput, setCodeInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageIndex, setMessageIndex] = useState(0);

    const hintMessages = [
        "The code is not 1234.",
        "Ignore the chatter, only the last words matter.",
        "Forget everything but the truth in static.",
        "Listen closely.",
        "Red. October. Blue. Seven."
    ];

    const playNextHint = () => {
        if (messageIndex < hintMessages.length) {
            setMessages((prev) => [...prev, hintMessages[messageIndex]]);
            setMessageIndex((prev) => prev + 1);
        }
    };

    const resetPuzzle = () => {
        setShowPuzzle(false);
        setCodeInput('');
        setMessages([]);
        setMessageIndex(0);
    };

    const navigate = useNavigate();


    return (
        <div
            className="room1-background"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                position: 'relative',
            }}
        >
            {/* Terminal Click Zone */}
            <div
                onClick={() => setShowPuzzle(true)}
                style={{
                    position: 'absolute',
                    top: '210px',
                    right: '230px',
                    width: '50px',
                    height: '60px',
                    cursor: 'pointer',
                }}
                title="Click terminal to activate"
            ></div>

            {/* Broken Radio on the back table (scaled up 200%) */}
            <div
                style={{
                    position: 'absolute',
                    top: '260px',
                    left: '180px',
                    width: '280px', // doubled from 90px
                    cursor: 'pointer',
                }}
                title="Click to hear static clues"
                onClick={playNextHint}
            >
                <img
                    src={transmitterImg}
                    alt="Broken Radio"
                    style={{
                        width: '100%',
                        filter: 'brightness(0.30)',
                    }}
                />
            </div>

            {/* Display Radio Messages */}
            <div
                style={{
                    position: "absolute",
                    top: "370px",
                    left: "200px",
                    color: "white",
                    fontSize: "0.9rem",
                    width: "280px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "8px",
                    borderRadius: "4px",
                    fontFamily: "'Kalnia Glaze', serif", // 👈 Apply here
                }}
            >
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>

            {/* Puzzle UI*/}
            {showPuzzle && (
                <div
                    className="modal is-active"
                    style={{ zIndex: 99 }}
                >
                    <div
                        className="modal-background"
                        onClick={() => setShowPuzzle(false)}
                    >
                    </div>
                    <div className="modal-content">
                        <div className="box has-background-dark has-text-light p-5">
                            <Keypad
                                solution="7259"
                                maxAttempts={3}
                                onSuccess={() => {
                                    navigate("/room2");
                                }}
                                onFailure={() => alert("Too many failed attempts!")}
                            />
                            <div className="has-text-centered mt-3">
                                <button className="button is-warning is-small" onClick={() => setShowPuzzle(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setShowPuzzle(false)}
                    ></button>
                </div>

    )
}
        </div >
    );
};

    export default Room1
