import template from './users.html';
import styles from './users.scss';

export default {
    template,
    bindings: {
        id: '<',
        user: '<'
    },
    controller
};

controller.$inject = ['userService', 'authService'];

function controller () {
    this.styles = styles;

}