export default class ApiService {
  _key = '2f967881b48868a92d46e5c9febb2c4f';
  _posterDefault = 'http://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1Rk6UAY5ln4nsFhs3LG0wAZcKaKTM5SRkZCeTgDn6uOyic';
  _img = 'https://image.tmdb.org/t/p/w1280';

  getResource = async (url) => {
    const res = await fetch(`https://api.themoviedb.org/3/${url}`);

    if (!res.ok) {
      throw new Error(res.status, 'Ошибка в запросе!');
    }
    return await res.json();
  };

  getGuestId = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._key}`);
    const req = await res.json();
    return req.guest_session_id;
  };

  getGenreList = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._key}`);
    const req = await res.json();
    return req.genres;
  };

  getData = async (query, page = 1) => {
    const response = await this.getResource(`search/movie?api_key=${this._key}&query=${query}&page=${page}`);
    const req = await response;
    return req;
  };

  searchPopularMovie = async (page = 1) => {
    const response = await this.getResource(`movie/popular?api_key=${this._key}&language=en-US&page=${page}`);
    const req = await response;
    return req;
  };

  getDefaultPoster = (poster) => {
    return poster ? this._img + poster : (poster = this._posterDefault);
  };

  async getRatedMovies(guestID, page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestID}/rated/movies?api_key=${this._key}&page=${page}&sort_by=created_at.asc`
    );
    return res.json();
  }

  async getNextPage(page = 1, query) {
    const res = await this.getResourse(`search/movie?api_key=${this._key}&query=${query}&page=${page}`);
    return res;
  }

  async postStars(number, movie_id, guestID) {
    const value = number;
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${this._key}&guest_session_id=${guestID}`,
      {
        method: 'POST',
        body: JSON.stringify({
          value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Возникла ошибка ${res.status}`);
    }
  }
}
