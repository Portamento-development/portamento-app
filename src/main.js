import angular from 'angular';
import components from './components';
import uiRouter from 'angular-ui-router';
import services from './services';
import routes from './routes';
import routeDefault from 'angular-ui-router-default';
import http from './http';
import './scss/main.scss';

const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    routeDefault
]);

const dev = 'http://localhost:3000/api';
const url = process.env.API_URL || dev;
app.value('apiUrl', url);

app.config(http);
app.config(routes);



