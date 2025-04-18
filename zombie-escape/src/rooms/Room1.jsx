﻿// src/rooms/Room1.jsx
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

    const hintMessages = [
        "Ends are lies, the truth is always first",
        "What number is that letter",
        "Letters need numbers & numbers stay the same",
        "Indigo  3  Blue  7"
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
                    top: '30vh',          // ✅ Relative to screen height
                    right: '15vw',        // ✅ Relative to screen width
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(0,255,255,0.2)',
                    zIndex: 10
                }}
                title="Click terminal to activate"
            />

            {/* Broken Radio on the back table (scaled up 200%) */}
            <div
                style={{
                    position: 'absolute',
                    top: '280px',
                    left: '180px',
                    width: '280px',
                    height: '80px', // ✅ Add height to make it clickable
                    cursor: 'pointer',
                    zIndex: 10, // ✅ Bring it to front just in case
                    // backgroundColor: 'rgba(255,0,0,0.2)' // ✅ Optional for debugging visibility
                }}
                title="Click to hear static clues"
                onClick={playNextHint}
            />

            {/* Display Radio Messages */}
            <div
                style={{
                    position: "absolute",
                    top: "370px",
                    left: "200px",
                    color: "#f7dcf0",
                    fontSize: "1.0rem",
                    width: "400px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "8px",
                    borderRadius: "4px",
                    fontFamily: `"Lacquer", system-ui`, // ✅ fixed here
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
                                solution="9327"
                                maxAttempts={4}
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
