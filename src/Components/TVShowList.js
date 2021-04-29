import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';

import TVShow from './TVShow';

class TVShowList extends Component {

  mapAllShows = () => {
    return this.props.searchTerm ? 
      this.props.shows
        .filter(show => show.name.toLowerCase().includes(this.props.searchTerm))
        .map(show => <TVShow key={show.id} show={show} selectShow={() => this.props.selectShow(show)} />)
      :
      this.props.shows
        .map(show => <TVShow key={show.id} show={show} selectShow={() => this.props.selectShow(show)} />)
  }

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows()}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
