routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'home',
        url: '/',
        resolve: {
            currentUser: ['authService', 'userService', (auth, user) => {
                if(auth.isAuthenticated()) {
                    return user.getCurrent();
                }
            }],
            userPatches: ['patchService', patchService => {
                return patchService.getAll();
            }]
        }, 
        component: 'synth'
    });

    $stateProvider.state({
        name: 'about',
        url: '/about',
        component: 'about'
    });

    $stateProvider.state({
        name: 'user',
        url: '/user/:id',
        resolve: {
            userData: ['userService', '$transition$', (userService, t) => {
                return userService.getUserById(t.params().id);
            }]
        },
        component: 'user'
    });

    $urlRouterProvider.otherwise('/');
}