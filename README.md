# nodedora
A web-based Pandora music player

## Under Active Development
This project is not usable in its current state. 
There is significant further development required.

## Prerequisites
- NodeJS 12
- A Pandora account

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
docker build -t nodedora .
docker run -p8000:8000 nodedora
```
