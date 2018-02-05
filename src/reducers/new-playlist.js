export default function newPlayListReducer(newPlaylist = false, action) {
    if(action.type === "IS_NEW_PLAYLIST") {
        return action.newPlaylist;
    }
    return newPlaylist;
}