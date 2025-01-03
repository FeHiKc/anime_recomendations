import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeListPage from "./pages/AnimeListPage";
import Home from "./pages/Home";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime-list" element={<AnimeListPage />} />
            </Routes>
        </Router>
    );
};

export default App;
