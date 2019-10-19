import Vue from 'vue';


export default Vue.component('ui-table', {
    props: {
        action: {
            type: Object,
        },
        idleness: {
            type: Object,
        },
    },
    data: () => ({}),
    computed: {
    },
    created() {
    },
    mounted() {
    },
    template: `
        <div class="ui-table _ltr">
            <div class="ui-table__row">
                <div class="ui-table__cell">
                </div>
                <div class="ui-table__cell">
                    Idleness
                </div>
                <div class="ui-table__cell">
                    Action
                </div>
            </div>
            <div class="ui-table__row">
                <div class="ui-table__cell">
                    Success
                </div>
                <div class="ui-table__cell">
                    {{ idleness.success }}
                </div>
                <div class="ui-table__cell">
                    {{ action.success }}
                </div>
            </div>
            <div class="ui-table__row">
                <div class="ui-table__cell">
                    Failure
                </div>
                <div class="ui-table__cell">
                    {{ idleness.fail }}
                </div>
                <div class="ui-table__cell">
                    {{ action.fail }}
                </div>
            </div>
        </div>
    `,
});