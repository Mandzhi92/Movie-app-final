import { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { debounce } from 'lodash';

import Pagin from '../Pagin/Pagin';
import CardsList from '../CardsList/CardsList';
import ApiService from '../ApiService/ApiService';
import ErrorNetwork from '../ErrorNetwork/ErrorNetwork';
import Context from '../hooks/context';
import SearchInput from '../SearchInput';
import Tabs from '../Tabs';

import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tabValue, setTabValue] = useState(true);
  const [errorNetwork, setErrorNetwork] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalMovie, setTotalMovie] = useState(0);
  const [pagin, setPagin] = useState(true);
  const [guestID, setGuestID] = useState(null);
  const [genresList, setGenresList] = useState([]);
  const [haveRatedMovie, setHaveRatedMovie] = useState(false);
  const [ratedMovie, setRatedMovie] = useState([]);
  const apiService = new ApiService();

  useEffect(() => {
    apiService.getGuestId().then((res) => setGuestID(res));
    apiService.getGenreList().then((res) => setGenresList(res));
  }, []);

  useEffect(() => {
    if (tabValue) {
      setTabValue(true);
      setLoading(true);
      apiService
        .searchPopularMovie(curPage)
        .then((data) => {
          setTotalMovie(data.total_results);
          setMovies(data.results);
          setError(false);
          setLoading(false);
        })
        .catch(onErrorNetwork);
    } else {
      setError(false);
      setQuery(query);
    }

    if (!tabValue) {
      setTabValue(false);
      apiService.getRatedMovies(guestID, curPage).then((data) => {
        setMovies(data.results);
        setTotalMovie(data.total_results);
      });
    }

    if (query) {
      setErrorNetwork(false);
      setLoading(true);
      apiService
        .getData(query, curPage)
        .then((data) => {
          setTotalMovie(data.total_results);
          if (data.results.length) {
            setLoading(false);
            setError(false);
            setMovies(data.results);
          } else {
            onError();
            setMovies([]);
          }
        })
        .catch(onErrorNetwork);
    } else {
      setError(false);
      setQuery(query);
    }
  }, [query, tabValue, curPage]);

  const onErrorNetwork = () => {
    setErrorNetwork(true);
    setLoading(false);
    setError(false);
    setPagin(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
    setPagin(false);
  };

  const switchTabs = (key) => {
    if (key === '2') {
      setTabValue(false);
      setError(false);
      setCurPage(1);
      setLoading(false);
    }
    if (key === '1') {
      setTabValue(true);
    }
  };

  const onChangePage = (page) => {
    setCurPage(page);
  };

  const movieRatingSaved = (item) => {
    const stateRatedMovie = ratedMovie.slice(0);
    stateRatedMovie.push(item);
    setRatedMovie(stateRatedMovie);
  };

  return (
    <div className="movieApp">
      <div className="wrapper">
        <Context.Provider value={{ movies, genresList, guestID, setHaveRatedMovie, movieRatingSaved }}>
          <Tabs switchTabs={switchTabs} centered />

          {tabValue ? SearchInput(debounce(setQuery, 250)) : ''}
          {!tabValue && !haveRatedMovie && (
            <Alert message="Вы не поставили рейтинг понравившимся фильмам." className="error" />
          )}
          {error && tabValue && <Alert message="Внимание! Поиск не дал результатов." className="error" />}

          {loading && <Spin size="large" className="loading" />}

          {errorNetwork ? ErrorNetwork : null}

          {!errorNetwork && <CardsList arr={movies} ratedMovie={ratedMovie} />}

          <footer>
            {tabValue
              ? pagin && Pagin(totalMovie, 1, curPage, onChangePage, query)
              : totalMovie > 20 && Pagin(totalMovie, 1, curPage, onChangePage)}
          </footer>
        </Context.Provider>
      </div>
    </div>
  );
}
