import template from './user.html';
import styles from './user.scss';

export default {
    template,
    bindings: {
        currentUser: '<',
        userData: '<'
    },
    controller
};

controller.$inject = ['userService'];

function controller () {
    this.styles = styles;
    this.isMe = false;

    this.$onInit = () => {
        if(this.currentUser.id === this.userData._id) {
            console.log('patches:', this.userData);
            this.isMe = true;
        }
        // console.log('Im user data',this.userData);
    };
}