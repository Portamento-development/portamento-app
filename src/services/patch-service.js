patchService.$inject = ['$http', 'apiUrl'];

export default function patchService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/patchs`)
                .then(res => {
                    console.log('getAll response: ', res);
                    return res.data;
                });
        },
        get(patchId) {
            return $http.get(`${apiUrl}/patchs/${patchId}`)
                .then(res => res.data);
        },
        add(patch) {
            return $http.post(`${apiUrl}/patchs`, patch)
                .then(res => res.data);
        }
    };
}