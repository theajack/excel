<!--
 * @Author: tackchen
 * @Date: 2021-11-05 00:51:04
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 00:40:35
 * @FilePath: /admin/src/pages/components/order-table.vue
 * @Description: Coding something
-->
<template>
    <div>
        <el-table
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
                width="120"
                v-for='item in HEADER_LIST'
                sortable='custom'
                :key="item.key"
                :prop="item.key"
                :label="item.value">
                <template slot-scope="scope">
                    <span :attr-value='item.value' @click="clickTableCell" @mouseenter="hoverTableCell">
                        <span>{{convertSingleKeyForReading(scope.row, item.key)}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                width="120"
                label="操作">
                <template slot-scope="scope">
                    <el-button type='text' icon="el-icon-edit" @click="onEditItem(scope.row)">编辑</el-button>
                    <el-button type='text' icon="el-icon-view" @click="onViewItem(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <order-pagination />
    </div>
</template>

<script>
import OrderPagination from './order-pagination';
import {EnumKeys, HEADER_NAME} from '../../lib/common/biz-define';
import {setSelectItems, refreshOrderList} from '../../lib/store/biz/table';
import {tableData, orderData} from '../../lib/store/store';
import {editOrder} from '../../lib/store/biz/order';
import {initOrderList} from '../../lib/store/biz/table';
import {notify} from '../../lib/utils';
import {NOTIFY_TYPE} from '../../lib/constant';
import {convertSingleKeyForReading} from '../../lib/common/biz-util';
import {canUserReadInfo, getOrderColumeList} from '../../lib/order-item-rights';

let notifyInstance = null;
const countMaxHeight = () => (window.innerHeight - (70 + 41 + 54));
export default {
    name: 'order-table',
    components: {OrderPagination},
    data () {
        return {
            HEADER_LIST: getOrderColumeList(),
            table: tableData,
            EnumKeys,
            maxHeight: countMaxHeight(),
        };
    },
    mounted () {
        initOrderList();
        this.initTableMaxHeight();
        window.addEventListener('resize', () => {this.initTableMaxHeight();}, true);
    },
    methods: {
        initTableMaxHeight () {
            this.maxHeight = countMaxHeight();
        },
        convertSingleKeyForReading,
        handleSelectionChange (val) {
            setSelectItems(val);
        },
        onEditItem (order) {
            editOrder(order);
        },
        sortChange (e) {
            // ascending descending null
            const {property, order} = e.column;

            if (order === null) {
                orderData.attr = '';
            } else {
                orderData.attr = property;
                orderData.isDesc = order === 'descending';
            }
            refreshOrderList();
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
        onViewItem (order) {
            let str = '';
            if (notifyInstance) notifyInstance.close();
            for (const k in order) {
                if (HEADER_NAME[k] && canUserReadInfo(k)) {
                    str += `${HEADER_NAME[k]}: ${this.convertSingleKeyForReading(order, k)}<br>`;
                }
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
