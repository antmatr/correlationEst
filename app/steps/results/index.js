import Vue from 'vue';
import moment from 'moment';


Vue.component('step-results', {
    data: () => ({
        title: 'Thank you!',
        texts: [
            'The test is completed',
            'Please ask an assistant to submit the results',
        ],
        isTextShown: false,
    }),
    computed: {
        id() {
            return this.$store.getters['user/id'];
        },
        results() {
            const results = this.$store.getters['results/items'];
            return {
                testSeriesId: this.id,
                testSeriesResults: results,
            };
        },
        mode() {
            return this.$store.getters['steps/mode'];
        },
        resultsAsJSON() {
            return JSON.stringify(this.results, null, 4);
        },
    },
    mounted() {
    },
    methods: {
        downloadFile(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], {type: contentType});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        },
        saveFile() {
            const timestamp = moment().format('YYYY-MM-DD-HH-mm-ss')
            this.downloadFile(this.resultsAsJSON, `results_${this.id}_${this.mode}_${timestamp}.json`, 'application/json');
        },
        showText() {
            this.isTextShown = true;
        },
    },
    template: `
        <section class="step">
            <div class="step__title"
                v-text="title"
            />
            <div class="step__block"
                v-for="(text, index) in texts"
                v-bind:key="index"
                v-text="text"
            />
            <div class="step__buttons">
                <div class="step__buttons-item">
                    <button class="ui-button"
                        type="button"
                        v-text="'Save results to a file'"
                        v-on:click="saveFile"
                    />
                </div>
            </div>
            <div class="step__block"
                v-text="'...or copy as a plain text:'"
            />
            <div class="step__buttons"
                v-if="!isTextShown"
                >
                <div class="step__buttons-item">
                    <button class="ui-button"
                        type="button"
                        v-text="'Show data as text'"
                        v-on:click="showText"
                    />
                </div>
            </div>
            <div class="step__block _ltr"
                v-if="isTextShown"
                >
                <textarea class="ui-input-textarea"
                    v-bind:value="resultsAsJSON"
                />
            </div>
        </section>
    `
});