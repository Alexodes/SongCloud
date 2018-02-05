import './Song.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

class Song extends Component {
    constructor() {
        super();
        this.state = {
            DropdownOpen: false,
            heart:"fa fa-heart-o heart-font-o",
            isPlaying: false
        };
    }

    songDuration(song) {
        const minutes = Math.floor(parseInt(song.duration) / 60000);
        const seconds = ((parseInt(song.duration % 60000) / 1000).toFixed(0));
        return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    songTitleLimiter(title) {
        if (title.length > 35) {
            return title.slice(0, 30) + '...'
        }
        else {
          return title;
        }      
    }

    openDropDown() {
        this.setState({ DropdownOpen: !this.state.DropdownOpen});
    }

    handlePlay(song) {
        this.props.updateCurrentSong(song);

        if(this.props.isPlaying === true || this.props.isPlaying === false) {
            const playingMode = !this.props.isPlaying;
            this.props.handlePlayMode(playingMode);
        }

        if(this.props.isPlaying === true && this.props.currentSong !== this.props.song) {
            const playingMode = true;
            this.props.handlePlayMode(playingMode);
        }

    }

    render() {
        const song = this.props.song;
        const img_url = song.artwork_url ? song.artwork_url.replace('large', 't500x500') : song.artwork_url;
        let playModeIcon;
        if(this.props.isPlaying === true && this.props.currentSong === this.props.song) {
            playModeIcon = 'fa fa-pause-circle-o is-playing';
        }
        if(this.props.isPlaying == false && this.props.currentSong === this.props.song) {
            playModeIcon = 'is-paused';
        }
        return (
            <div className="song-container">
                <div className="song-cover" style={{ 'backgroundImage': `url(${img_url})`}} onClick={() => this.handlePlay(song)}>
                    <span className={`fa fa-play-circle-o ${playModeIcon}`}></span>
                </div>
                <span className="song-name">{this.songTitleLimiter(song.title)}</span>


                <div className="time-and-heart">

                    <div className="time">
                        <i className={'fa fa-clock-o clock-font'} aria-hidden="true" />
                        <span className="song-duration">{this.songDuration(song)}</span>
                    </div>

                    <div className="heart-playlist-div">
                        <i className="fa fa-heart-o heart-font-o"></i>
                    </div>
                    
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
            },
            updateCurrentSong(song) {
                dispatch({
                type: 'UPDATE_CURRENT_SONG',
                song: song
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

export default connect(mapStateToProps, mapDispatchToProps)(Song);