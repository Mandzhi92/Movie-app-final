import React from 'react';
import './Poster.css';

function Poster({ posterPath }) {
  return (
    <div className="poster-box">
      <img className="poster" alt="icon" src={`https://image.tmdb.org/t/p/w500${posterPath}`} />
    </div>
  );
}

export default Poster;
