import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/tunnelsystem.png';

export default function Room3() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showRiddle, setShowRiddle] = useState(false);

    const handleChange = (e) => {
        const upper = e.target.value.toUpperCase();
        setInputValue(upper);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        if (inputValue === 'DARKNESS') {
            setCorrect(true);
            setTimeout(() => navigate('/ventoverride'), 2500);
        }
    };

    const handleReset = () => {
        setInputValue('');
        setSubmitted(false);
        setCorrect(false);
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            color: 'white',
            overflow: 'hidden',
            fontFamily: 'serif'
        }}>
            {/* Riddle Reveal Button */}
            {!showRiddle && (
                <div style={{
                    position: 'absolute',
                    top: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10
                }}>
                    <button
                        className="button is-info is-light is-medium"
                        onClick={() => setShowRiddle(true)}
                    >
                        Reveal Riddle
                    </button>
                </div>
            )}

            {/* Riddle Box */}
            {showRiddle && (
                <div style={{
                    position: 'absolute',
                    top: '5%',
                    left: '10%',
                    width: '80%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid cyan',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    color: '#e0e0ff'
                }}>
                    <p><strong>Three mouths gape wide, but none with breath.</strong><br />
                        One murmurs warnings dressed in flame—fear’s breathless lullaby.<br />
                        Another hums in emerald certainty, cloaked in the arrogance of symmetry.<br />
                        The last drips cobalt truths through broken teeth, where shadow sharpens lies into prophecy.</p>

                    <br />

                    <p><strong>Red will still your lungs before your mind.<br />
                        Green bends the compass until false North feels right.<br />
                        Blue sings riddles backward in the dark—half a truth is still a lie.</strong></p>

                    <br />

                    <p><em>To pass, you must choose not by light, nor fear, nor faith...<br />
                        But by the one who hides what matters most.<br />
                        Only in silence is the answer heard.<br />
                        Only in darkness is the truth revealed.<br />
                        Only in deception can you survive.</em></p>
                </div>
            )}

            {/* Input and buttons */}
            <div style={{
                position: 'absolute',
                bottom: '5%',
                left: '10%',
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="ENTER YOUR ANSWER"
                    style={{
                        textTransform: 'uppercase',
                        fontSize: '1.5rem',
                        padding: '0.5rem 1rem',
                        border: '2px solid white',
                        borderRadius: '5px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        width: '300px',
                        textAlign: 'center'
                    }}
                />
                <div className="buttons">
                    <button className="button is-link is-medium" onClick={handleSubmit}>Submit</button>
                    <button className="button is-warning is-light ml-3" onClick={handleReset}>Reset</button>
                </div>
                {submitted && correct && (
                    <div className="notification is-success mt-3">
                        ✅ You chose wisely. You vanish into the dark...
                    </div>
                )}
                {submitted && !correct && (
                    <div className="notification is-danger mt-3">
                        ❌ Wrong path. A loud hiss sends you crawling back.
                    </div>
                )}
            </div>
        </div>
    );
}
