import React from 'react';
import '../Cards/Cards.css';

import MovieTitle from '../MovieTitle';
import Poster from '../Poster';
import GenresButton from '../GenresButton';
import DescriptionMovie from '../DescriptionMovie';

function Cards(props) {
  const listItems = props.movieData.map(({ title, poster_path, id, overview, release_date }) => {
    return (
      <div className="card" key={id}>
        <Poster posterPath={poster_path} />
        <div className="info-movie">
          <MovieTitle title={title} releaseDate={release_date} />
          <GenresButton />
          <DescriptionMovie overview={overview} />
        </div>
      </div>
    );
  });

  return <div className="container">{listItems}</div>;
}

export default Cards;
