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

function controller (userService) {
    this.styles = styles;
    this.isMe = false;

    this.$onInit = () => {
        this.followed = false;
        if(this.currentUser.id === this.userData._id) {
            this.isMe = true;
        }
        userService.getUserById(this.currentUser.id)
            .then(user => {
                user.followingId.forEach(obj => {
                    if(obj._id === this.userData._id) this.followed = true;
                });
            });
    };
    this.follow = () => {
        userService.getUserById(this.currentUser.id)
            .then(user => {
                user.followingId.push(this.userData._id);
                console.log('userData', this.userData);
                userService.updateUser(this.currentUser.id, user);
            });
    };

    this.unfollow = () => {
        userService.getUserById(this.currentUser.id)
            .then(user => {
                user.followingId.forEach((obj, index) => {
                    if(obj._id === this.userData._id) {
                        user.followingId.splice(index, 1);
                    }
                });
                userService.updateUser(this.currentUser.id, user);
            });
    };

}