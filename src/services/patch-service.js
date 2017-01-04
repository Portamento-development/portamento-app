patchService.$inject = ['$http', 'apiUrl'];

export default function patchService($http, apiUrl) {
    return {
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