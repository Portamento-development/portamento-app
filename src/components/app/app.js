import template from './app.html';

export default {
    template,
    bindings: {
        userPatches: '<'
    },
    controller
};

controller.$inject = ['authService'];

function controller(auth) {
    this.currentUser = null;

    this.$onInit = () => {
        if (auth.isAuthenticated()) {
            this.currentUser = auth.currentUser;
            console.log('Init currentUser: ', this.currentUser);
        }
    };
}