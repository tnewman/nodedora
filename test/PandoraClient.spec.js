const { assert } = require('./chai');
const PandoraClient = require('../src/PandoraClient');
const PandoraCredentials = require('./PandoraCredentials');

describe('Pandora Client', async () => {
  const pandoraClient = new PandoraClient(PandoraCredentials.username, PandoraCredentials.password);

  before(async () => {
    await pandoraClient.login();
  });

  it('should authenticate with valid credentials', async () => {
    await pandoraClient.login();
  });

  it('should throw an exception with invalid credentials', async () => {
    const pandoraClientBadCredentials = new PandoraClient('bad', 'bad');
    await assert.isRejected(pandoraClientBadCredentials.login());
  });

  it('should throw an exception when not logged in', async () => {
    const pandoraClientNotLoggedIn = new PandoraClient(
      PandoraCredentials.username,
      PandoraCredentials.password,
    );

    pandoraClientNotLoggedIn.cookie = null;
    pandoraClientNotLoggedIn.csrfToken = null;
    pandoraClientNotLoggedIn.authToken = null;

    try {
      pandoraClientNotLoggedIn.checkLogin();
    } catch (e) {
      return;
    }

    assert.fail();
  });

  it('should display the list of current stations', async () => {
    const stations = await pandoraClient.listStations();
    assert.ok(stations);
  });

  it('should display the playlist for a station', async () => {
    const { stations } = await pandoraClient.listStations();
    const songs = await pandoraClient.getPlaylist(stations[0].stationId);
    assert.ok(songs);
  });
});
