import { createStore, combineReducers } from 'redux';

import currentSongReducer from './reducers/current-song.js';
import isPlayingModeReducer from './reducers/is-playing-mode.js';
import newPlayListReducer from './reducers/new-playlist';
import playlistsReducer from './reducers/playlist-reducer';

const reducer = combineReducers({
    currentSong: currentSongReducer,
    isPlayingMode: isPlayingModeReducer,
    // Reducers for playlists
    newPlayList: newPlayListReducer,
    playlists: playlistsReducer
});

const store = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState());
  });

export default store;


