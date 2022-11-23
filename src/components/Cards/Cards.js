import { useState, useContext } from 'react';
import './Cards.css';
import { Rate } from 'antd';

import Poster from '../Poster';
import Context from '../hooks/context';
import DescriptionMovie from '../DescriptionMovie';
import MovieTitle from '../MovieTitle';
import ApiService from '../ApiService/ApiService';

export default function Cards({ id, poster_path, genre_ids, title, overview, vote_average, release_date, rating }) {
  const { genresList, guestID, setHaveRatedMovie, movieRatingSaved } = useContext(Context);
  const [valueDefault, setValueDefault] = useState(rating);

  const apiService = new ApiService();

  const searchGenreMovie = (genre_id, genreses) => {
    const result = [];
    for (let i = 0; i < genre_id.length; i++) {
      const element = genre_id[i];
      for (let j = 0; j < genreses.length; j++) {
        const item = genreses[j];
        if (item.id === element) {
          result.push(
            <button key={item.id} className="genre">
              {item.name}
            </button>
          );
        }
      }
    }
    return result;
  };

  if (!release_date) {
    release_date = null;
  }

  const selectStar = (number, movie_id, guestID) => {
    setValueDefault(number);
    movieRatingSaved({ rating: number, id: movie_id });
    apiService.postStars(number, movie_id, guestID);
    setHaveRatedMovie(true);
  };

  return (
    <div className="card" key={id}>
      <Poster posterPath={poster_path} />
      <div className="info-movie">
        <MovieTitle title={title} releaseDate={release_date} voteAverage={vote_average} />
        <div>{searchGenreMovie(genre_ids, genresList)}</div>
        <DescriptionMovie overview={overview} />
        <Rate
          count={10}
          value={rating}
          onChange={(number) => selectStar(number, id, guestID)}
          defaultValue={valueDefault}
        />
      </div>
    </div>
  );
}
