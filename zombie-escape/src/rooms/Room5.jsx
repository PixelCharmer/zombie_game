import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/final_room.png';

const geneOptions = ['ATG', 'CGT', 'GAC', 'TAA', 'GGA', 'CCT'];
const correctSequence = ['ATG', 'GAC', 'CCT', 'TAA'];

export default function Room5() {
    const navigate = useNavigate();
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [sequence, setSequence] = useState(['', '', '', '']);
    const [feedback, setFeedback] = useState('');
    const [clueHovered, setClueHovered] = useState(null);

    const handleChange = (index, value) => {
        const updated = [...sequence];
        updated[index] = value;
        setSequence(updated);
    };

    const handleReset = () => {
        setSequence(['', '', '', '']);
        setFeedback('');
    };

    const handleSubmit = () => {
        if (JSON.stringify(sequence) === JSON.stringify(correctSequence)) {
            setFeedback('✅ Sequence verified! Dispersion initiated...');
            setTimeout(() => navigate('/escape-ending'), 3000);
        } else {
            setFeedback('❌ Sequence incorrect. Mutation detected.');
        }
    };

    const clues = {
        terminal: (
            <>
                <strong>💻 Terminal Log:</strong><br />
                ...final trial used GAC and showed promising reversal until the last mutation TAA...<br />
                Notes: CGT unstable. GGA = subject death.
            </>
        ),
        notebook: (
            <>
                <strong>📓 Cure Formula Notebook:</strong><br />
                CURE FORMULA v2.7<br />
                Final line circled: ATG - ??? - CCT - ???
            </>
        ),
        microscope: (
            <>
                <strong>🔬 Microscope Display:</strong><br />
                ATG → Start Codon<br />
                GAC → Bonds with TAA in stable strains<br />
                CCT → Repeats in non-mutated tissues<br />
                CGT & GGA = "Abort"
            </>
        )
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                padding: '1rem',
            }}
        >
            {/* Hover Zones for Clues */}
            {/* Terminal Log Hotspot */}
            <div
                onMouseEnter={() => setClueHovered('terminal')}
                onMouseLeave={() => setClueHovered(null)}
                style={{
                    position: 'absolute',
                    top: '25%',
                    right: '20%',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,0,0.1)',
                    boxShadow: '0 0 6px rgba(255,255,0,0.4)',
                    animation: 'pulse 2s infinite',
                    cursor: 'help',
                }}
            />

            {/* Notebook Hotspot */}
            <div
                onMouseEnter={() => setClueHovered('notebook')}
                onMouseLeave={() => setClueHovered(null)}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '15%',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,0,255,0.1)',
                    boxShadow: '0 0 6px rgba(255,0,255,0.4)',
                    animation: 'pulse 2s infinite',
                    cursor: 'help',
                }}
            />

            {/* Microscope Hotspot */}
            <div
                onMouseEnter={() => setClueHovered('microscope')}
                onMouseLeave={() => setClueHovered(null)}
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    right: '15%',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,255,100,0.1)',
                    boxShadow: '0 0 6px rgba(0,255,100,0.4)',
                    animation: 'pulse 2s infinite',
                    cursor: 'help',
                }}
            />
              
            {/* Clue Display */}
            {clueHovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '400px',
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid #00ffff',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        zIndex: 5
                    }}
                >
                    {clues[clueHovered]}
                </div>
            )}

            {/* Terminal Trigger */}
            {!showPuzzle && (
                <div
                    title="Access Final Console"
                    onClick={() => setShowPuzzle(true)}
                    style={{
                        position: 'absolute',
                        bottom: '72%',
                        right: '27.5%',
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'rgba(204, 204, 204 ,0.2)',
                        cursor: 'pointer',
                        boxShadow: '0 0 15px gray',
                        borderRadius: '10px'
                    }}
                />
            )}

            {/* Puzzle Area */}
            {showPuzzle && (
                <div
                    className="box has-background-black has-text-light"
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '2rem',
                        border: '2px solid lime',
                        width: '480px',
                        zIndex: 10,
                        boxShadow: '0 0 12px lime',
                        borderRadius: '10px'
                    }}
                >
                    <h2 className="title is-4 has-text-success">🧬 Final Cure Sequence</h2>
                    <p>Input the correct gene combination to unlock the dispersal system.</p>

                    {['A', 'B', 'C', 'D'].map((label, index) => (
                        <div key={label} className="field mt-3">
                            <label className="label">Segment {label}</label>
                            <div className="control select is-fullwidth">
                                <select value={sequence[index]} onChange={(e) => handleChange(index, e.target.value)}>
                                    <option value="">-- Select Gene --</option>
                                    {geneOptions.map((gene) => (
                                        <option key={gene} value={gene}>{gene}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="buttons mt-4">
                        <button className="button is-link" onClick={handleSubmit}>Submit</button>
                        <button className="button is-warning is-light ml-2" onClick={handleReset}>Reset</button>
                        <button className="button is-danger ml-2" onClick={() => setShowPuzzle(false)}>Exit</button>
                    </div>

                    {feedback && (
                        <div className="notification mt-3" style={{ color: feedback.includes('✅') ? 'lime' : 'red' }}>
                            {feedback}
                        </div>
                    )}
                </div>
            )}
            <style>{`
                @keyframes pulse {
                0% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.15); opacity: 0.7; }
                100% { transform: scale(1); opacity: 0.3; }
                }
            `}</style>

        </div>
    );
}
