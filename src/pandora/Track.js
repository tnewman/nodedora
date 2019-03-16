class Track {
  constructor(artistName, songTitle, audioURL, trackToken) {
    this.artistName = artistName;
    this.songTitle = songTitle;
    this.audioURL = audioURL;
    this.trackToken = trackToken;
  }

  static fromJSON(json) {
    return new Track(json.artistName, json.songTitle, json.audioURL, json.trackToken);
  }
}

module.exports = Track;
