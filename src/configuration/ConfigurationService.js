const redis = require('redis');
const util = require('util');
const Configuration = require('../../src/configuration/Configuration');

const CONFIGURATION_KEY = 'nodedora:configuration';

module.exports = class ConfigurationService {
  constructor() {
    this.redisClient = redis.createClient();
    this.get = util.promisify(this.redisClient.get).bind(this.redisClient);
    this.set = util.promisify(this.redisClient.set).bind(this.redisClient);
    this.del = util.promisify(this.redisClient.del).bind(this.redisClient);
    this.quit = this.redisClient.quit.bind(this.redisClient);
  }

  async load() {
    const configuration = JSON.parse(await this.get(CONFIGURATION_KEY));

    if (configuration === null) {
      return new Configuration({
        stationId: '0',
      });
    }

    return new Configuration(configuration);
  }

  async save(configuration) {
    await this.set(CONFIGURATION_KEY, JSON.stringify(configuration));
  }
};
