import React from 'react';
import { format } from 'date-fns';
import './MovieTitle.css';

function MovieTitle({ title, releaseDate }) {
  return (
    <>
      <h1 className="title">{title}</h1>
      <span className="date">{format(new Date(releaseDate), 'PPP')}</span>
    </>
  );
}

export default MovieTitle;
