<template>
    <el-dialog title="派单" @close='onClose' :visible.sync="dialogVisible.dispatchOrder" class='order-item-dialog'>
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
            <el-form-item size='mini' label="施工队">
                <el-select
                    v-model="constructorName"
                    placeholder="请选择施工队">
                    <el-option
                        v-for="item in options.constructorName"
                        :key="item.value"
                        :label="item.label"
                        :value="item.userName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size='mini' label="派单日期">
                <el-date-picker
                    v-model="dispatchDate"
                    type="date"
                    value-format="timestamp"
                    placeholder="请选择派单日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size='mini' icon='el-icon-check' type="primary" @click="onSubmit">确认派单</el-button>
                <el-button size='mini' icon='el-icon-close' @click="dialogVisible.dispatchOrder = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {dialogVisible, select} from '../../lib/store/store';
import {StatusOptions} from '../../lib/common/biz-define';
import {toast} from '../../lib/utils';
import {TOAST_TYPE} from '../../lib/constant';
import {dispatchOrderService} from '../../lib/store/service/order';
import {getSelectedOrderIds} from '../../lib/store/biz/table';

export default {
    name: 'send-order',
    data () {
        return {
            dialogVisible,
            select,
            options: StatusOptions,
            constructorName: '',
            dispatchDate: '',
        };
    },
    methods: {
        async onSubmit () {
            if (!this.constructorName || !this.dispatchDate) {
                return toast('施工队或派单日期不可为空', TOAST_TYPE.WARNING);
            }
            const result = await dispatchOrderService({
                orderIds: getSelectedOrderIds(),
                constructorName: this.constructorName,
                dispatchDate: this.dispatchDate,
            });
            if (result) {
                toast('派单成功');
                dialogVisible.dispatchOrder = false;
            }
        },
        onClose () {
            this.constructorName = '';
            this.dispatchDate = '';
        }
    }
};
</script>