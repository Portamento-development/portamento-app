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
                // console.log('hi from routes.js. user:', user);
                return user.currentUser;
            }],
            userData: ['userService', '$transition$', (userService, t) => {
                return userService.getUserById(t.params().id);
            }]
        },
        component: 'user'
    });

    $stateProvider.state({
        name: 'social',
        url: '/social',
        resolve: {
            favs: ['patchService', (patchService) =>{
                return patchService.getByFavs();
            }],
            votes: ['patchService', (patchService) =>{
                return patchService.getByVotes();
            }],
            userFollows: ['userService', (userService) => {
                return userService.getByFollowed();
            }]
        },
        component: 'social'
    });

    $urlRouterProvider.otherwise('/');
}