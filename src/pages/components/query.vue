<template>
    <el-collapse-transition>
        <div class="header-block" v-show="visible">
            <span
                v-for="item in HEADER_LIST"
                :key="item.key"
                :class="{'query-enable': query[item.key] !== ''}">
                <query-wrapper :item='item' v-if="item.key==='fullAddress'" >
                    <pick-address
                        :strict='false'
                        size='mini'
                        v-model="query[item.key]"/>
                </query-wrapper>
                <query-wrapper :item='item' v-else-if="DateKeys.includes(item.key)">
                    <el-date-picker size='mini'
                        :picker-options="item.key === 'dispatchDate' ? {} : pickerOptions"
                        v-model="query[item.key]"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </query-wrapper>
                <query-wrapper v-show='isDeliverStatusVisible(item.key)' :item='item' v-else-if="EnumKeys.includes(item.key)" >
                    <el-select size='mini'
                        v-model="query[item.key]"
                        :placeholder="'请选择'+item.value">
                        <el-option
                            v-for="item in StatusOptions[item.key]"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </query-wrapper>
                <query-wrapper :item='item' v-else-if="NumberKeys.includes(item.key)" >
                    <number-range size='mini'
                        v-model="query[item.key]"/>
                </query-wrapper>
                <el-input v-else placeholder="请输入内容"
                    size='mini' v-model="query[item.key]">
                    <template slot="prepend">{{item.value}}</template>
                </el-input>
            </span>
            <el-button size='mini' icon='el-icon-search' @click="startFilter">开始查询</el-button>
            <el-button size='mini' type='danger' icon='el-icon-delete' @click="clearQueryFileds">清空所有筛选器</el-button>
            <i class='el-icon-close close-query' @click="$emit('update:visible', false)"></i>
        </div>
    </el-collapse-transition>
</template>

<script>
import {
    NumberKeys,
    StatusOptions, EnumKeys,
    DateKeys,
    DATA_KEYS,
} from '../../lib/common/biz-define';
import {geneTimeRange} from '../../lib/common/biz-util';
import PickAddress from './biz/pick-address.vue';
import NumberRange from './biz/number-range.vue';
import QueryWrapper from './biz/query-wrapper.vue';
import {page, query, tabData} from '../../lib/store/store';
import {clearFilters, startQueryWithFilters, getDisabledDate, isApplyedFilters} from '../../lib/store/biz/filters';
import {TAB_NAME} from '../../lib/constant';
import {getOrderColumeList} from '../../lib/order-item-rights';
export default {
    name: 'order-item',
    components: {PickAddress, NumberRange, QueryWrapper},
    props: ['visible'],
    data () {
        return {
            HEADER_LIST: getOrderColumeList(),
            query: query,
            timeRange: geneTimeRange(),
            NumberKeys,
            StatusOptions,
            EnumKeys,
            DateKeys,
            pickerOptions: {
                disabledDate: (time) => {
                    return getDisabledDate(time);
                }
            }
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
            startQueryWithFilters();
        },
        clearQueryFileds () {
            clearFilters();
        },
        isDeliverStatusVisible (key) {
            return !(key === DATA_KEYS.DELIVER_STATUS && tabData.active !== TAB_NAME.ALL);
        }
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