// src/router.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Room1 from './rooms/Room1';
import Room2Intro from './rooms/Room2Intro';
import Room2 from './rooms/Room2';
import Room3Intro from './rooms/Room3Intro';
import Room3 from './rooms/Room3';
import VentOverride from './rooms/VentOverride';
import Room4Intro from './rooms/Room4Intro';  
import Room4 from './rooms/Room4'; // Assuming you have a Room4 component
import Room5Intro from './rooms/Room5Intro';
import Room5 from './rooms/Room5';
import EscapeEnding from './rooms/EscapeEnding';
import GameEntry from './rooms/GameEntry';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/start" />} />
                <Route path="/start" element={<GameEntry />} />
                <Route path="/room1" element={<Room1 />} />
                <Route path="/room2" element={<Room2Intro />} />
                <Route path="/room2-play" element={<Room2 />} />
                <Route path="/room3" element={<Room3Intro />} />
                <Route path="/room3puzzle" element={<Room3 />} />
                <Route path="/ventoverride" element={<VentOverride />} />   
                <Route path="/room4intro" element={<Room4Intro />} />   
                <Route path="/room4" element={<Room4 />} />
                <Route path="/room5intro" element={<Room5Intro />} />
                <Route path="/room5" element={<Room5 />} />
                <Route path="/escape-ending" element={<EscapeEnding />} />
                {/* Add more routes as needed */}   
            </Routes>
        </Router>
    );
}

