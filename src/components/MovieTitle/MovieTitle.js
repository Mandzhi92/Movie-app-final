import React from 'react';
import { format, parseISO } from 'date-fns';
import './MovieTitle.css';

function MovieTitle({ title, releaseDate }) {
  const formattedDate = format(parseISO(releaseDate), 'MMMM dd, yyyy');
  return (
    <>
      <h1 className="title">{title}</h1>
      <span className="date">{formattedDate}</span>
    </>
  );
}

export default MovieTitle;
