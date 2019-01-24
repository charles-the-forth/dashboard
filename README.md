# Data Dashboard
This is our single page web application for data visualisation. It is written in ReactJS on client side. For nice design we've chosen Material-UI and for charts we've used Recharts. On backend we are using ExpressJS.

## Manager
This route is used to created new measurement. You can also explore your previous measurement.

## Chart Dashboard
On this route you can see overall charts of your experiment (temperature, pressure, speed, altitude and location). By clicking at each tile you can get to detail section of each parametr.

## Dependencies
- NodeJS
- yarn

## Installation
First of all clone repository. Then download backend dependencies. In root folder of project run this command:
```
yarn install
```

then move to frontend folder and install dependencies:

```
cd client
yarn install
```

## Start
At first run backend in root folder with this command:

```
yarn start
```

then move to `client` folder and run frontend:

```
cd client
yarn start
```

And finally open http://localhost:3000/ in your browser.
