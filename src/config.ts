import process from 'process';

const HOSTNAME = '0.0.0.0';
const PORT = 8000;
const PANDORA_USERNAME = <string> process.env.PANDORA_USERNAME;
const PANDORA_PASSWORD = <string> process.env.PANDORA_PASSWORD;

export default {
    HOSTNAME,
    PORT,
    PANDORA_USERNAME,
    PANDORA_PASSWORD,
}
