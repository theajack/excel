<template>
    <div class='list-mask'>
        <btn-box />
        <order-table />
    </div>
</template>

<script>
import BtnBox from './components/btn-box';
import OrderTable from './components/order-table';
export default {
    name: 'list',
    components: {
        BtnBox, OrderTable
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