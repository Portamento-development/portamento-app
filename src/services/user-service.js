userService.$inject = ['$http', 'apiUrl', 'authService'];

export default function userService($http, apiUrl, authService) {

    const id = authService.currentUser.id;
    console.log('id from userService,', id);

    return {
        getUserById(routeId) {
            return $http.get(`${apiUrl}/users/${routeId}`)
                .then(res => res.data);
        },

        updateUserPatches(userId, updatedUser) {
            return $http.put(`${apiUrl}/users/${userId}`, updatedUser);
        },
        getByFollowed() {
            return $http.get(`${apiUrl}/users/followed`)
                .then(res => res.data);
        }  
    };
}