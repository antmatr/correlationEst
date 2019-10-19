import Vue from 'vue';


export default Vue.component('ui-input-slider', {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 1,
        },
        min: {
            type: Number,
            default: 0,
        },
        hintMin: {
            type: String,
            default: null,
        },
        hintMax: {
            type: String,
            default: null,
        },
        precision: {
            type: Number,
            default: 0,
        },
        marks: {
            type: Object,
            default: () => ({
                show: false,
                amount: 9,
            }),
        },
    },
    computed: {
        scale() {
            return this.max - this.min;
        },
        handlerOffset() {
            const valueAsProgress = (this.value - this.min) / (this.scale);
            return `${valueAsProgress * 100}%`;
        },
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    methods: {
        updateModel(newValue) {
            this.$emit('change', newValue);
        },
        bindEvents() {
            const bar = this.$refs.bar;

            bar.addEventListener('click', this.setValue);
            bar.addEventListener('mousedown', this.activateWindowsMousemove);
            document.addEventListener('mouseup', this.deactivateWindowsMousemove);
            window.addEventListener('mouseup', this.deactivateMouseMove);
        },
        activateWindowsMousemove() {
            window.addEventListener('mousemove', this.windowMousemoveHandler);
        },
        deactivateWindowsMousemove() {
            window.removeEventListener('mousemove', this.windowMousemoveHandler);
        },
        windowMousemoveHandler(e) {
            const bar = this.$refs.bar;
            const left = bar.getBoundingClientRect().left;
            const width = bar.offsetWidth;
            const delta = Math.min(Math.max(e.pageX - left, 0), width);
            const progress = delta / width;
            
            this.setValueByProgress(progress);
        },
        setValue(e) {
            const width = e.target.offsetWidth;
            const progress = e.offsetX / width;

            this.setValueByProgress(progress);
        },
        setValueByProgress(progress) {
            const newValue = parseFloat((progress * this.scale + this.min).toFixed(this.precision));

            this.updateModel(newValue);
        },
    },
    mounted() {
        this.bindEvents();
    },
    template: `
        <div class="ui-input-slider">
            <div class="ui-input-slider__values">
                <div class="ui-input-slider__values-item"
                    v-text="min"
                />
                <div class="ui-input-slider__values-item"
                    v-text="value"
                />
                <div class="ui-input-slider__values-item"
                    v-text="max"
                />
            </div>
            <div class="ui-input-slider__bar"
                ref="bar"
                >
                <div class="ui-input-slider__bar-handler"
                    ref="handler"
                    v-bind:style="{
                        marginLeft: handlerOffset,
                    }"
                />
                <div class="ui-input-slider__bar-marks"
                    v-if="marks.show"
                    >
                    <div class="ui-input-slider__bar-marks-item"
                        v-for="i in marks.amount"
                        v-bind:key="i"
                        v-bind:style="{
                            left: (100 * i / (marks.amount + 1)) + '%',
                        }"
                    />
                </div>
            </div>
            <div class="ui-input-slider__hints"
                v-if="hintMin || hintMax"
                >
                <div class="ui-input-slider__hints-item"
                    v-if="hintMin"
                    v-text="hintMin"
                />
                <div class="ui-input-slider__hints-item"
                    v-if="hintMax"
                    v-text="hintMax"
                />
            </div>
        </div>
    `,
});