<template>
    <el-dialog :visible.sync="dialogVisible.resetPwd" @open='onOpen'>
        <div class='login-box reset-box'>
            <el-form class='login-form' ref='userLoginInfo' label-width='60px'>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-user-solid' v-model='userName' placeholder="请输入员工用户名"></el-input>
                </div>
                <div class='text-center'>
                    <el-row :gutter="10">
                        <el-col :span="14">
                            <el-button class='login-btn' type='primary' @click='resetPassword' icon="el-icon-check">重置密码</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button plain class='login-btn' type='default' @click='dialogVisible.resetPwd = false' icon="el-icon-close">取消</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import {dialogVisible} from '../../lib/store/store';
import {toast} from '../../lib/utils';
import {TOAST_TYPE} from '../../lib/constant';
import {resetPassword} from '../../lib/store/biz/login';

export default {
    name: 'reset-pwd',
    data () {
        return {
            dialogVisible,
            userName: '',
        };
    },
    methods: {
        onOpen () {
            this.userName = '';
        },
        async resetPassword () {
            if (!this.userName) {
                return toast('用户名不可为空', TOAST_TYPE.WARNING);
            }

            const success = await resetPassword({userName: this.userName});
            if (success) {
                toast('重置密码成功');
                this.dialogVisible.resetPwd = false;
            }
        },
    }
};
</script>
<style lang="less" scoped>
</style>