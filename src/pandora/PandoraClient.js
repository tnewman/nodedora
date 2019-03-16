const request = require('request-promise');
const Station = require('./Station');
const Track = require('./Track');

const PANDORA_URL = 'https://www.pandora.com';
const API_URL = `${PANDORA_URL}/api`;

class PandoraClient {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.cookie = null;
    this.csrfToken = null;
    this.authToken = null;
  }

  async login() {
    await this.setCsrfToken();

    const response = await request({
      method: 'POST',
      uri: `${API_URL}/v1/auth/login`,
      body: {
        existingAuthToken: null,
        keepLoggedIn: true,
        password: this.password,
        username: this.username,
      },
      headers: {
        'Content-Type': 'application/json',
        Cookie: this.cookie,
        'X-CsrfToken': this.csrfToken,
      },
      json: true,
    });

    this.authToken = response.authToken;
  }

  async listStations(pageSize = 250, startIndex = 0) {
    return (await this.pandoraRequest('/v1/station/getStations', {
      pageSize,
      startIndex,
    })).stations.map(stationData => Station.fromJSON(stationData));
  }

  async getPlaylist(stationId) {
    await this.resumePlayback();
    return (await this.pandoraRequest('/v1/playlist/getFragment', {
      stationId,
      isStationStart: false,
    })).tracks.map(trackData => Track.fromJSON(trackData));
  }

  async trackStarted(trackToken) {
    await this.pandoraRequest('/v1/station/trackStarted', {
      trackToken,
    });
  }

  async setCsrfToken() {
    const response = await request({
      method: 'HEAD',
      uri: PANDORA_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const CSRF_REGEX = /csrftoken=(\w+);/g;

    [, this.cookie] = response['set-cookie'];
    [, this.csrfToken] = CSRF_REGEX.exec(this.cookie);
  }

  checkLogin() {
    if (!this.cookie || !this.csrfToken || !this.authToken) {
      throw new Error('Login is required before using Pandora. Please login.');
    }
  }

  async resumePlayback() {
    return this.pandoraRequest('/v1/station/playbackResumed', {
      forceActive: true,
    });
  }

  async pandoraRequest(path, body) {
    await this.checkLogin();
    return request({
      method: 'POST',
      uri: `${API_URL}${path}`,
      body,
      headers: {
        'Content-Type': 'application/json',
        Cookie: this.cookie,
        'X-AuthToken': this.authToken,
        'X-CsrfToken': this.csrfToken,
      },
      json: true,
    });
  }
}

module.exports = PandoraClient;
