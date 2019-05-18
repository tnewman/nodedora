export default class Station {
    readonly stationId: string;
    readonly name: string;

    constructor(stationId: string, name: string) {
        this.stationId = stationId;
        this.name = name;
    }
}
