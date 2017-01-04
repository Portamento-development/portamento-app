import template from './app.html';

export default {
    template,
    bindings: {
        userPatches: '<'
    },
    controller
};

function controller() {
    this.$onInit = () => {
        console.log(this.userPatches);
    };
}