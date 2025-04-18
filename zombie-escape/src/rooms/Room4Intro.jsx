import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/infected_door.png'; // 🧬 <- Add this door image to /assets

export default function Room4Intro() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                color: 'lime',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
                fontFamily: 'monospace',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    padding: '2rem',
                    border: '2px solid #33ff33',
                    borderRadius: '10px',
                    maxWidth: '800px',
                    animation: 'fadeIn 2s ease-in-out',
                }}
            >
                <h1 className="title is-3 has-text-success mb-4"> The Scientist's Private Lab </h1>

                <p className="typewriter" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    You’ve reached the scientist’s private lab — ominously labeled The Infected Chamber.<br /><br />
                    From past conversations, you recall him mentioning a backup vial of the cure serum, hidden away in his personal locker.
                    <br /><br />
                    But he never revealed the password.<br />
                    To unlock it, you’ll need to enter the correct sequence of symbols.<br />
                    Only a precise match to the cure’s molecular formula will open the lock<br /><br />
                    To open the lab door enter:  RE2BIO <br />
                </p>

                <button
                    className="button is-danger is-medium mt-5"
                    onClick={() => navigate('/Room4')}
                >
                    Enter the Lab
                </button>
            </div>

            <style>{`
        .typewriter {
          overflow: hidden;
          border-right: .15em solid lime;
          white-space: pre-wrap;
          animation:
            typing 5s steps(80, end),
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
