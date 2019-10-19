import Vue from 'vue';
import Vuelidate from 'vuelidate';
import store from './store';
import './steps';
import './ui';


Vue.use(Vuelidate);

const appElement = document.querySelector('[data-app]');
const app = new Vue({
    el: appElement,
    store,
    data: {
        title: 'Test Application',
    },
    computed: {
        currentComponent() {
            return this.$store.getters['steps/current'];
        },
    },
    methods: {
        setDocumentTitle() {
            document.title = this.title;
        },
    },
    mounted() {
        this.setDocumentTitle();
        console.log(this.currentComponent);
    },
    template: `
        <main class="layout">
            <component
                v-bind:is="currentComponent.component"
                v-bind:key="currentComponent.props.title"
                v-bind="currentComponent.props"
            />
        </main>
    `,
});