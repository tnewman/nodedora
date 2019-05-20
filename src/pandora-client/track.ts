export default class Track {
    readonly songTitle: string;
    readonly audioURL: string;
    readonly trackToken: string;

    constructor(track: Track) {
        this.songTitle = track.songTitle;
        this.audioURL = track.audioURL;
        this.trackToken = track.trackToken;
    }
}
