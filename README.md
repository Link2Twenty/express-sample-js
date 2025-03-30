## My Express Microservice

This is an example of how I (Link2Twenty) layout an Express microservice.

Documentation generated from JSDoc is available [here](https://link2twenty.github.io/express-sample-js/).

### Overview

This microservice provides a simple API for retrieving Astronomy Picture of the Day (APOD) entries from NASA, all API request are made from the server to [nasa's api](https://github.com/nasa/apod-api) before forwarding the data on.

This is only a sample project to show style, layout and documentation techniques and is not intended to be used in any form of production environment.

### Usage

```bash
# run server
node .

# generate docs
npm run jsdoc

# load env file and run server
node --env-file=.env .
```

#### Environment variables

To set environment variables you will either have to set them in the system environment (recommended for docker) or load in a seperate `.env` file.

```bash
PORT=NUMBER # port express is exposed on
API_KEY=STRING # NASA API_KEY
```
