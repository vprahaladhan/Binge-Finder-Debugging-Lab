import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    currentPage: 0
  }

  componentDidMount = () => {
    Adapter.getShows().then(shows => this.setState({shows}))
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = e => {
    e.target.value === "No Filter" ? 
      this.setState({ filterByRating: "" }) : this.setState({ filterByRating: e.target.value })
  }

  selectShow = show => {
    Adapter.getShowEpisodes(show.id)
      .then(episodes => this.setState({
        selectedShow: show,
        episodes
      }))
  }

  displayShows = () => (
    this.state.filterByRating ? 
      this.state.shows.filter(show => show.rating.average >= this.state.filterByRating)
      :
      this.state.shows
  )

  fetchMoreShows = () => {
    this.setState(prevState => {
      Adapter.getShows(prevState.currentPage + 1)
        .then(shows => this.setState(prevState => ({
          shows: prevState.shows.concat(shows)
        })))
      
      return {
        currentPage: prevState.currentPage + 1 
      }
    })
  }

  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
            <button onClick={this.fetchMoreShows}>Load More Shows</button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
