routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'home',
        url: '/',
        resolve: {
            userPatches: ['patchService', patchService => {
                return patchService.getAll();
            }]
        }, 
        component: 'app'
    });

    $stateProvider.state({
        name: 'users',
        url: '/users',
        resolve: {
            user: ['authService', user => {
                console.log('hi from routes.js. user:', user);
                return user.currentUser;
            }]
        },
        component: 'users'
    });

    $urlRouterProvider.otherwise('/');
}