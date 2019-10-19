import Vue from 'vue';


Vue.component('step-test-table', {
    props: {
        title: {
            type: String,
            default: 'Test table',
        },
        description: {
            type: String,
            default: 'Description',
        },
        textReview: {
            type: String,
            default: 'Rate the productivity of performed decisions:',
        },
        basicProbabilities: {
            type: Object,
            default: () => ({
                action: 0.5,
                idleness: 0.5,
            }),
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        nextStep: {
            type: String,
            default: 'welcome',
        },
        isFinal: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        results: [
        ],
        review: 0,
        reviewed: false,
        started: false,
    }),
    computed: {
    },
    mounted() {
    },
    methods: {
        start() {
            this.started = true;
        },
        setReviewed() {
            this.reviewed = true;
        },
        goToNextTest() {
            const testResult = {
                test: this.title,
                probabilities: this.basicProbabilities,
                tableData: this.data,
                review: this.review,
            };
            this.$store.commit('results/pushItem', testResult);
            this.$store.commit('steps/setStep', this.nextStep);
        },
    },
    template: `
        <section class="step">
            <div class="step__title"
                v-text="title"
            />
            <div class="step__block"
                v-text="description"
            />
            <div class="step__block">
                <ui-table
                    v-bind="data"
                />
            </div>

            <template v-if="reviewed">
                <div class="step__block"
                    v-text="'Review applied'"
                />
                <div class="step__buttons">
                    <div class="step__buttons-item">
                        <button class="ui-button"
                            type="button"
                            v-text="isFinal ? 'Finish' : 'Go to next test'"
                            v-on:click="goToNextTest"
                        />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="step__block"
                    v-text="textReview"
                />
                <div class="step__review _ltr">
                    <ui-input-slider
                        v-model="review"
                        v-bind:max="1"
                        v-bind:min="-1"
                        v-bind:hint-max="'Very resultative'"
                        v-bind:hint-min="'Counterproductive'"
                        v-bind:precision="1"
                        v-bind:marks="{
                            show: true,
                            amount: 19,
                        }"
                    />
                </div>
                <div class="step__buttons">
                    <div class="step__buttons-item">
                        <button class="ui-button"
                            type="button"
                            v-text="'Next'"
                            v-on:click="setReviewed"
                        />
                    </div>
                </div>
            </template>

        </section>
    `
});