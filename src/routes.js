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
        component: 'synth'
    });

    $stateProvider.state({
        name: 'about',
        url: '/',
        component: 'about'
    });

    $stateProvider.state({
        name: 'user',
        url: '/user/:id',
        resolve: {
            user: ['authService', user => {
                console.log('hi from routes.js. user:', user);
                return user.currentUser;
            }],
            userData: ['userService', '$transition$', (userService, t) => {
                return userService.getUserById(t.params().id);
            }]
        },
        component: 'user'
    });

    $urlRouterProvider.otherwise('/');
}