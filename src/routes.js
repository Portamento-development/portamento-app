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
            userPatches: ['currentUser', 'patchService', (currentUser, patchService) => {
                if(currentUser) {
                    return patchService.getAll(currentUser.id);
                }
            }],
            userData: ['currentUser', 'userService', (currentUser, userService) => {
                if(currentUser) {
                    return userService.getUserById(currentUser.id);
                }
            }],
            favPatches: ['userData', (userData) => {
                return userData.favoriteId;
            }]
        }, 
        component: 'synth'
    });

    $stateProvider.state({
        name: 'patch',
        url: '/patch/:id',
        resolve: {
            currentUser: ['authService', 'userService', (auth, user) => {
                if(auth.isAuthenticated()) {
                    return user.getCurrent();
                }
            }],
            loadedPatch: ['patchService', '$transition$', (patchService, t) => {
                return patchService.get(t.params().id)
                    .then(patch => patch);
            }],
            userPatches: ['currentUser', 'patchService', (currentUser, patchService) => {
                if(currentUser) {
                    return patchService.getAll(currentUser.id);
                }
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
            currentUser: ['authService', 'userService', (auth, user) => {
                if(auth.isAuthenticated()) {
                    return user.getCurrent();
                }
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