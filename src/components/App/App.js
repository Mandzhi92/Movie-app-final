import { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { debounce } from 'lodash';

import Pagin from '../Pagin/Pagin';
import Cards from '../Cards/Cards';
import ApiService from '../ApiService/ApiService';
import ErrorNetwork from '../ErrorNetwork/ErrorNetwork';
import SearchInput from '../SearchInput';
import Tabs from '../Tabs/Tabs';

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
  const apiService = new ApiService();

  useEffect(() => {
    setLoading(true);
    if (tabValue) {
      setTabValue(true);
      apiService.searchPopularMovie(curPage).then((data) => {
        setTotalMovie(data.total_results);
        setMovies(data.results);
        setLoading(false);
        setError(false);
      });
    }

    if (query) {
      setErrorNetwork(false);
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
  };

  const onError = () => {
    setError(true);
    setLoading(false);
    setPagin(false);
  };

  const onChange = (page) => {
    setCurPage(page);
  };

  return (
    <div className="movieApp">
      <div className="wrapper">
        <Tabs />
        {tabValue ? SearchInput(debounce(setQuery, 250)) : ''}
        {error && (
          <Alert
            message="Warning! Поиск не дал результатов."
            showIcon
            type="warning"
            className="error"
            banner
            closable
          />
        )}
        {loading ? <Spin size="large" className="loading" /> : null}
        {errorNetwork ? ErrorNetwork : null}
        <section>{!errorNetwork && <Cards movieData={movies} />}</section>
        <footer>
          {tabValue
            ? pagin && Pagin(totalMovie, 1, curPage, onChange, query)
            : totalMovie > 20 && Pagin(totalMovie, 1, curPage, onChange)}
        </footer>
      </div>
    </div>
  );
}
