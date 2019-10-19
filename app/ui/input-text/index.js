import Vue from 'vue';


export default Vue.component('ui-input-text', {
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
    },
    model: {
        prop: 'value',
        event: 'input',
    },
    methods: {
      updateSelf(value) {
        this.$emit('input', value);
      }
    },
    template: `
        <input class="ui-input-text"
            v-bind:type="type"
            v-bind:value="value"
            v-on:input="updateSelf($event.target.value)"
        />
    `,
});