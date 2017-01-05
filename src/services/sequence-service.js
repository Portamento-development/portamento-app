sequenceService.$inject = ['$http', 'apiUrl'];

export default function sequenceService($http, apiUrl) {
    return {
        get(sequenceId) {
            return $http.get(`${apiUrl}/sequences/${sequenceId}`)
                .then(res => res.data);
        },
        add(sequence) {
            return $http.post(`${apiUrl}/sequences`, sequence)
                .then(res => res.data);
        }
    };
}