module.exports = class Configuration {
  constructor(stationId) {
    this.stationId = stationId;
  }

  static fromJSON(json) {
    return new Configuration(json.stationId);
  }
};
