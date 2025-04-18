// src/rooms/GameEntry.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/game_start.png';

export default function GameEntry() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/room1');
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
                padding: '2rem',
                textAlign: 'center',
                fontFamily: "'Gloria Hallelujah', cursive", // updated
            }}
        >
            <div
                style={{
                    maxWidth: '700px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(0,255,255,0.9)',
                }}
            >
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    The world has been overrun by the undead. A virus known as ZMB-17 wiped out civilization in weeks.
                    Your group are the last known surviors. You must find the cure hidden deep within the last standing research facility, Outpost ECHO-7.<br /><br />
                    <em>Time is running out.</em> The buildings self-destruct system was activated by the infected AI.
                    You must navigate 5 zones and retrieve the cure before the countdown ends or become one.
                </p>
                <button
                    className="button is-link is-large"
                    onClick={handleStart}
                    style={{ fontWeight: 'bold' }}
                >
                    Start Game
                </button>
            </div>
        </div>
    );
}
