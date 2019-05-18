import './env';

import app from './app';
import http from 'http';
import logger from './logger';
import process from 'process';

const HOSTNAME = '0.0.0.0';
const PORT = 8000;

const server = http.createServer(app.callback());

server.listen(PORT, HOSTNAME, () => {
    logger.info(`nodedora listening on ${HOSTNAME}:${PORT}.`);
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
