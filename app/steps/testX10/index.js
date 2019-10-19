import Vue from 'vue';
import { Random } from 'random-js';


Vue.component('step-test-x10', {
    props: {
        title: {
            type: String,
            default: 'Test X10',
        },
        description: {
            type: String,
            default: 'Description',
        },
        textReview: {
            type: String,
            default: 'Rate the productivity of your decisions:',
        },
        buttonIdlenessText: {
            type: String,
            default: 'Act as usual',
        },
        buttonActionText: {
            type: String,
            default: 'Perform new action',
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
        randomEngine: new Random(),
        basicProbabilities: {
            variant1: {
                // user/id <= 25
                action: 0.99,
                idleness: 0.01,
            },
            variant2: {
                // user/id > 25
                action: 0.01,
                idleness: 0.99,
            },
        },
        probabilityModifiers: {
            action: 0,
            idleness: 0,
        },
        tries: {
            current: 0,
            isCurrentAnswered: false,
            total: 10,
        },
        results: [
        ],
        review: 0,
        reviewed: false,
    }),
    computed: {
        id() {
            return this.$store.getters['user/id'];
        },
        probabilities() {
            const probabilitiesVariant = this.id <= 25 ? this.basicProbabilities.variant1 : this.basicProbabilities.variant2;
            return {
                action: probabilitiesVariant.action + this.probabilityModifiers.action,
                idleness:  probabilitiesVariant.idleness + this.probabilityModifiers.idleness,
            }
        },
        inProgress() {
            return this.tries.current > 0 && this.tries.current <= this.tries.total;
        },
        completed() {
            return this.tries.current > this.tries.total;
        },
        lastValue() {
            return this.results[this.results.length - 1].value;
        },
    },
    mounted() {
    },
    methods: {
        start() {
            this.tries.current = 1;
        },
        handleInput(type) {
            this.results.push(this.getResult(type));
            // let positive = 0;
            // let negative = 0;
            // for (let i = 0; i < 10000; i++) {
            //     const chanceResult = this.randomEngine.bool(0.3);
            //     if (chanceResult) {
            //         positive++;
            //     } else {
            //         negative++;
            //     }
            // }
            // console.log(`Positive: ${positive}, negative: ${negative}`);
            // let deviationCounter = 0;
            // for (let i = 0; i < 1000000; i++) {
            //     const { deviation } = this.getResult(type);
            //     if (deviation) {
            //         deviationCounter++;
            //     }
            // }
            // console.log(`Deviations amount: ${deviationCounter} per 10000 tests`);
            this.tries.isCurrentAnswered = true;
        },
        getResult(type) {
            const result = {};
            const successProbability = this.probabilities[type];

            result.type = type;
            result.value =  this.randomEngine.bool(successProbability);
            // result.deviation = successProbability < 0.5 && result.value || successProbability > 0.5 && !result.value;

            // put some probability adjustment magic here! ✧･ﾟ: *✧･ﾟ:*
            // it will affect next result calculations for this type only (action/idleness)
            // if (result.value) {
            //     this.probabilities[type] -= 0.1;
            // } else {
            //     this.probabilities[type] += 0.1;
            // }

            
            return result;
        },
        setReviewed() {
            this.reviewed = true;
        },
        goToNextTry() {
            this.tries.current++;
            this.tries.isCurrentAnswered = false;
        },
        goToNextTest() {
            const testResult = {
                test: this.title,
                probabilities: this.probabilities,
                answers: this.results,
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
            <div class="step__block"
                v-if="inProgress"
                >
                <template v-if="tries.isCurrentAnswered">
                    Step {{ tries.current }} result: {{ lastValue ? 'Success' : 'Fail' }}
                </template>
                <template v-else>
                    Step: {{ tries.current }} / {{ tries.total }}
                </template>
            </div>

            <template v-if="!inProgress && !completed">
                <div class="step__buttons">
                    <div class="step__buttons-item">
                        <button class="ui-button"
                            type="button"
                            v-text="'Start'"
                            v-on:click="start"
                        />
                    </div>
                </div>
            </template>

            <template v-if="inProgress && !completed">
                <template v-if="tries.isCurrentAnswered">
                    <div class="step__buttons">
                        <div class="step__buttons-item">
                            <button class="ui-button"
                                type="button"
                                v-text="tries.current === tries.total ? 'Review the series' : 'Next try'"
                                v-on:click="goToNextTry"
                            />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="step__buttons">
                        <div class="step__buttons-item">
                            <button class="ui-button"
                                type="button"
                                v-text="buttonActionText"
                                v-on:click="handleInput('action')"
                            />
                        </div>
                        <div class="step__buttons-item">
                            <button class="ui-button"
                                type="button"
                                v-text="buttonIdlenessText"
                                v-on:click="handleInput('idleness')"
                            />
                        </div>
                    </div>
                </template>
            </template>

            <template v-if="completed">
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
            </template>

        </section>
    `
});