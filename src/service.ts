import Config from './config';
import PandoraClient from './pandora-client/pandora-client';
import Station from './pandora-client/station';

export default class Service {

    private pandoraClient: PandoraClient;

    constructor(pandoraClient: PandoraClient) {
        this.pandoraClient = pandoraClient;
    }

    async listStations(): Promise<Station[]> {
        return await this.pandoraClient.listStations();
    }
}
