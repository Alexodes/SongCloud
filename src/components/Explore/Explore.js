import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import Song from '../Song/Song';
import './Explore.css';



export default class Explore extends Component {
  constructor() {
    super();
    this.state = {
      songs:[],
      loadingState: 'loading',
      offset:0,
      limit: 15
    };
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  getSongs() {
   
    const genre = this.props.match.params.genre;
    const offset = this.state.offset;
    const limit = this.state.limit;

    const searchParams = this.props.history.location.search;
    const searchTarget = searchParams ? 'q' : 'tags';
    
   
    const CLIENT_ID = 'jHIO7kur07kyRKwzce6Ol52j1My6zV0L';
    const BASE_URL = `https://api.soundcloud.com/tracks?client_id=${CLIENT_ID}&limit=${limit}&offset=${offset}&${searchTarget}=${genre}`;

    const searchURL = `https://api.soundcloud.com/tracks?client_id=${CLIENT_ID}&limit=${limit}&offset=${offset}&q=sevendust`;

    fetch(BASE_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      let songs = json.map(song => song);
      this.setState({ songs: songs, loadingState: 'loaded' });
      console.log(this.state.songs);
    })
    .catch(error => {
      this.setState({loadingState: 'error'});
    });
    
  }

  componentDidMount() {
    this.getSongs();
  }

  nextPage() {
    this.setState({
      offset: this.state.offset + this.state.limit,
      loadingState: 'loading'
    });
  }

  prevPage() {
    this.setState({
      offset: this.state.offset - this.state.limit,
      loadingState: 'loading'
    });
  }

  

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState({
        loadingState: 'loading'
      });
      this.setState({offset: 0}, () => {
        this.getSongs();
      });
    }
    if (this.state.offset !== prevState.offset) {
      this.getSongs();
    }
  }

  handleGenres() {
    return (
      <div>
        <ul className="nav-genres">
          <li>Genres:</li>
          <li><NavLink to="/explore/trance" activeClassName="active-genre">all-music</NavLink></li>
          <li><NavLink to="/explore/hip-hop" activeClassName="active-genre">hip-hop</NavLink></li>
          <li><NavLink to="/explore/house" activeClassName="active-genre">house</NavLink></li>
          <li><NavLink to="/explore/rock" activeClassName="active-genre">rock</NavLink></li>
          <li><NavLink to="/explore/pop" activeClassName="active-genre">pop</NavLink></li>
          <li><NavLink to="/explore/reggaeton" activeClassName="active-genre">reggaeton</NavLink></li>
          <li><NavLink to="/explore/dubstep" activeClassName="active-genre">dubstep</NavLink></li>
        </ul>
      </div>
    )
  }

  render() {
    const firstPage = this.state.offset === 0;

    switch(this.state.loadingState) {
      case 'loading':
      return (
        <div className="spinner">
          <MDSpinner size={100} singleColor={"rgb(66, 165, 245)"} />
        </div>
      );
      case 'error':
      return (
        <div>Error!</div>
      );
      case 'loaded':
        return (
          <div className="explore">
            <nav>
              {this.handleGenres()}
            </nav>
            <div className="song-list-div">
              <ul className="songs-list">
                {this.state.songs.map(song => {
                  return (
                    <li className="song-list-item" key={song.id}>
                      <Song song={song}
                            mode="explore"/>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="page-nav-div">
                <button 
                  className="btn-prev"
                  onClick={this.prevPage}
                  disabled={firstPage}
                  >Prev</button>
                  <span>page {(this.state.offset / this.state.limit) + 1}</span>
                  <button className="btn-next" onClick={this.nextPage}>Next</button>
            </div>
          </div>
        );
    }
  }
}