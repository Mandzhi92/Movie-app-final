import React from 'react';
import './DescriptionMovie.css';

function DescriptionMovie({ overview }) {
  function onClampString(inputString, maxLength = 25) {
    return inputString.split(' ').slice(0, maxLength).join(' ') + '...';
  }

  return (
    <div className="description-box">
      <p className="description">{onClampString(overview)}</p>
    </div>
  );
}

export default DescriptionMovie;
