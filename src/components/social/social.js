import template from './social.html';
import styles from './social.scss';

export default {
    template,
    bindings: {
        favs: '<',
        votes: '<',
        userFollows: '<',
        recentUsers: '<',
        randomPatches: '<'
    },
    controller
};

function controller () {
    this.$onInit = function() {
        console.log('votes', this.votes);
    };
    this.styles = styles;
    
}