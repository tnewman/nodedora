import app from './app';
import logger from './logger';

const HOSTNAME = '0.0.0.0';
const PORT = 8000;

app.listen(PORT, HOSTNAME, (): void => {
    logger.info(`nodedora listening on ${HOSTNAME}:${PORT}`)
});
