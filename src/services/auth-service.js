authService.$inject = ['userService', 'tokenService', '$http', 'apiUrl', '$state', '$window'];

export default function authService(userService, tokenService, $http, apiUrl, $state, $window) {

    let currentUser = null;
    const currentToken = tokenService.get();
    if (currentToken) {
        $http
            .get(`${apiUrl}/auth/verify`)
            .catch(() => {
                tokenService.remove;
                $window.localStorage.removeItem('id');
                $window.localStorage.removeItem('username');
            });
    }

    const credential = endpoint => {
        return (credentials) => {
            return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
                .then(result => {
                    currentUser = {};
                    $window.localStorage.setItem('id', result.data.id);
                    $window.localStorage.setItem('username', result.data.username);
                    tokenService.set(result.data.token);
                    currentUser.id = result.data.id;
                    currentUser.username = result.data.username;
                    return currentUser;
                })
                .catch(err => {
                    console.log('catch', err);
                    throw err.data;
                });
        };
    };

    return {
        isAuthenticated() {
            return !!tokenService.get();
        },
        logout() {
            currentUser = null;
            userService.logout();
            $state.go('home');
        },
        signin: credential('signin'),
        signup: credential('signup'),
        get currentUser() {
            return currentUser;
        }
    };
}