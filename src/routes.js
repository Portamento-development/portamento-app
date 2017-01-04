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

    $urlRouterProvider.otherwise('/');
}