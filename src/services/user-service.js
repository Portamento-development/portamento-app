userService.$inject = ['$http', 'apiUrl', 'authService'];

export default function userService($http, apiUrl, authService) {

    const id = authService.currentUser.id;
    console.log('id from userService,', id);

    return {
        getUserById() {
            return $http.get(`${apiUrl}/users/${id}`)
                .then(res => res.data);
        }    
    };
}