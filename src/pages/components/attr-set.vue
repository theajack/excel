<template>
    <el-dialog title="属性设置" @close='onClose' :visible.sync="dialogVisible.attrSet" class='order-item-dialog'>
        <el-form ref="form" label-width="100px">
            <el-form-item size='mini' label="日期属性">
                <tags :tags="DateKeys"/>
            </el-form-item>
            <el-form-item size='mini' label="数字属性">
                <tags :tags="NumberKeys"/>
            </el-form-item>
            <el-form-item size='mini' label="年龄属性">
                <tags :tags="AgeKeys"/>
            </el-form-item>
            <el-form-item>
                <el-button size='mini' icon='el-icon-check' type="primary" @click="onSubmit">保存</el-button>
                <el-button size='mini' icon='el-icon-close' @click="dialogVisible.attrSet = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {DateKeys, NumberKeys, AgeKeys, saveKeys} from '../../lib/biz/filters';
import {dialogVisible} from '../../lib/store/store';
import Tags from './tags.vue';

export default {
    name: 'attr-set',
    components: {Tags},
    data () {
        return {
            dialogVisible,
            DateKeys: Object.assign([], DateKeys),
            NumberKeys: Object.assign([], NumberKeys),
            AgeKeys: Object.assign([], AgeKeys),
        };
    },
    methods: {
        onSubmit () {
            saveKeys(this.DateKeys, this.NumberKeys, this.AgeKeys);
            this.dialogVisible.attrSet = false;
        },
        initKeys () {
            this.DateKeys = Object.assign([], DateKeys);
            this.NumberKeys = Object.assign([], NumberKeys);
            this.AgeKeys = Object.assign([], AgeKeys);
        },
        onClose () {
            this.initKeys();
        }
    }
};
</script>