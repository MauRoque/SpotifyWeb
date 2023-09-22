export const audio = (function () {
  let audioInstance;
  let isPlaying = false;
  let currentSongPath = "";

  function createInstance() {
    const audio = new Audio();
    return audio;
  }

  return {
    getInstance: function () {
      if (!audioInstance) {
        audioInstance = createInstance();
      }
      return audioInstance;
    },
    clickSong: function (newSongPath) {
      if (isPlaying && currentSongPath === newSongPath) {
        audioInstance.pause();
        isPlaying = false;
        return;
      } else if (!isPlaying && currentSongPath === newSongPath) {
        audioInstance.play();
        isPlaying = true;
        return;
      } else {
        audioInstance.src = newSongPath;
        audioInstance.play();
        isPlaying = true;
        currentSongPath = newSongPath;
      }
    },
    getIsPlaying: function () {
      return isPlaying;
    },
    getSongPath: function () {
      return currentSongPath;
    },
  };
})();
