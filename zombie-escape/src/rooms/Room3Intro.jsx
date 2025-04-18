
import React, { useEffect, useState } from 'react';
import background from '../assets/vent_step.png';

export default function Room3Intro() {
    const fullText = `  The quietest path leads to safety... You must sprint toward the ventilation ducts.
    Lock the ventilation duct behind you with: TWD10
    You begin crawling through the pitch-black ventilation shafts. Claustrophobic. Scratches echo around you
    and then you see something so odd....`;

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 40); // speed of typewriter

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        className="subtitle is-5 has-text-light mt-4"
        style={{
          maxWidth: '640px',
          whiteSpace: 'pre-wrap',
          fontFamily: "'Courier New', monospace",
          fontWeight: 'bold',
          minHeight: '120px'
        }}
      >
        {displayedText}
      </p>
      <button
        className="button is-link mt-5"
        onClick={() => window.location.href = '/room3puzzle'}
        disabled={displayedText.length < fullText.length}
      >
        Continue
      </button>
    </div>
  );
}
