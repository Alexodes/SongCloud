export default function playlistsReducer(playlists = [], action) {
    // Change playlist title
    if(action.type === "EDIT_PLAYLIST_TITLE") {
        let playlistsCopy = [...playlists];
        for(let playlist of playlistsCopy) {
            if(action.playlistId === playlist.id) {
                playlist.title = action.newTitle;
                return playlistsCopy;
            }
        }
    }

    // Add new playlist
    if(action.type === "ADD_NEW_PLAYLIST") {
        let playlistsCopy = [...playlists];
        playlistsCopy.push(action.newPlaylist);
        return playlistsCopy;
    }

    // Delete the playlist
    if(action.type === "DELETE_PLAYLIST") {
        let playlistsCopy = [...playlists];
        playlistsCopy.splice(action.indexOfList,1);
        return playlistsCopy;
    }

    //Update playlist songs
    

    return playlists;
}