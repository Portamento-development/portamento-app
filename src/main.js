import angular from 'angular';
import components from './components';
import uiRouter from 'angular-ui-router';
import services from './services';
import routes from './routes';
import routeDefault from 'angular-ui-router-default';
import './styles/main.scss';

const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    routeDefault
]);

app.config(routes);

const dev = 'http://localhost:3000/api';

app.value('apiUrl', dev);

