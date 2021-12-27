
<template>
    <span class='number-range'>
        <el-input
            :size='size'
            :disabled="disabled"
            v-model='min'
            @input="emitValue"
            placeholder="请输入最小值"
            >
        </el-input>
        <span class='number-range-split'>-</span>
        <el-input
            :size='size'
            :disabled="disabled"
            v-model='max'
            @input="emitValue"
            placeholder="请输入最大值"
            >
        </el-input>
    </span>
</template>

<script>

export default {
    name: 'number-range',
    data () {
        return {
            min: '',
            max: '',
        };
    },
    props: {
        value: {
            type: [Array, String],
            required: false,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        size: {
            type: String,
            required: false,
            default: 'normal',
        }
    },
    watch: {
        value () {
            this.applyValue();
        }
    },
    mounted () {
        this.applyValue();
    },
    methods: {
        applyValue () {
            if (this.value) {
                const arr = this.value instanceof Array ? this.value : [];
                if (typeof arr[0] === 'number') this.min = arr[0];
                if (typeof arr[1] === 'number') this.max = arr[1];
            } else {
                this.min = this.max = '';
            }
        },
        emitValue () {
            this.$emit(
                'input',
                (this.min === '' && this.max === '') ? '' : [this.min, this.max]
            );
        },
    }
};
</script>
<style lang="less">
.number-range{
    .el-input--mini{
        display: inline-block;
        width: 110px;
    }
    .number-range-split{
        font-size: 12px;
        color: #888;
        margin: 0 2px;
    }
}
</style>