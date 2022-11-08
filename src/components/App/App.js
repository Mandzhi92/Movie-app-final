import { Component } from 'react';

import Cards from '../Cards/Cards';
import ApiService from '../ApiService/ApiService';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: null,
    };
    this.apiService = new ApiService();
  }

  componentDidMount() {
    this.apiService.getData().then((movieData) => this.setState({ movieData }));
  }

  render() {
    const { movieData } = this.state;
    if (!movieData) {
      return;
    }

    return (
      <div className="movieApp">
        <Cards movieData={movieData} />
      </div>
    );
  }
}
