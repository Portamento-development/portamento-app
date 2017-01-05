authService.$inject = ['tokenService', '$http', 'apiUrl', '$state'];

export default function authService(tokenService, $http, apiUrl, $state) {
    let currentUser = null;
    const currentToken = tokenService.get();
    if (currentToken) {
        $http
            .get(`${apiUrl}/auth/verify`)
            .catch(() => tokenService.remove());
    }

    const credential = endpoint => {
        return (credentials) => {
            return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
                .then(result => {
                    tokenService.set(result.data.token);
                    console.log('hi from the authService, here is result.data', result.data);
                    currentUser = result.data;
                    return currentUser;
                })
                .catch(err => {
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
            $state.go('home');
            return currentUser;
        },
        signin: credential('signin'),
        signup: credential('signup'),
        get currentUser() {
            return currentUser;
        }
    };
}