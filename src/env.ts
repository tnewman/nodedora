import { config } from 'dotenv';

import logger from './logger';

logger.info('Loading environment variables from .env');

config();
