
<template>
    <div>
        <el-date-picker
            :size='size'
            :disabled="disabled"
            v-model="date"
            type="date"
            @change="dateChange"
            placeholder="请选择日期">
        </el-date-picker>
        <el-select
            :size='size'
            :disabled="disabled"
            v-model="hourMs"
            style="margin-left: 10px"
            @change="emitValue"
            placeholder="请选择时间段">
            <el-option
                v-for="item in timeRange"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import {geneTimeRange} from '../../../lib/common/biz-util';
import {timeToJson, hourToMs} from '../../../lib/common/utils';

export default {
    name: 'pick-up-time',
    data () {
        return {
            date: '',
            hourMs: '',
            timeRange: geneTimeRange(),
        };
    },
    props: {
        value: {
            type: [Number, String],
            required: false,
            default: 0,
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
                this.date = new Date(this.value);
                this.hourMs = hourToMs(timeToJson(this.value).hour || 8); // 0时认为时第一个时间段
                this.updateTimeRange();
            } else {
                this.date = '';
                this.hourMs = '';
            }
        },
        dateChange () {
            this.emitValue();
            this.updateTimeRange();
        },
        emitValue () {
            if (this.date && this.hourMs) {
                this.$emit('input', this.date.getTime() + this.hourMs);
            }
        },
        updateTimeRange () {
            this.timeRange = geneTimeRange(this.date);
        }
    }
};
</script>
<style lang="less">
</style>