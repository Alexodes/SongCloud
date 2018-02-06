import React, { Component } from 'react';
import uuid from 'uuid';
import Playlist from '../Playlist/Playlist';
import { connect } from 'react-redux';

import './Playlists.css';

class Playlists extends Component {
  constructor() {
    super();

    this.handleNewPlaylistAdd = this.handleNewPlaylistAdd.bind(this);
  }

  handleNewPlaylistAdd() {
    let playlistId = uuid();
    let newPlaylist = {
        id: playlistId,
        title: 'UNTITLED',
        songs: []
    };
    this.props.addNewPlaylist(newPlaylist);
  }

  renderLeftList() {
    const playlists = this.props.playlists;
    return playlists.map(playlist => {
      return <li key={playlist.id}>{playlist.title}</li>
    });
  }

  renderPlaylistsExplore() {
    const playlists = this.props.playlists;
    return playlists.map((playlist, index) => {
      return (
        <Playlist key={playlist.id}  playlist={playlist}/>
      )
    })
  }


  render() {
    return (
      <div className="playlists">
        <div className="left-nav">
          <div className="btn-div">
            <button className="new-playlist-btn"
                    onClick={ () => this.handleNewPlaylistAdd()}>Add New Playlist
            </button>
          </div>
          <ul className="left-list">
            {this.renderLeftList()}
          </ul>
        </div>
        <div className="playlist-explore">
          {this.renderPlaylistsExplore()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
          addNewPlaylist(newPlaylist) {
              dispatch({
                  type: 'IS_NEW_PLAYLIST',
                  newPlaylist: true
              });
              dispatch({
                  type: 'ADD_NEW_PLAYLIST',
                  newPlaylist: newPlaylist
              });
          }
      };
}

function mapStateToProps(state) {
  return {
      playlists: state.playlists
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);