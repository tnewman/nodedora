import './env';

import http from 'http';
import process from 'process';

import App from './app';
import Config from './config';
import logger from './logger';
import Router from './router';
import Service from './service';
import PandoraClient from './pandora-client/pandora-client';

(async () => {
    const pandoraClient = await PandoraClient.makePandoraClient(
        Config.PANDORA_USERNAME,
        Config.PANDORA_PASSWORD
    );

    const service = new Service(pandoraClient);
    const router = new Router(service);

    const server = http.createServer(new App(router).callback());

    server.listen(Config.PORT, Config.HOSTNAME, () => {
        logger.info(`nodedora listening on ${Config.HOSTNAME}:${Config.PORT}.`);
    });

    const serverClose = () => {
        logger.info('Shutting down.')
        server.close((err) => {
            if(err) {
                logger.error(err);
            } else {
                logger.info('Successfully shut down.');
            }
        });
    };

    process.on('SIGINT', serverClose);
    process.on('SIGTERM', serverClose);
})();
