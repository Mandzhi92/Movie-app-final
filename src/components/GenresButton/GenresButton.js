import React from 'react';
import './GenresButton.css';

function GenresButton() {
  return (
    <div className="btn-box">
      <button className="btn-category">Action</button>
      <button className="btn-category">Drama</button>
    </div>
  );
}

export default GenresButton;
