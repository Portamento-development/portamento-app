import template from './user.html';
import styles from './user.scss';

export default {
    template,
    bindings: {
        user: '<',
        userData: '<'
    },
    controller
};

controller.$inject = ['userService'];

function controller () {
    this.styles = styles;
    this.isMe = false;

    this.$onInit = () => {
        if(this.user.id === this.userData._id) {
            // console.log('yo its me');
            this.isMe = true;
        }
        // console.log('Im user data',this.userData);
    };
}