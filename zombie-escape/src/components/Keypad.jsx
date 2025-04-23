import React, { useState, useEffect, useCallback } from 'react';

const Keypad = ({ solution, maxAttempts, onSuccess, onFailure }) => {
    const [enteredCode, setEnteredCode] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [lockTimer, setLockTimer] = useState(false);
    const [countdown, setCountdown] = useState(30);

    const handleNumberClick = useCallback((number) => {
        setEnteredCode((prev) => (prev + number).slice(0, solution.length));
    }, [solution]);

    const handleDeleteClick = useCallback(() => {
        setEnteredCode((prev) => prev.slice(0, -1));
    }, []);

    const handleSubmitClick = useCallback(() => {
        if (enteredCode === solution) {
            setIsLocked(false);
            setFeedback('✅ Correct Code!');
            setIsCorrect(true);
            onSuccess?.();
        } else {
            const nextAttempt = attempts + 1;
            setAttempts(nextAttempt);
            setFeedback('❌ Incorrect Code');
            setEnteredCode('');

            if (nextAttempt >= maxAttempts) {
                setFeedback('🔒 Too many attempts. Locked for 30 seconds.');
                setLockTimer(true);
                setIsLocked(false); // Prevent input
                setCountdown(30);
                onFailure?.();
            }
        }
    }, [attempts, enteredCode, solution, maxAttempts, onSuccess, onFailure]);

    useEffect(() => {
        let timer;
        if (lockTimer) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setIsLocked(true);
                        setLockTimer(false);
                        setAttempts(0);
                        setFeedback('');
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [lockTimer]);

    useEffect(() => {
        setEnteredCode('');
        setAttempts(0);
        setIsLocked(true);
        setFeedback('');
        setIsCorrect(false);
        setLockTimer(false);
        setCountdown(30);
    }, [solution, maxAttempts]);

    const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

    return (
        <div className="box has-background-black has-text-white has-text-centered">
            <h2 className="title is-4 mb-3">
                {isCorrect ? '🔓 Unlocked!' : '🔐 Enter Code'}
            </h2>

            <div className="notification is-dark mb-4 is-size-4">
                {enteredCode || (isCorrect ? '✅' : '•'.repeat(solution.length))}
            </div>

            <div className="columns is-multiline is-mobile is-centered mb-3">
                {keypadNumbers.map((num, idx) => (
                    <div key={idx} className="column is-one-third p-1">
                        <button
                            className={`button is-fullwidth is-medium ${num === '⌫' ? 'is-danger' : 'is-info'}`}
                            disabled={!isLocked || lockTimer}
                            onClick={() => {
                                if (num === '⌫') {
                                    handleDeleteClick();
                                } else if (num !== '') {
                                    handleNumberClick(num);
                                }
                            }}
                        >
                            {num}
                        </button>
                    </div>
                ))}
            </div>

            <button
                className={`button is-fullwidth is-medium ${isCorrect ? 'is-success' : 'is-primary'}`}
                disabled={!isLocked || enteredCode.length !== solution.length || lockTimer}
                onClick={handleSubmitClick}
            >
                {isCorrect ? '✔️ Unlock' : 'Submit'}
            </button>

            {feedback && (
                <p className={`mt-3 has-text-${isCorrect ? 'success' : 'danger'}`}>
                    {feedback}
                </p>
            )}

            {lockTimer && (
                <p className="mt-2 has-text-warning">
                    ⏳ Locked: {countdown} seconds remaining
                </p>
            )}

            <p className="is-size-7 has-text-grey-light mt-2">
                Attempts: {attempts} / {maxAttempts}
            </p>
        </div>
    );
};

export default Keypad;
