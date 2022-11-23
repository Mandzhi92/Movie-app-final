import React from 'react';

import './CardsList.css';
import Cards from '../Cards';

export default function CardsList({ arr, ratedMovie }) {
  const listItems = arr.map((movie) => {
    if (ratedMovie) {
      ratedMovie.map((movie2) => {
        const movie1 = movie;
        if (movie1.id === movie2.id) {
          movie1.rating = movie2.rating;
        }
        return movie1.rating;
      });
      return (
        <li key={movie.id} className="movies">
          <Cards {...movie} />
        </li>
      );
    }

    return (
      <li key={movie.id} className="movies">
        <Cards {...movie} />
      </li>
    );
  });
  return <ul className="container">{listItems}</ul>;
}
