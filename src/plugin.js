import VueRouterTransition from './RouterTransition.vue';

module.exports = {
    install: function (Vue, options) {
        Vue.component('vue-router-transition', VueRouterTransition);
    }
};