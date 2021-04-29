import React from 'react';

const tvShow = ({ show, selectShow }) => (
  <div>
    <br />
    { show.image && show.image.medium && <img src={show.image.medium} onClick={selectShow} alt="" /> }
  </div>
);

export default tvShow;
