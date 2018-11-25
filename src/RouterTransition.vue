<!--
Credits: https://markus.oberlehner.net/blog/vue-router-page-transitions/
enter this below the <router-link></router-link>

<transition-page transition="slide">
    <router-view></router-view>
</transition-page>
-->

<template>
    <transition
            :name="transitionName"
            :mode="transitionMode"
            :enter-active-class="transitionEnterActiveClass"
            @beforeLeave="beforeLeave"
            @enter="enter"
            @afterEnter="afterEnter"
    >
        <slot/>
    </transition>
</template>

<script>

    export default {
        props: {
            transition: {
                type: String,
                default: 'fade'
            },
            mode: {
                type: String,
                default: 'out-in'
            }
        },

        data() {
            return {
                prevHeight: 0,
                transitionName: this.transition,
                transitionMode: this.mode,
                transitionEnterActiveClass: '',
            };
        },
        created() {
            this.$router.beforeEach((to, from, next) => {
                let transitionName = this.transitionName;

                if (transitionName === 'slide' || transitionName === 'sliding') {
                    const toDepth = to.path.split('/').length;
                    const fromDepth = from.path.split('/').length;
                    transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
                }

                this.transitionEnterActiveClass = `${transitionName}-enter-active`;

                if (to.meta.transitionName === 'zoom') {
                    this.transitionMode = 'in-out';
                    this.transitionEnterActiveClass = 'zoom-enter-active';
                    document.body.style.overflow = 'hidden';
                }

                if (from.meta.transitionName === 'zoom') {
                    this.transitionMode = null;
                    this.transitionEnterActiveClass = null;
                    document.body.style.overflow = null;
                }

                this.transitionName = transitionName;

                next();
            });
        },
        methods: {
            beforeLeave(element) {
                this.prevHeight = getComputedStyle(element).height;
            },
            enter(element) {
                const { height } = getComputedStyle(element);

                element.style.height = this.prevHeight;

                setTimeout(() => {
                    element.style.height = height;
                });
            },
            afterEnter(element) {
                element.style.height = 'auto';
            },
        },
    };
</script>

<style lang="css">
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: height, opacity;
        transition-timing-function: ease;
        overflow: hidden;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-duration: 0.3s;
        transition-property: height, opacity, transform;
        transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
        overflow: hidden;
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(2em, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-2em, 0);
    }

    .zoom-enter-active,
    .zoom-leave-active {
        animation-duration: 0.5s;
        animation-fill-mode: both;
        animation-name: zoom;
    }

    .zoom-leave-active {
        animation-direction: reverse;
    }

    @keyframes zoom {
        from {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }

        100% {
            opacity: 1;
        }
    }

    .sliding-left-enter, .slide-simple-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }
    .sliding-left-leave-active, .slide-simple-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
</style>