import React from 'react';
import { format } from 'date-fns';
import './MovieTitle.css';

function MovieTitle({ title, releaseDate, voteAverage }) {
  function colorRating(number) {
    const raiting = ['rating'];

    if (number < 3) {
      raiting.push('cirrcleColor1');
    } else if (number >= 3 && number < 5) {
      raiting.push('cirrcleColor2');
    } else if (number >= 5 && number < 7) {
      raiting.push('cirrcleColor3');
    } else {
      raiting.push('cirrcleColor4');
    }

    return raiting;
  }
  return (
    <>
      <h1 className="title">{title}</h1>
      <div className={colorRating(voteAverage).join(' ')}>
        <p className="ratingNumber">{voteAverage}</p>
      </div>
      <span className="date">{format(new Date(releaseDate), 'PPP')}</span>
    </>
  );
}

export default MovieTitle;
