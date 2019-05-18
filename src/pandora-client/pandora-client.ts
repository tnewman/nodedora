import cookie from 'cookie';
import request from 'request-promise-native';

import logger from '../logger';
// eslint-disable-next-line no-unused-vars
import Station from './station';

export default class PandoraClient {
    private username: string;
    private password: string;

    private authToken?: string;

    private csrfToken?: string;
    private csrfCookie?: string;

    private constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    static async makePandoraClient(username: string, password: string): Promise<PandoraClient> {
        const pandoraClient = new PandoraClient(username, password);
        await pandoraClient.login();
        return pandoraClient;
    }

    async listStations(): Promise<Station[]> {
        logger.info('Retrieving Stations from Pandora');

        const response = await request({
            method: 'POST',
            uri: 'https://www.pandora.com/api/v1/station/getStations',
            body: {
                pageSize: 1000,
                startIndex: 0,
            },
            headers: this.getHeaders(),
            json: true,
        });

        const stations = <Station[]>response.stations;

        logger.info(`Retrieved "${stations.length}" Stations from Pandora`);

        return stations;
    }

    private async setCSRFToken() {
        logger.info('Retrieving CSRF Token from Pandora');

        const response = await request({
            method: 'HEAD',
            uri: 'https://www.pandora.com',
        });

        const csrfCookie = response['set-cookie']
            .filter((cookie: string) => cookie.includes('csrftoken'))[0];

        this.csrfToken = Object.entries(cookie.parse(csrfCookie))
            .filter(([key]) => key == 'csrftoken')
            .map(([, value]) => value)[0];

        this.csrfCookie = csrfCookie;

        logger.info('Set CSRF Token from Pandora');
    }

    private async login() {
        logger.info(`Logging into Pandora as "${this.username}"`);

        await this.setCSRFToken();

        const response = await request({
            method: 'POST',
            uri: 'https://www.pandora.com/api/v1/auth/login',
            body: {
                existingAuthToken: null,
                keepLoggedIn: true,
                password: this.password,
                username: this.username,
            },
            headers: this.getHeaders(),
            json: true,
        });

        this.authToken = response.authToken;

        logger.info(`Logged into Pandora as "${this.username}"`);
    }

    private getHeaders() {
        return {
            Cookie: this.csrfCookie,
            'Content-Type': 'application/json;charset=utf-8',
            'X-CsrfToken': this.csrfToken,
            'X-AuthToken': this.authToken,
        };
    }
}
