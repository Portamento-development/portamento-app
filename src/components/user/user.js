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

controller.$inject = ['userService', 'patchService'];

function controller (userService, patchService) {
    this.styles = styles;
    this.isMe = false;

    this.$onInit = () => {
        if(this.currentUser.id === this.userData._id) {
            this.isMe = true;
        }
    };
    this.follow = () => {
        userService.getUserById(this.currentUser.id)
            .then(user => {
                user.followingId.push(this.userData._id);
                console.log('userData', this.userData);
                userService.updateUser(this.currentUser.id, user);
            });
    };
    this.remove = (patch) => {
        patchService.remove(patch);
        let removedPatch = this.userData.patchId.indexOf(patch);
        this.userData.patchId.splice(removedPatch, 1);
    };
}