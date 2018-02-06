import React, { Component } from 'react';
import { connect } from 'react-redux';
import Song from '../Song/Song';
import './Playlist.css';


class Playlist extends Component {
    constructor() {
        super();
        this.state= {
            isInEditMode: false,
            value:''
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ value: this.props.playlist.title});

        if(this.props.isNewPlaylist === true) {
            this.setState({ isInEditMode: true });
        }
    }

    inputEditMode() {
        this.setState({ isInEditMode: !this.state.isInEditMode });
    }

    handleTitleChange(e) {
        let value = e.target.value;
        let playlistId = this.props.playlist.id;
        this.setState({ value });

        this.props.editPlaylistTitle(value, playlistId);
    }

    handleDeleteList(playlistId) {
        const playlists = this.props.playlists;
        for(let playlist of playlists) {
            if(playlist.id == playlistId) {
                const indexOfList = playlists.indexOf(playlist);
                this.props.deletePlaylist(indexOfList);
            }
        }
    }

   componentDidUpdate(prevProps, prevState) {
       if(this.state.isInEditMode === true) {
           this.nameElement.focus();
           this.props.resetNewPlaylist();
       }
   }

    render() {
        const playlist = this.props.playlist;
        const inputClassName = this.state.isInEditMode ? '' : 'hidden';
        const titleClassName = this.state.isInEditMode ? 'hidden' : '';
        return (
            <div className="playlist">
        <div className="header-div">
          <div className="input-div">
            <label className={ titleClassName }
                   htmlFor={ playlist.id }
                   onClick={ () => this.inputEditMode() }>{ playlist.title }</label>
            <input onBlur={ () => this.inputEditMode() }
                   onChange={this.handleTitleChange}
                   value={this.state.value}
                   className={ inputClassName }
                   id={ playlist.id }
                   type="text"
                   ref={ (element) => this.nameElement = element}>
            </input>
            <div className="counter-bg">
              <span className="counter">{ this.props.playlist.songs.length }</span>
            </div>
          </div>
          <button onClick={ () => this.handleDeleteList(playlist.id)} className="del-btn">Delete</button>
        </div>
        <div>
          {playlist.songs.length === 0 && <ul className="songs-list">
            <span className="add-songs-msg">Add some songs to this playlist</span>
          </ul>
          }
          {playlist.songs.length > 0 && <ul className="songs-list">

            {playlist.songs.map(song => <li key={song.id}>
              <Song song={song}
                          mode="playlists"
                          playlists={this.props.playlists}/>
            </li>)}
          </ul>
          }
        </div>
      </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editPlaylistTitle(e, Id) {
            dispatch({
              type: 'EDIT_PLAYLIST_TITLE',
              newTitle: e,
              playlistId: Id,
            });
          },
          resetNewPlaylist() {
            dispatch({
              type: 'IS_NEW_LIST',
              isNewPlaylist: false,
            })
          },
          deletePlaylist(indexOfList) {
            dispatch({
              type: 'DELETE_PLAYLIST',
              indexOfList: indexOfList
            })
          }
    }
}


function mapStateToProps(state) {
    return {
      playlists: state.playlists,
      isNewPlaylist: state.newPlayList
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);