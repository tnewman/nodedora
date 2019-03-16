const { assert } = require('../chai');
const Configuration = require('../../src/configuration/Configuration');
const ConfigurationService = require('../../src/configuration/ConfigurationService');

describe('Configuration Service', () => {
  const configurationService = new ConfigurationService();

  it('should save and load a configuration', async () => {
    const configuration = new Configuration({
      stationId: '5',
    });

    await configurationService.save(configuration);
    assert.deepStrictEqual(await configurationService.load(), configuration);
  });

  it('should load a default configuration', async () => {
    await configurationService.del('nodedora:configuration');

    assert.deepStrictEqual(await configurationService.load(), new Configuration({
      stationId: '0',
    }));
  });
});
