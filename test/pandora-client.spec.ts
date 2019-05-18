import '../src/env';

import process from 'process';

import PandoraClient from '../src/pandora-client/pandora-client';

describe('Pandora Client', () => {
    let pandoraClient: PandoraClient;

    beforeAll(async () => {
        pandoraClient = await PandoraClient.makePandoraClient(
            <string> process.env.PANDORA_USERNAME,
            <string> process.env.PANDORA_PASSWORD,
        );
    });

    it('should list stations', async () => {
        const stations = await pandoraClient.listStations();

        expect(stations.length).toBeGreaterThanOrEqual(1);

        const station = stations[0];

        expect(typeof station.stationId).toBe('string');
        expect(typeof station.name).toBe('string');
    });
});
