patchService.$inject = ['$http', 'apiUrl'];

export default function patchService($http, apiUrl) {
    return {
        getAll(userId) {
            return $http.get(`${apiUrl}/patchs?userId=${userId}`)
                .then(res => {
                    return res.data;
                });
        },
        get(patchId) {
            return $http.get(`${apiUrl}/patchs/${patchId}`)
                .then(res => {
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
        },
        update(patchId, updatedPatch) {
            return $http.put(`${apiUrl}/patchs/${patchId}`, updatedPatch)
                .then(res => res.data);
        },
        remove(patchId) {
            return $http.delete(`${apiUrl}/patchs/${patchId}`)
                .then(res => res.data);
        }
    };
}