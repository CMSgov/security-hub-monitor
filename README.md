# Security Hub monitor

## Description

This is a tool to take the data published by the [security-hub-collector](https://github.com/CMSgov/security-hub-collector) and allows
you to filter and display the results.

![Preview of the tool](./preview.png)

## General Usage

- Go into the `./build` directory, and run the `server` executable appropriate for your platform.
  - e.g. For MacOS, you would run `server-darwin`
- Open `http://localhost:8080` in your browser.

### Running in Docker Desktop
#### Build Docker Image
`docker build -t security-hub-monitor .`

#### Run Docker Image in the background
`docker run -dit -p 8080:8080 security-hub-monitor`

#### Run Docker Image in the foreground
`docker run -it -p 8080:8080 security-hub-monitor`

#### Access the application
Open `http://localhost:8080` in your browser.

## Development

Make sure you have a recent version of node.js installed and available and are able to run `npm`

Install [pre-commit](https://pre-commit.com/) hooks in order to take advantage of linting prior to opening a PR.

1. Install pre-commit
    1. MacOS: `brew install pre-commit`
    1. PIP: `pip install pre-commit`
1. Install project specific hooks
    1. From inside the git checkout: `pre-commit install`

### Install dependencies

`npm i`

### Build a static version

`npm run build`

### Serve the static version locally

`serve -s build`
