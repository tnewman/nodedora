const nodepat = require('nodepat');
const Configuration = require('./src/configuration/Configuration');
const ConfigurationService = require('./src/configuration/ConfigurationService');
const PandoraClient = require('./src/pandora/PandoraClient');

(async () => {
  let stationId;

  const configurationService = new ConfigurationService();
  const configuration = await configurationService.load();

  const pandoraClient = new PandoraClient('tnewman1@ltu.edu', 'Seapickle99');
  await pandoraClient.login();

  if (configuration) {
    ({ stationId } = configuration);
  } else {
    const stations = await pandoraClient.listStations();
    [{ stationId }] = stations;
    await configurationService.save(Configuration.fromJSON({
      stationId,
    }));
  }

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const playlist = await pandoraClient.getPlaylist(stationId);
    console.log('Retrieved Playlist');

    // eslint-disable-next-line no-restricted-syntax, no-await-in-loop
    for await (const track of playlist) {
      console.log(`Playing ${track.songTitle}`);
      await Promise.all([
        nodepat.play(track.audioURL),
        pandoraClient.trackStarted(track.trackToken),
      ]);
    }
  }
})();
