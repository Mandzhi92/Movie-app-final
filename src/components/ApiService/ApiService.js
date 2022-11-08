import { Component } from 'react';

export default class ApiService extends Component {
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.status, 'Ошибка в запросе!');
    }
    return await res.json();
  };

  getData = async () => {
    const res = await this.getResource(
      'https://api.themoviedb.org/3/search/movie?api_key=2f967881b48868a92d46e5c9febb2c4f&language=en-US&query=return&page=1&include_adult=false'
    );
    return res.results;
  };
}
