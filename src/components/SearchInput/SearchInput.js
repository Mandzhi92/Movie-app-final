import { Input } from 'antd';
import React from 'react';
import './SearchInput.css';

const SearchInput = (setQuery) => {
  return (
    <div className="searchInput">
      <form className="inputBox">
        <Input type="search" placeholder="Type to search..." onChange={(e) => setQuery(e.target.value)} />
      </form>
    </div>
  );
};

export default SearchInput;
