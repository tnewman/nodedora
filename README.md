# nodedora
A web-based Pandora music player

## Under Active Development
This project is not usable in its current state. 
There is significant further development required.

## Prerequisites
- NodeJS 10 (Upstream libraries do not support NodeJS 12 yet)
- A Pandora account

## Environment
Create a `.env` file to configure the application, using 
`.env.example` as a template. At a minimum, valid Pandora 
credentials are required. 

## Development
- Install Dependencies: `npm i`
- Run TypeScript Build: `npm run build`
- Run Linter: `npm run lint`
- Run Tests: `npm run test`
- Run Node Server: `npm start`
- Run Tests with Auto-Reload: `npm run dev:test`
- Run Node Server with Auto-Reload: `npm run dev:start`
- Run Node Server and Tests with Auto-Reload: `npm run dev`

## Running
### Locally
```bash
npm i
npm start
```

### Docker
```bash
docker build --build-arg "ENV_FILE=$(cat .env)" -t nodedora .
docker run --env-file .env -p8000:8000 nodedora
```
