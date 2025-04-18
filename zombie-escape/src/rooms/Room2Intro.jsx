import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import corridorImage from '../assets/room2_corridor.png'; // <-- Replace with your file

export default function Room2Intro() {
    const navigate = useNavigate();
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [displayedLines, setDisplayedLines] = useState([]);

    const introLines = [
        "You step into a corridor that smells of blood.",
        "You can hear the distant sounds of growls.",
        "You must quickly run to the Quarantine Hall.",
        "The Quarantine Bay Door Lock: 974E29F"
    ];

    // Typewriter logic
    useEffect(() => {
        if (lineIndex < introLines.length) {
            if (charIndex < introLines[lineIndex].length) {
                const timeout = setTimeout(() => {
                    const currentLine = introLines[lineIndex].slice(0, charIndex + 1);
                    setDisplayedLines((prev) => {
                        const updated = [...prev];
                        updated[lineIndex] = currentLine;
                        return updated;
                    });
                    setCharIndex(charIndex + 1);
                }, 30);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setLineIndex(lineIndex + 1);
                    setCharIndex(0);
                }, 800);
                return () => clearTimeout(timeout);
            }
        }
    }, [charIndex, lineIndex]);

    return (
        <div
            className="room2-intro-background"
            style={{
                backgroundImage: `url(${corridorImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textShadow: '0 0 8px black',
                padding: '2rem',
                animation: 'pulseLights 3s infinite',
            }}
        >
            <div
                className="box has-background-dark has-text-light p-5"
                style={{ maxWidth: '600px', minHeight: '250px' }}
            >
                <h1 className="title has-text-danger">Quarantine Bay</h1>
                <div className="intro-text">
                    {displayedLines.map((line, idx) => (
                        <p key={idx} className="mb-2">{line}</p>
                    ))}
                </div>

                {lineIndex >= introLines.length && (
                    <button
                        className="button is-link mt-4"
                        onClick={() => navigate('/room2-play')}
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}
