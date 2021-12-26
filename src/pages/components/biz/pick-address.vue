
<template>
    <div :style="{display: isMini?'inline-block':'flex'}">
        <span :style="{'font-weight': isMini?'normal':'bold', 'font-size':isMini?'12px':'16px'}">
            {{head}}
        </span>
        <el-cascader
            :size='size'
            :disabled="disabled"
            style="margin-left: 10px"
            v-model="area"
            :options="areaOptions"
            :props="{ expandTrigger: 'hover', checkStrictly: !strict }"
            @change="emitValue"
            placeholder="请选择区域"
            filterable
            ></el-cascader>
        <el-input
            :size='size'
            :disabled="disabled"
            :style="{'margin-left': '10px', flex: 1, width: isMini?'200px':'auto'}"
            placeholder="请填写剩余详细地址"
            @input="emitValue"
            v-model="detail"></el-input>
    </div>
</template>

<script>
import {AreaData} from '../../../lib/area-data';
export default {
    name: 'pick-address',
    data () {
        return {
            head: '河北省 邯郸市',
            areaOptions: AreaData,
            area: '',
            detail: '', // 详细地址
            editValue: '',
        };
    },
    computed: {
        isMini () {return this.size === 'mini';}
    },
    props: {
        strict: {
            type: Boolean,
            required: false,
            default: true,
        },
        value: {
            type: String,
            required: false,
            default: '',
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
                const array = this.value.split(' ');
                if (array.length === 5) {
                    this.head = array.slice(0, 2).join(' ');
                    this.area = array.slice(2, 4);
                    this.detail = array[4] || '';
                } else {
                    if (this.strict) {
                        this.detail = this.value;
                    }
                }
            } else {
                this.area = ['', ''],
                this.detail = '';
            }
        },
        emitValue () {
            const needEmit = this.strict ? (this.area && this.detail) : (this.area || this.detail);
            if (needEmit) {
                this.$emit('input', `${this.head} ${this.area.join(' ')} ${this.detail}`);
            }
        },
    }
};
</script>
<style lang="less">
</style>