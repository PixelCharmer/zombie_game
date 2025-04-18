// src/rooms/Room5Intro.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Room5Intro() {
    const navigate = useNavigate();

    return (
        <div style={{
            background: 'radial-gradient(circle, #111 0%, #000 100%)',
            height: '100vh',
            color: 'lime',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'monospace'
        }}>
            <h1 className="title is-3 has-text-warning"> Containment Zone</h1>
            <p className="mb-4" style={{ maxWidth: '600px', textAlign: 'center' }}>
                With the cure in hand you must get to the Containment Zone, once a last-ditch effort by surviving scientists to engineer a cure. The room is dimly lit by flickering emergency lights. Blood-smeared whiteboards, shattered vials, and broken biohazard barriers surround you.<br /><br />

                In the center: a massive containment unit with a secured keypad. Inside the chamber lies the Cure Dispersal Device—your only hope to reverse the infection spreading across the world. But the access protocol has one final fail-safe. If you can’t figure it out, the chamber will auto-purge  <br /><br />

                To unlock it, you’ll need to reconstruct the genetic sequence that forms the stable antidote.<br /><br />

                To enter the Containment Zone, you must first enter: 05102025<br /><br />   
            </p>
            <button className="button is-link" onClick={() => navigate('/room5')}>
                Start Puzzle
            </button>
        </div>
    );
}
