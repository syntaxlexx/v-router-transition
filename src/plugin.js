import VRouterTransition from './RouterTransition.vue';

module.exports = {
    install: function (Vue, options) {
        Vue.component('v-router-transition', VRouterTransition);
    }
};