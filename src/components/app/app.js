import template from './app.html';

export default {
    template,
    controller
};

controller.$inject = ['authService', 'userService'];

function controller(auth, user) {
    this.currentUser = null;

    this.$onInit = () => {
        if(auth.isAuthenticated()) {
            this.currentUser = user.getCurrent();
            console.log('current user: ', this.currentUser);
        }
    };

}