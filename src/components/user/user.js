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
        this.followed = true;
        userService.getUserById(this.currentUser.id)
            .then(user => {
                user.followingId.push(this.userData._id);
                console.log('userData', this.userData);
                userService.updateUser(this.currentUser.id, user);
            })
            .then(() => {
                return userService.getUserById(this.userData._id);
            })
            .then(user => {
                console.log(user);
                if(!user.followers) user.followers = 0;
                user.followers += 1;
                userService.updateUser(this.userData._id, user);
            });
    };


    this.unfollow = () => {
        this.followed = false;
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

    this.remove = (patch) => {
        patchService.remove(patch);

        let removedIndex = this.userData.patchId.findIndex(item => {
            return item._id === patch;
        });
        console.log('patch', patch);
        console.log('removed index', removedIndex);
        this.userData.patchId.splice(removedIndex, 1);
        console.log('array', this.userData.patchId);
    };
}