// src/rooms/EscapeEnding.jsx
import React from 'react';
import '../styles/ending.scss'; // optional if using external styles

export default function EscapeEnding() {
    return (
        <div className="animated-ending">
            <h1>✅ CURE SEQUENCE VERIFIED</h1>
            <p>Infection containment initiated... Humanity has a chance.</p>
            <p style={{ animationDelay: '4s' }}>Enter the cure sequence: WE LIVE!.</p>
            <p style={{ animationDelay: '4s' }}>Hope you enjoyed this experience!.</p>
            <p style={{ animationDelay: '4s' }}>Created and Codedd by Kari Alcoset!.</p>
        </div>
    );
}