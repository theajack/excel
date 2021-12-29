<template>
    <div class='list-mask'>
        <btn-box />
        <order-table />
        <attr-set />
    </div>
</template>

<script>
import BtnBox from './components/btn-box';
import OrderTable from './components/order-table';
import AttrSet from './components/attr-set';
export default {
    name: 'list',
    components: {
        BtnBox, OrderTable, AttrSet
    },
    mounted () {
        document.title = 'excel操作';
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
        padding-top: 59px;
        padding-bottom: 60px;
    }
</style>