<template>
    <el-dialog title="提货" @close='onClose' :visible.sync="dialogVisible.deliverOrder" class='order-item-dialog'>
        <el-form ref="form" label-width="100px">
            <el-form-item size='mini' :label="'电站编号('+select.count+')'">
                <div class="order-ids">
                    <div class="order-id-item"
                        v-for="item in select.items"
                        :key='item.originSerial'>
                        {{item.stationId}}
                    </div>
                </div>
            </el-form-item>
            <el-form-item size='mini' label="提货日期">
                <el-date-picker
                    v-model="pickUpDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择提货日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size='mini' icon='el-icon-check' type="primary" @click="onSubmit">确认提货</el-button>
                <el-button size='mini' icon='el-icon-close' @click="dialogVisible.deliverOrder = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {dialogVisible, select} from '../../lib/store/store';
import {toast} from '../../lib/utils';
import {TOAST_TYPE} from '../../lib/constant';
import {deliverOrderService} from '../../lib/store/service/order';
import {initOverDueCount, getSelectedOrderIds} from '../../lib/store/biz/table';

export default {
    name: 'send-order',
    data () {
        return {
            dialogVisible,
            select,
            pickUpDate: '',
        };
    },
    methods: {
        async onSubmit () {
            
            if (!this.pickUpDate) {
                return toast('提货日期不可为空', TOAST_TYPE.WARNING);
            }
            const result = await deliverOrderService({
                orderIds: getSelectedOrderIds(),
                pickUpDate: this.pickUpDate
            });
            if (result) {
                toast('提货成功');
                dialogVisible.deliverOrder = false;
                initOverDueCount();
            }
        },
        onClose () {
            this.pickUpDate = '';
        }
    }
};
</script>