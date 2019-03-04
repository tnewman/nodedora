class Track {
  constructor(data) {
    this.artistName = data.artistName;
    this.songTitle = data.songTitle;
    this.audioURL = data.audioURL;
    this.trackToken = data.trackToken;
  }
}

module.exports = Track;
