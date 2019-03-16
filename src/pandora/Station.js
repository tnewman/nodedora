class Station {
  constructor(stationId, name) {
    this.stationId = stationId;
    this.name = name;
  }

  static fromJSON(json) {
    return new Station(json.stationId, json.name);
  }
}

module.exports = Station;
