import React from 'react';

const Episode = ({ eachEpisode }) => (
  <div>
    Episode {eachEpisode.number} - {eachEpisode.name}
  </div>
);

export default Episode;