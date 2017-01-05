authService.$inject = ['tokenService', '$window', '$http', 'apiUrl'];

export default function authService(tokenService, $window, $http, apiUrl) {
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
                    console.log(currentUser);
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
            tokenService.remove();
        },
        signin: credential('signin'),
        signup: credential('signup'),
        get currentUser() {
            return currentUser;
        }
    };
}