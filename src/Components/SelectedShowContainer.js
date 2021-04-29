import React, { Component } from 'react';
import Episode from './Episode';

class SelectedShowContainer extends Component {

  state = {
    selectedSeason: 1,
  }

  mapSeasons = () => {
    if (this.props.allEpisodes) {
      let seasons = this.props.allEpisodes.map(episode => episode.season).unique();
      return seasons.map(season => (
        <option value={season} key={season}>Season {season}</option>
      ));
    }
  };

  mapEpisodes = () => (
    this.props.allEpisodes
      .filter(episode => episode.season === this.state.selectedSeason)
      .map(episode => <Episode key={episode.id} eachEpisode={episode} />)
  )

  handleSelectionChange = (e) => {
    this.setState({ selectedSeason: parseInt(e.target.value) })
  }


  render() {
    const { selectedShow } = this.props

    return (
      <div style={{position: "static"}}>
        <h2>{selectedShow.name}</h2>
        {selectedShow.image && selectedShow.image.medium ? <img src={selectedShow.image.medium} alt=""/> : ''}
        <p dangerouslySetInnerHTML={{__html: selectedShow.summary}}></p>
        <p>Premiered: {selectedShow.premiered}</p>
        <p>Status: {selectedShow.status}</p>
        <p>Average Rating: {selectedShow.rating.average}</p>
        <select style={{display: 'block'}} onChange={this.handleSelectionChange}>
          {this.mapSeasons()}
        </select>
        {this.mapEpisodes()}
      </div>
    );
  }

}

export default SelectedShowContainer;

// eslint-disable-next-line no-extend-native
Array.prototype.unique = function() {
  var arr = [];
  for(var i = 0; i < this.length; i++) {
    if(!arr.includes(this[i])) {
        arr.push(this[i]);
    }
  }
  return arr;
}