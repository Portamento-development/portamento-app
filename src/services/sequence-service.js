sequenceService.$inject = ['$http', 'apiUrl'];

export default function sequenceService($http, apiUrl) {
    return {
        get(patchId) {
            return $http.get(`${apiUrl}/sequences/by_patch/${patchId}`)
                .then(res => res.data);
        },
        add(sequence) {
            return $http.post(`${apiUrl}/sequences`, sequence)
                .then(res => res.data);
        }
    };
}