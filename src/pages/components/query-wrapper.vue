
<template>
    <span class='query-wrapper'>
        <span class='query-wrapper-title'>{{attr}} </span>
        <slot></slot>
        <i class='el-icon-close query-clear' @click="clearSingleQuery(attr)"></i>
    </span>
</template>

<script>

import {query} from '../../lib/store/store';
export default {
    name: 'query-wrapper',
    data () {
        return {
            query
        };
    },
    props: {
        attr: {
            type: String,
            required: true,
        },
    },
    methods: {
        clearSingleQuery () {
            this.query[this.attr] = '';
        }
    }
};
</script>
<style lang="less">
.query-wrapper{
    display: inline-block;
    padding-left: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 10px;
    .query-wrapper-title{
        font-size: 12px;
        color: #888;
    }
    .el-date-editor--daterange.el-input__inner{
        width: 210px;
    }
    .el-range__close-icon{
        display: none!important;
    }
    .query-clear{
        margin: 0 2px;
        top: 2px;
        position: relative;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        &:hover{
            color: #f44;
        }
    }
    .el-input__inner, .el-range-input{
        border: none;
        border-radius: 0;
        background-color: #f8f8f8;
    }
    .el-select{
        width: 120px;
    }
}
</style>