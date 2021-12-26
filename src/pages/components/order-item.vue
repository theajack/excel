<template>
    <el-dialog :visible.sync="order.visible" class='order-item-dialog'>
        <el-form ref="form" :model="order.data" label-width="100px">
            <el-form-item
                size='mini'
                v-right-edit='item.key'
                v-for="item in HEADER_LIST"
                :key="item.key"
                :class='{"add-hidden-item": order.isAdd && AppointKeys.includes(item.key)}'
                :label="item.value">
                <pick-up-time
                    :disabled.sync='disableds[item.key]'
                    size='mini'
                    v-if="item.key==='appointmentDate'"
                    v-model="order.data[item.key]"/>
                <pick-address
                    :disabled.sync='disableds[item.key]'
                    size='mini'
                    v-else-if="item.key==='fullAddress'"
                    v-model="order.data[item.key]"/>
                <el-date-picker
                    :disabled.sync='disableds[item.key]'
                    v-else-if="DateKeys.includes(item.key)"
                    v-model="order.data[item.key]"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择日期">
                </el-date-picker>
                <el-select
                    :disabled.sync='disableds[item.key]'
                    v-else-if="EnumKeys.indexOf(item.key) !== -1"
                    v-model="order.data[item.key]"
                    :placeholder="'请选择'+item.value">
                    <el-option
                        v-for="item in StatusOptions[item.key]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input
                    :disabled.sync='disableds[item.key]'
                    :placeholder='"请输入"+item.value'
                    v-else-if="item.key==='amount'"
                    @change="inputAmount"
                    v-model="order.data[item.key]"></el-input>
                <el-input
                    :disabled.sync='disableds[item.key]'
                    :placeholder='"请输入"+item.value'
                    v-else-if="NumberKeys.indexOf(item.key) !== -1"
                    @change="inputChange(item.key)"
                    v-model.number="order.data[item.key]"></el-input>
                <el-input v-else
                    :disabled.sync='disableds[item.key]'
                    :placeholder='"请输入"+item.value'
                    @change="inputChange(item.key)"
                    v-model="order.data[item.key]"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size='mini' :icon='order.isAdd?"el-icon-plus":"el-icon-check"' type="primary" @click="onSubmit">
                    {{order.isAdd?'添加':'修改'}}订单
                </el-button>
                <el-button size='mini' icon='el-icon-close' @click="order.visible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {
    HEADER_LIST, NumberKeys,
    StatusOptions, EnumKeys, DATA_KEYS,
    AppointKeys, DateKeys,
} from '../../lib/common/biz-define';
import {orderItem} from '../../lib/store/store';
import {geneTimeRange} from '../../lib/common/biz-util';
import PickUpTime from './biz/pick-up-time';
import PickAddress from './biz/pick-address.vue';
import {recordSingleOrder} from '../../lib/store/biz/order';
import {toast} from '../../lib/utils';

export default {
    name: 'order-item',
    components: {PickUpTime, PickAddress},
    data () {
        return {
            disableds: (() => {
                const json = {};
                for (const k in DATA_KEYS) {
                    json[DATA_KEYS[k]] = true;
                }
                return json;
            })(),
            order: orderItem,
            timeRange: geneTimeRange(),
            HEADER_LIST,
            NumberKeys,
            StatusOptions,
            EnumKeys,
            AppointKeys,
            DateKeys,
        };
    },
    methods: {
        async onSubmit () {
            const success = await recordSingleOrder();
            if (success) {
                orderItem.visible = false;
                toast(`${orderItem.isAdd ? '录入' : '保存'}成功`);
            }
        },
        inputChange (key) {
            if (key === DATA_KEYS.COMPONENT_QUANTITY || key === DATA_KEYS.COMPONENT_POWER) {
                const quantity = this.order.data[DATA_KEYS.COMPONENT_QUANTITY];
                const power = this.order.data[DATA_KEYS.COMPONENT_POWER];
                if (quantity && power) {
                    try {
                        const powerNumber = parseInt(power.replace('p', '').replace('P', ''));
                        this.order.data[DATA_KEYS.MACHINE_CAPACITY] = powerNumber * quantity;
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
        },
        inputAmount () {
            const value = parseFloat(this.order.data.amount.toString().replace(/[^0-9.]/g, ''));
            this.order.data.amount = Number.isNaN(value) ? 0 : value;
        }
    }
};
</script>
<style lang="less">
</style>