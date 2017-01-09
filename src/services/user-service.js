userService.$inject = ['$http', 'apiUrl', '$window'];

export default function userService($http, apiUrl, $window) {

    return {
        getCurrent() {
            let currentUser = {};
            currentUser.id = $window.localStorage.getItem('id');
            currentUser.username = $window.localStorage.getItem('username');
            return currentUser;
        },
        logout() {
            $window.localStorage.removeItem('id');
            $window.localStorage.removeItem('username');
            $window.localStorage.removeItem('token');
        },
        getUserById(routeId) {
            return $http.get(`${apiUrl}/users/${routeId}`)
                .then(res => res.data);
        },
        updateUser(userId, updatedUser) {
            return $http.put(`${apiUrl}/users/${userId}`, updatedUser);
        },
        getByFollowers() {
            return $http.get(`${apiUrl}/users/followers`)
                .then(res => res.data);
        },
        getRecent() {
            return $http.get(`${apiUrl}/users/recent`)
                .then(res => res.data);
        },
        getRandom() {
            return $http.get(`${apiUrl}/users/random`)
                .then(res => res.data);
        }
    };
}