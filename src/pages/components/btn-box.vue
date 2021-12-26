<!--
 * @Author: tackchen
 * @Date: 2021-11-05 00:51:04
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 01:05:12
 * @FilePath: /admin/src/pages/components/btn-box.vue
 * @Description: Coding something
-->
<template>
    <div class='header-buttons'>
        <el-button v-right.admin icon='el-icon-user' size='mini' @click="showRegist">
            注册新员工
        </el-button>
        <el-button
            plain
            :type='page.isApplyFilter?"warning":"default"'
            :icon='btnBox.queryVisible ? "el-icon-arrow-up" : "el-icon-search"'
            size='mini' @click="toggleQueryBox">
            {{btnBox.queryVisible?'收起':'查询'}}
            {{page.isApplyFilter?'[启用中]':''}}
        </el-button>
        <el-button v-right-no.record icon='el-icon-box' :disabled='!isSelected' size='mini' @click="deliverOrder">
            提货完成{{selectText}}
        </el-button>
        <el-button plain type='warning' v-right-no.record icon='el-icon-document-delete' :disabled='!isSelected' size='mini' @click="cancelOrder">
            取消预约{{selectText}}
        </el-button>
        <el-button v-right-no.store icon='el-icon-document-add' size='mini' @click="addOrder">
            录入订单
        </el-button>
        <el-button v-right.admin icon='el-icon-truck' size='mini' :disabled='!isSelected' @click="sendOrder">
            发货{{selectText}}
        </el-button>
        <el-button v-right.admin icon='el-icon-document-checked' :disabled='!isSelected' size='mini' @click="dispatchOrder">
            派单{{selectText}}
        </el-button>
        <el-button v-right.admin icon='el-icon-key' size='mini' style="margin-right: 10px" @click="showResetPwd">
            重置员工密码
        </el-button>
        <el-upload
            v-right.admin
            class="upload-box"
            :on-change="onFileChange"
            :multiple="false"
            action="#"
            :auto-upload='false'>
            <el-button icon='el-icon-upload2' size='mini' style="margin-right: 10px">
                {{filename?'重新导入':'导入Excel'}}
            </el-button>
        </el-upload>
        <el-button v-if="selectText" icon='el-icon-receiving' size='mini' @click="exportData">
            导出已选{{selectText}}
        </el-button>
        <el-button v-else-if="page.isApplyFilterResult" icon='el-icon-receiving' size='mini' @click="exportData">
            导出筛选结果
        </el-button>
        <el-dropdown v-else size='mini' @command="exportFromDropMenu">
            <el-button icon='el-icon-receiving' size='mini'>
                导出{{selectText}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="TAB_NAME.ALL">全部订单</el-dropdown-item>
                <el-dropdown-item :command="TAB_NAME.DELIVER">已完成订单</el-dropdown-item>
                <el-dropdown-item :command="TAB_NAME.OVERDUE">逾期订单</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button plain type='danger' icon='el-icon-switch-button' size='mini' @click="logout">
            退出登录
        </el-button>
    </div>
</template>

<script>
import {btnBox, select, dialogVisible, page} from '../../lib/store/store';
import {loading, confirm, toast} from '../../lib/utils';
import {readExcelFile, exportAsExcel} from '../../lib/excel';
import {HEADER_NAME} from '../../lib/common/biz-define';
import {showResetPwd, showRegist} from '../../lib/store/biz/common';
import {addOrder, uploadOrders} from '../../lib/store/biz/order';
import {exportData} from '../../lib/store/biz/filters';
import {TAB_NAME, TOAST_TYPE} from '../../lib/constant';
import {logout, getUserName} from '../../lib/store/biz/login';
import {cancelOrdersService} from '../../lib/store/service/order';
import {getSelectedOrderIds} from '../../lib/store/biz/table';

export default {
    name: 'btn-box',
    data () {
        return {
            TAB_NAME,
            filename: '',
            page,
            btnBox,
            select: select,
        };
    },
    computed: {
        isSelected () {
            return this.select.count > 0;
        },
        selectText () {
            return this.select.count > 0 ? `(${this.select.count})` : '';
        },
    },
    methods: {
        toggleQueryBox () {
            this.btnBox.queryVisible = !this.btnBox.queryVisible;
        },
        showResetPwd,
        showRegist,
        async onFileChange (file) {
            const result = await confirm({
                message: '是否确认导入Excel？(该操作会清空数据库，请保证操作之前已经备份过数据)'
            });
            if (result === 'confirm') {
                const {closeLoading} = loading('读取数据中...');
                const results = await readExcelFile(file.raw);
                await uploadOrders(results);
                closeLoading();
            }
        },
        exportAll () {
            exportAsExcel(this.list, HEADER_NAME);
        },
        addOrder,
        sendOrder () {
            dialogVisible.sendOrder = true;
        },
        dispatchOrder () {
            dialogVisible.dispatchOrder = true;
        },
        deliverOrder () {
            dialogVisible.deliverOrder = true;
        },
        exportData () {
            exportData();
        },
        exportFromDropMenu (command) {
            exportData(command);
        },
        async logout () {
            const result = await confirm({message: `是否确认退出登录(${getUserName()})`});
            if (result === 'confirm') {
                logout();
            }
        },
        async cancelOrder () {
            const orderIds = getSelectedOrderIds();
            const result = await confirm({message: `是否确认取消以下${select.count}条订单的预约(${orderIds})`});
            if (result === 'confirm') {
                const result = await cancelOrdersService(orderIds);
                toast(
                    `取消预约${result ? '成功' : '失败'}`,
                    result ? TOAST_TYPE.SUCCESS : TOAST_TYPE.ERROR
                );
            }
        }
    }
};
</script>

<style lang="less">
.header-buttons{
    display: flex;
    justify-content: flex-end;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 20px;
    position: fixed;
    width: 100%;
    right: 0;
    z-index: 10;
    top: 0;
    padding-bottom: 10px;
    .el-button--mini{
        padding: 7px 9px;
    }
    .el-upload-list__item{
        display: none;
    }
    .el-button{
        margin-left: 10px;
        margin-right: 0!important;
    }
}
</style>