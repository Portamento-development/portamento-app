import angular from 'angular';
import components from './components';
import uiRouter from 'angular-ui-router';
import services from './services';
import routes from './routes';
import routeDefault from 'angular-ui-router-default';
import http from './http';

const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    routeDefault
]);

const dev = 'http://localhost:3000/api';
app.value('apiUrl', dev);

app.config(http);
app.config(routes);



