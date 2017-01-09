import template from './app-header.html';
import styles from './app-header.scss';

export default {
    template,
    bindings: {
        currentUser: '<'
    },
    controller
};

controller.$inject = ['$state', 'authService'];

function controller($state, authService) {
    this.styles = styles;
    this.action = 'signin';
    this.badSignin = false;
    this.badUsername = false;

    this.login = () => {
        this.credentials = {
            username: this.username,
            password: this.password
        };
        if (this.action === 'signup') {
            authService.signup(this.credentials)
                .then(res => {
                    this.currentUser = res;
                    this.badUsername = false;
                    $state.reload('home');
                })
                .catch(() => {
                    this.badUsername = true;
                });
        } else if (this.action === 'signin') {
            authService.signin(this.credentials)
                .then(res => {
                    this.currentUser = res;
                    this.badSignin = false;

                    $state.reload('home');

                })
                .catch(() => {
                    this.badSignin = true;
                });
        } 
    };

    this.logout = () => {
        authService.logout();
        this.currentUser = null;
        $state.reload('home');

    };

}