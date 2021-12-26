<!--
 * @Author: tackchen
 * @Date: 2021-11-05 00:51:04
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-26 21:16:50
 * @FilePath: /excel/src/pages/components/btn-box.vue
 * @Description: Coding something
-->
<template>
    <div class='header-buttons'>
        <!-- <el-button
            plain
            :type='page.isApplyFilter?"warning":"default"'
            :icon='btnBox.queryVisible ? "el-icon-arrow-up" : "el-icon-search"'
            size='mini' @click="toggleQueryBox">
            {{btnBox.queryVisible?'收起':'查询'}}
            {{page.isApplyFilter?'[启用中]':''}}
        </el-button> -->
        <el-button icon='el-icon-upload2' size='mini' @click="triggerImportExcel">
            导入excel
            <input id='uploadBtn' type="file" multiple ref='uploadFile' @change="onInputFileChange">
        </el-button>
        <!-- <el-button v-if="selectText" icon='el-icon-receiving' size='mini' @click="exportData">
            导出已选{{selectText}}
        </el-button>
        <el-button v-else-if="page.isApplyFilterResult" icon='el-icon-receiving' size='mini' @click="exportData">
            导出筛选结果
        </el-button>
        <el-button v-else icon='el-icon-receiving' size='mini' @click="exportData">
            导出全部
        </el-button> -->
    </div>
</template>

<script>
import {select, page} from '../../lib/store/store';
import {loading, confirm} from '../../lib/utils';
import {readExcelFile} from '../../lib/excel'; // exportAsExcel
import {importExcels} from '../../lib/biz/import';
import {initOriginData} from '../../lib/biz/excel';
// import {HEADER_NAME} from '../../lib/common/biz-define';
// import {uploadOrders} from '../../lib/store/biz/order';
// import {exportData} from '../../lib/store/biz/filters';

export default {
    name: 'btn-box',
    data () {
        return {
            filename: '',
            page,
            // btnBox,
            select: select,
            // fileList: [],
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
        // toggleQueryBox () {
        //     this.btnBox.queryVisible = !this.btnBox.queryVisible;
        // },
        triggerImportExcel () {
            this.$refs.uploadFile.click();
        },
        async onInputFileChange () {
            const result = await confirm({
                message: '是否确认导入Excel？(该操作会清空当前数据，请保证操作之前已经备份过数据)'
            });
            if (result === 'confirm') {
                const {closeLoading} = loading('读取数据中...');
                const files = this.$refs.uploadFile.files;
                const result = await importExcels({files});
                initOriginData(result);
                closeLoading();
            }
        },
        async onFileChange (file, fileList) {
            console.log(file, fileList.length);
            const result = await confirm({
                message: '是否确认导入Excel？(该操作会清空当前数据，请保证操作之前已经备份过数据)'
            });
            if (result === 'confirm') {
                const {closeLoading} = loading('读取数据中...');
                const results = await readExcelFile(file.raw);
                console.log(results);
                closeLoading();
            }
        },
        // exportAll () {
        //     exportAsExcel(this.list, HEADER_NAME);
        // },
        // exportData () {
        //     exportData();
        // },
        // exportFromDropMenu (command) {
        //     exportData(command);
        // },
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
#uploadBtn{
    opacity: 0;
    position: fixed;
    left: -1000px;
}
</style>