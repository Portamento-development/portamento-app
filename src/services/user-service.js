userService.$inject = ['$http', 'apiUrl', 'authService', '$window'];

export default function userService($http, apiUrl, authService, $window) {

    // const id = authService.currentUser.id;
    // console.log('id from userService,', id);

    return {
        getCurrent() {
            let currentUser = {};
            currentUser.id = $window.localStorage.getItem('id');
            currentUser.username = $window.localStorage.getItem('username');
            return currentUser;
        },
        logout() {
            let currentUser = null;
            $window.localStorage.removeItem('id');
            $window.localStorage.removeItem('username');
            $window.localStorage.removeItem('token');
            return currentUser;
        },
        getUserById(routeId) {
            return $http.get(`${apiUrl}/users/${routeId}`)
                .then(res => res.data);
        },

        updateUserPatches(userId, updatedUser) {
            return $http.put(`${apiUrl}/users/${userId}`, updatedUser)
        },
        getByFollowed() {
            return $http.get(`${apiUrl}/users/followed`)
                .then(res => res.data);
        }  
    };
}