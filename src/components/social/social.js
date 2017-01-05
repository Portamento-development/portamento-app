import template from './social.html';
import styles from './social.scss';

export default {
    template,
    bindings: {
        favs: '<',
        votes: '<',
        userFollows: '<'
    },
    controller
};

function controller () {
    this.styles = styles;
    
}