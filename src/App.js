// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/" element={<MovieList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
