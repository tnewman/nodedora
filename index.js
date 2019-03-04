const nodepat = require('nodepat');
const PandoraClient = require('./src/pandora/PandoraClient');

(async () => {
  const pandoraClient = new PandoraClient('tnewman1@ltu.edu', 'Seapickle99');
  await pandoraClient.login();
  const stations = await pandoraClient.listStations();
  const [station] = stations;

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const playlist = await pandoraClient.getPlaylist(station.stationId);
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
