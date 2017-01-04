import template from './app-header.html';
import styles from './app-header.scss';

export default {
    template,
    controller
};

controller.$inject = ['authService'];

function controller(authService) {
    this.styles = styles;
    this.action = 'signup';


    this.login = () => {
        this.credentials = {
            username: this.username,
            password: this.password
        };
        if (this.action === 'signup') {
            authService.signup(this.credentials);
        } else if (this.action === 'signin') {
            authService.signin(this.credentials);
        }
    };

}