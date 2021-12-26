<!--
 * @Author: tackchen
 * @Date: 2021-11-05 00:51:04
 * @LastEditors: tackchen
 * @LastEditTime: 2021-11-20 09:41:24
 * @FilePath: /admin/src/pages/components/order-pagination.vue
 * @Description: Coding something
-->
<template>
    <el-pagination
        class='pagination'
        v-show="page.total > 0"
        :page-size='page.size'
        :current-page="page.index"
        @current-change='onPageChange'
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="page.sizes"
        @size-change="onSizeChange"
        :total="page.total">
    </el-pagination>
</template>

<script>
import {page} from '../../lib/store/store';
import {changeTablePage, changeTableSize} from '../../lib/store/biz/table';
export default {
    name: 'order-pagination',
    data () {
        return {
            page
        };
    },
    methods: {
        onSizeChange (size) {
            changeTableSize(size);
        },
        onPageChange (index) {
            changeTablePage(index);
        },
    }
};
</script>

<style lang="less">
    .el-pagination{
        text-align: center;
        margin-top: 5px;
        position: fixed;
        z-index: 10;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #eee;
        padding: 10px!important;
    }
</style>