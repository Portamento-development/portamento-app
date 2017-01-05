patchService.$inject = ['$http', 'apiUrl'];

export default function patchService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/patchs`)
                .then(res => {
                    // console.log('getAll response: ', res);
                    return res.data;
                });
        },
        get(patchId) {
            console.log('in patch service');
            return $http.get(`${apiUrl}/patchs/${patchId}`)
                .then(res => {
                    console.log(res.data);
                    return res.data;
                });
        },
        getByVotes() {
            return $http.get(`${apiUrl}/patchs/votes`)
                .then(res => res.data);
        },
        getByFavs() {
            return $http.get(`${apiUrl}/patchs/favs`)
                .then(res => res.data);
        },
        add(patch) {
            return $http.post(`${apiUrl}/patchs`, patch)
                .then(res => res.data);
        }
    };
}