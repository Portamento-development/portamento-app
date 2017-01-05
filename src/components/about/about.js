import template from './about.html';
import styles from './about.scss';

export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
}