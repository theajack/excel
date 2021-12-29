<template>
    <el-collapse-transition>
        <div class="header-block" v-show="visible">
            <span
                v-for="key in tableData.header"
                :key="key"
                :class="{'query-enable': !!query[key]}">
                <query-wrapper :attr='key' v-if="DateKeys.includes(key)">
                    <el-date-picker size='mini'
                        v-model="query[key]"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </query-wrapper>
                <query-wrapper :attr='key' v-else-if="NumberKeys.includes(key)" >
                    <number-range size='mini'
                        v-model="query[key]"/>
                </query-wrapper>
                <el-input v-else placeholder="请输入内容"
                    size='mini' v-model="query[key]">
                    <template slot="prepend">{{key}}</template>
                </el-input>
            </span>
            <el-button size='mini' icon='el-icon-search' @click="startFilter">开始查询</el-button>
            <el-button size='mini' type='danger' icon='el-icon-delete' @click="clearQueryFileds">清空所有筛选器</el-button>
            <i class='el-icon-close close-query' @click="$emit('update:visible', false)"></i>
        </div>
    </el-collapse-transition>
</template>

<script>
import {page, query, tableData} from '../../lib/store/store';
import {
    isApplyedFilters, clearFilters, startQueryWithFilters,
    DateKeys, NumberKeys
} from '../../lib/biz/filters';
import queryWrapper from './query-wrapper.vue';
import numberRange from './number-range.vue';
import {loading} from '../../lib/utils';
export default {
    name: 'order-item',
    props: ['visible'],
    components: {queryWrapper, numberRange},
    data () {
        return {
            DateKeys, NumberKeys,
            query,
            tableData,
        };
    },
    watch: {
        query: {
            handler () {
                page.isApplyFilter = isApplyedFilters();
            },
            deep: true,
        }
    },
    methods: {
        startFilter () {
            const {closeLoading} = loading('查询中...');
            startQueryWithFilters();
            closeLoading();
        },
        clearQueryFileds () {
            clearFilters();
        },
    }
};
</script>
<style lang="less">
.header-block{
    border: 1px solid #eee;
    border-top: 0;
    padding: 10px;
    padding-bottom: 0;
    position: relative;
    padding-right: 30px;
    .el-input-group{
        width: 160px;
        margin-right: 10px;
        .el-input-group__prepend{
            padding: 0 5px!important;
            background-color: #fff;
        }
        .el-input__inner{
            padding: 0 5px;
            background-color: #f8f8f8;
            border-left: none;
        }
    }
    .el-input-group, .el-button{
        margin-right: 10px;
        margin-bottom: 10px;
        margin-left: 0!important;
    }
    .close-query{
        position: absolute;
        color: #888;
        right: 10px;
        top: 16px;
        cursor: pointer;
        &:hover{
            color: #f44;
        }
    }
}
.query-enable{
    .query-wrapper-title, .el-input-group__prepend{
        color: #f44;
        font-weight: bold;
    }
}
</style>