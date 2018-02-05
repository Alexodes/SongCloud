import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Player.css';


class Player extends Component {
  constructor() {
    super();

    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  componentDidUpdate() {
    if(this.props.isPlaying === true) {
      this.player.play();
    }
    if(this.props.isPlaying === false) {
      this.player.pause();
    }
  }

  onPlay() {
    const playingMode = true;
    this.props.handlePlayMode(playingMode);
  }

  onPause() {
    const playingMode = false;
    this.props.handlePlayMode(playingMode);
  }

  render() {
    if(!this.props.currentSong) {
      return <div className="player hidden" />
    }

    const songUrl = `${this.props.currentSong.stream_url}?client_id=jHIO7kur07kyRKwzce6Ol52j1My6zV0L`;
    const songCover = this.props.currentSong.artwork_url ? this.props.currentSong.artwork_url : null;
    const songName = this.props.currentSong.title;

    return (
      <div className="player">
        <div className="player-left">
          <div className="player-img" style={{backgroundImage: `url(${songCover})`}} />
          <span className="song-title">{songName}</span>
        </div>

        <div className="player-display">
          <audio 
            src={songUrl} 
            ref={(elm) => {this.player = elm}} 
            controls 
            onPlay={this.onPlay} 
            onPause={this.onPause} 
            className="player-elm" 
            autoPlay />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlePlayMode(playingMode) {
      dispatch({
        type: 'IS_IN_PLAY_MODE',
        isPlaying: playingMode
      })
    }
  }
}

function mapStateToProps(state) {
  return {
      currentSong: state.currentSong,
      isPlaying: state.isPlayingMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);