authService.$inject = ['tokenService, $http', 'apiUrl'];

export default function authService(tokenService, $http, apiUrl) {
    const currentToken = tokenService.get();
    if (currentToken) {
        $http
            .get(`${apiUrl}/auth/verify`)
            .catch(() => tokenService.remove());
    }

    function credential(endpoint) {
        return (credentials) => {
            return $http.post(`${apiUrl}/auth/${endpoint}`, credentials)
                .then(result => {
                    tokenService.set(result.data.token);
                })
                .catch(err => {
                    throw err.data;
                });
        };
    }

    return {
        isAuthenticated() {
            return !!tokenService.get();
        },
        logout() {
            tokenService.remove();
        },
        signin: credential('signin'),
        signup: credential('signup')
    };
}