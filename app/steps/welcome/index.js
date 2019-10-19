import Vue from 'vue';
import { required, numeric, minValue, maxValue } from 'vuelidate/lib/validators'


Vue.component('step-welcome', {
    data: () => ({
        id: {
            value: null,
            errorCommon: 'Please provide numeric ID',
            errorRange: 'ID should be a numeric value in range 1 - 50',
        },
    }),
    validations: {
        id: {
            value: {
                required,
                numeric,
                minValue: minValue(1),
                maxValue: maxValue(50),
            },
        },
    },
    props: {
        texts: {
            type: Array,
            default: () => [],
        },
        nextStep: {
            type: String,
            default: 'welcome',
        },
    },
    mounted() {
    },
    methods: {
        touch() {
            this.$v.$touch();
        },
        submit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            this.$store.commit('user/setId', parseInt(this.id.value, 10));
            this.$store.commit('steps/setStep', this.nextStep);

            this.goToNext();
        },
        goToNext() {
            this.$store.commit('steps/setStep', this.nextStep);
        },
    },
    template: `
        <section class="step">
            <div class="step__block"
                v-for="(text, index) in texts"
                v-bind:key="index"
                v-text="text"
            />
            <div class="step__block">
                Please enter ID (1 - 50):
            </div>
            <div class="step__block"
                v-on:keydown.enter.prevent="submit"
                >
                <div class="step__input">
                    <ui-input-text
                        v-model="id.value"
                        v-on:input="touch"
                    />
                </div>
                <div class="step__error"
                    v-if="$v.id.value.$error && !$v.id.value.required"
                    v-text="id.errorCommon"
                />
                <div class="step__error"
                    v-if="$v.id.value.$error && !$v.id.value.maxValue || !$v.id.value.minValue"
                    v-text="id.errorRange"
                />
            </div>
            <div class="step__buttons">
                <div class="step__buttons-item">
                    <button class="ui-button"
                        v-bind:class="{
                            _disabled: $v.id.value.$invalid
                        }"
                        type="button"
                        v-text="'Next'"
                        v-on:click="submit"
                    />
                </div>
            </div>
        </section>
    `
});