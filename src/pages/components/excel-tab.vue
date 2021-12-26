<!--
 * @Author: tackchen
 * @Date: 2021-11-05 00:51:04
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-08 21:48:25
 * @FilePath: /admin/src/pages/components/excel-tab.vue
 * @Description: Coding something
-->
<template>
    <el-tabs v-model="tabData.active" type="card" @tab-click="handleClick">
        <el-tab-pane :name="TAB_NAME.ALL">
            <span v-right-no.store slot="label"><i class="el-icon-tickets"></i> 全部订单</span>
        </el-tab-pane>
        <el-tab-pane :name="TAB_NAME.NOT_DELIVERED">
            <span v-right-only.store slot="label"><i class="el-icon-box"></i> 今日及之前预约未提货</span>
        </el-tab-pane>
        <el-tab-pane :name="TAB_NAME.DISPATCH">
            <span v-right-only.store slot="label"><i class="el-icon-document-checked"></i> 已派单</span>
        </el-tab-pane>
        <el-tab-pane :name="TAB_NAME.DELIVER">
            <span slot="label"><i class="el-icon-truck"></i> 已提货订单</span>
        </el-tab-pane>
        <el-tab-pane :name="TAB_NAME.OVERDUE">
            <span slot="label">
                <i class="el-icon-timer tab-red"></i> <span class='tab-red'>逾期订单({{tabData.overdueCount}})</span>
            </span>
        </el-tab-pane>
        <!-- 查询表单 -->
        <query-box :visible.sync='btnBox.queryVisible'/>
        <!-- 功能键 -->
    </el-tabs>
</template>

<script>
import QueryBox from './query';
import {btnBox, tabData} from '../../lib/store/store';
import {TAB_NAME} from '../../lib/constant';
import {changeTableTab} from '../../lib/store/biz/table';

export default {
    name: 'excel-tab',
    components: {QueryBox},
    data () {
        return {
            tabData,
            TAB_NAME,
            btnBox
        };
    },
    mounted () {
    },
    methods: {
        handleClick () {
            changeTableTab();
        },
    }
};
</script>
<style lang="less">
.tab-red{
    color: #f44;
}
.el-tabs__item.is-active{
    .tab-red{
        color: #409EFF;
    }
}
#tab-not_deliver{
    border-left: none;
}
</style>
