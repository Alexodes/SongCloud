export default function isPlayingModeReducer(isPlaying = false, action) {
    if (action.type === 'IS_IN_PLAY_MODE') {
      return action.isPlaying;
    }
    return isPlaying;
}