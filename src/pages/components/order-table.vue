<!--
 * @Author: tackchen
 * @Date: 2021-11-05 00:51:04
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-27 07:55:06
 * @FilePath: /excel/src/pages/components/order-table.vue
 * @Description: Coding something
-->
<template>
    <div>
        <el-empty v-if='table.list.length === 0' description="暂无数据，请先导入数据"></el-empty>
        <el-table
            v-else
            class='order-table'
            :data="table.list"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @sort-change="sortChange"
            :height='maxHeight'
            >
            <el-table-column
                fixed="left"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                v-for='item in table.header'
                sortable='custom'
                :key="item"
                :prop="item"
                :label="item">
                <template slot-scope="scope">
                    <span :attr-value='item' @click="clickTableCell" @mouseenter="hoverTableCell">
                        <span>{{scope.row[item]}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                width="120"
                label="操作">
                <template slot-scope="scope">
                    <el-button type='text' icon="el-icon-view" @click="onViewItem(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <order-pagination />
    </div>
</template>

<script>
import OrderPagination from './order-pagination';
// import {refreshTableList, initOriginData} from '../../lib/biz/excel';
import {setSelectItems} from '../../lib/biz/table';
import {tableData} from '../../lib/store/store';
import {notify} from '../../lib/utils';
import {NOTIFY_TYPE} from '../../lib/constant';
import {setSortInfo, sortExcelData} from '../../lib/biz/excel';

let notifyInstance = null;
const countMaxHeight = () => (window.innerHeight - (70 + 43));
export default {
    name: 'order-table',
    components: {OrderPagination},
    data () {
        return {
            HEADER_LIST: [],
            table: tableData,
            maxHeight: countMaxHeight(),
        };
    },
    mounted () {
        this.initTableMaxHeight();
        window.addEventListener('resize', () => {this.initTableMaxHeight();}, true);
    },
    methods: {
        initTableMaxHeight () {
            this.maxHeight = countMaxHeight();
        },
        handleSelectionChange (val) {
            setSelectItems(val);
        },
        sortChange (e) {
            // ascending descending null
            const {property, order} = e.column;
            setSortInfo(property, order);
            sortExcelData();
            // if (order === null) {
            //     orderData.attr = '';
            // } else {
            //     orderData.attr = property;
            //     orderData.isDesc = order === 'descending';
            // }
            // refreshOrderList();
        },
        clickTableCell (e) {
            const el = e.srcElement;
            if (notifyInstance) notifyInstance.close();
            let attr = el.getAttribute('attr-value');
            if (!attr) {
                attr = el.parentElement.getAttribute('attr-value');
            }
            notifyInstance = notify(attr, el.innerText, NOTIFY_TYPE.INFO);
            console.log(e);
        },
        hoverTableCell (e) {
            const el = e.srcElement;
            if (!el.title) {
                el.title = el.innerText;
            }
        },
        onViewItem (item) {
            let str = '';
            if (notifyInstance) notifyInstance.close();
            for (const k in item) {
                str += `${k}: ${item[k]}<br>`;
            }
            notifyInstance = notify('订单详情', str, NOTIFY_TYPE.INFO, 0, true);
        }
    }
};
</script>
<style lang="less">
.order-table{
    .cell{
        white-space: nowrap!important;
        cursor: pointer;
        &:hover{
            color: #000;
        }
    }
}
</style>
