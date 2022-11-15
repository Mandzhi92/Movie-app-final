import React from 'react';

import './Poster.css';
import ApiService from '../ApiService/ApiService';

function Poster({ posterPath }) {
  const apiService = new ApiService();
  return (
    <div className="poster-box">
      <img className="poster" alt="icon" src={apiService.getDefaultPoster(posterPath)} />
    </div>
  );
}

export default Poster;
