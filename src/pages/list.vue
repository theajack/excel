<template>
    <div class='list-mask'>
        <btn-box />
        <excel-tab />
        <order-table />
        <order-item />
        <reset-pwd />
        <regist />
        <send-order />
        <dispatch-order />
        <deliver-order />
    </div>
</template>

<script>
import BtnBox from './components/btn-box';
import ExcelTab from './components/excel-tab';
import OrderItem from './components/order-item';
import ResetPwd from './components/reset-pwd';
import Regist from './components/regist';
import OrderTable from './components/order-table';
import SendOrder from './components/send-order';
import DispatchOrder from './components/dispatch-order';
import DeliverOrder from './components/deliver-order';
import {initEmpolyOptions} from '../lib/store/biz/common';
export default {
    name: 'list',
    components: {
        BtnBox, ExcelTab, OrderItem, ResetPwd, OrderTable, Regist,
        SendOrder, DispatchOrder, DeliverOrder,
    },
    mounted () {
        document.title = '订单列表页';
        initEmpolyOptions();
    },
    data () {
        return {
        };
    },
    methods: {
    }
};
</script>
<style scoped>
    .list-mask{
        padding: 20px;
        padding-top: 70px;
        padding-bottom: 60px;
    }
</style>