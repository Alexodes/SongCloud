export default function currentSongReducer(currentSong = null, action) {
    if(action.type === 'UPDATE_CURRENT_SONG') {
        return action.song;
    }
    return currentSong;
}