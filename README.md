This project was completely dockerized and you just need of the last version of docker into your host machine.

## Architecture

Bravi Test
├-- Api (Express.js)
│   └-- bin
│       └-- www
│   └-- config
│       └-- db.js
│       └-- router.js
│   └-- endpoints
│       └-- person
│           └-- index.js
│           └-- person.js
│   └-- tests
│       └-- routes.test.js
│   └-- app.js
│   └-- package-lock.js
│   └-- package.js
├-- App (Angular 8)
│   └-- e2e
│       └-- (...)
│   └-- src
│       └-- app
│           └-- components (...)
│       └-- assets
│           └-- css (...)
│           └-- img (...)
│       └-- environments
│       └-- services
│           └-- (...)
├-- Docker
│   └-- database
│       └-- mongo
│           └-- data
│   └-- ApiDockerFile
│   └-- AppDockerFile

## Enviroments

Create your own .env file based in .env.example of this directory.

## Build

sudo docker-compose build

## Running

sudo docker-compose up -d
