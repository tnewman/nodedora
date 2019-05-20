export default class Station {
    readonly stationId: string;
    readonly name: string;

    constructor(station: Station) {
        this.stationId = station.stationId;
        this.name = station.name;
    }
}
