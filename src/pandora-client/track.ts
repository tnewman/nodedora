export default class Track {
    readonly songTitle: string;
    readonly audioURL: string;
    readonly trackToken: string;

    constructor(songTitle: string, audioURL: string, trackToken: string) {
        this.songTitle = songTitle;
        this.audioURL = audioURL;
        this.trackToken = trackToken;
    }
}
