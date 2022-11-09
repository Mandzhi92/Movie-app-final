import { Component } from 'react';

import Cards from '../Cards/Cards';
import ApiService from '../ApiService/ApiService';
import Spinner from '../Spinner/Spinner';
import NetworkState from '../NetworkState/NetworkState';
import Alert from '../Alert/Alert';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
      loading: true,
      network: true,
    };
    this.apiService = new ApiService();
  }

  onNetworkState = () => {
    this.setState((prevState) => ({ network: !prevState.network }));
  };

  onCardLoaded = (movieData) => {
    this.setState({ movieData, loading: false });
  };

  componentDidMount() {
    this.apiService
      .getData()
      .then(this.onCardLoaded)
      .catch((err) => new Error(err, 'Ошибка в запросе на сервер'));
  }

  render() {
    const { movieData, loading, network } = this.state;
    if (loading) {
      return <Spinner />;
    }

    if (!movieData) {
      return;
    }

    if (!network) {
      return <Alert className="alert alert-net" />;
    } else {
      null;
    }

    return (
      <div className="movieApp">
        <Cards movieData={movieData} />
        <NetworkState onNetworkState={this.onNetworkState} />
      </div>
    );
  }
}
