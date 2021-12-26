<template>
    <el-dialog title="发货" @close='onClose' :visible.sync="dialogVisible.sendOrder" class='order-item-dialog'>
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
            <el-form-item size='mini' label="NC单号">
                <el-input
                    placeholder='请输入NC单号'
                    v-model="ncOrderId"></el-input>
            </el-form-item>
            <el-form-item size='mini' label="套餐名称">
                <el-input
                    placeholder='请输入套餐名称'
                    v-model="packageName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size='mini' icon='el-icon-check' type="primary" @click="onSubmit">确认发货</el-button>
                <el-button size='mini' icon='el-icon-close' @click="dialogVisible.sendOrder = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {dialogVisible, select} from '../../lib/store/store';
import {sendOrderService} from '../../lib/store/service/order';
import {toast} from '../../lib/utils';
import {TOAST_TYPE} from '../../lib/constant';
import {getSelectedOrderIds} from '../../lib/store/biz/table';

export default {
    name: 'send-order',
    data () {
        return {
            dialogVisible,
            select,
            ncOrderId: '',
            packageName: '',
        };
    },
    methods: {
        async onSubmit () {
            if (!this.ncOrderId || !this.packageName) {
                return toast('NC单号或套餐名称不可为空', TOAST_TYPE.WARNING);
            }
            const result = await sendOrderService({
                orderIds: getSelectedOrderIds(),
                ncOrderId: this.ncOrderId,
                packageName: this.packageName,
            });
            if (result) {
                toast('发货成功');
                dialogVisible.sendOrder = false;
            }
        },
        onClose () {
            this.ncOrderId = '';
            this.packageName = '';
        }
    }
};
</script>
<style lang="less">
</style>