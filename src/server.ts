import app from './app';
import http from 'http';
import logger from './logger';
import process from 'process';

const HOSTNAME = '0.0.0.0';
const PORT = 8000;

const server = http.createServer(app.callback());

server.listen(PORT, HOSTNAME, (): void => {
    logger.info(`nodedora listening on ${HOSTNAME}:${PORT}.`);
});

const serverClose = (): void => {
    logger.info('Shutting down.')
    server.close((err): void => {
        if(err) {
            logger.error(err);
            process.exit(1);
        } else {
            logger.info('Successfully shut down.');
            process.exit(0);
        }
    });
};

process.on('SIGINT', serverClose);
process.on('SIGTERM', serverClose);
