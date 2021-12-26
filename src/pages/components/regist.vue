<template>
    <el-dialog :visible.sync="dialogVisible.regist" @open='onOpen'>
        <div class='login-box reset-box regist-box'>
            <el-form class='login-form' ref='userLoginInfo' label-width='60px'>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-postcard' v-model='userName' placeholder="请输入员工英文ID"></el-input>
                </div>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-user-solid' v-model='name' placeholder="请输入员工姓名"></el-input>
                </div>
                <div class='login-item'>
                    <el-select
                        v-model="type"
                        placeholder="请选择员工类型">
                        <el-option
                            v-for="item in USER_TYPE_INFO"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class='text-center'>
                    <el-row :gutter="10">
                        <el-col :span="14">
                            <el-button class='login-btn' type='primary' @click='registNewUser' icon="el-icon-check">注册新员工</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button plain class='login-btn' type='default' @click='dialogVisible.regist = false' icon="el-icon-close">取消</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import {dialogVisible} from '../../lib/store/store';
import {toast, confirm} from '../../lib/utils';
import {TOAST_TYPE} from '../../lib/constant';
import {registUser} from '../../lib/store/biz/login';
import {pushIntoUserOptions, USER_TYPE_INFO, USER_TYPE_NAME_CN} from '../../lib/common/biz-define';

export default {
    name: 'regist',
    data () {
        return {
            dialogVisible,
            userName: '',
            USER_TYPE_INFO,
            name: '',
            type: '',
        };
    },
    methods: {
        onOpen () {
            this.userName = '';
            this.name = '';
            this.type = '';
        },
        async registNewUser () {
            if (!this.userName || !this.name || typeof this.type !== 'number') {
                return toast('输入信息不可为空', TOAST_TYPE.WARNING);
            }
            const result = await confirm({
                message: `请再次确认员工信息: ${this.name}(${this.userName}) ${USER_TYPE_NAME_CN[this.type]}`
            });
            if (result === 'confirm') {
                const data = {
                    userName: this.userName,
                    name: this.name,
                    type: this.type,
                };
                const success = await registUser(data);
                if (success) {
                    toast(`注册用户${this.name}成功`);
                    pushIntoUserOptions(data);
                    this.dialogVisible.regist = false;
                }
            }
        },
    }
};
</script>
<style scoped>
.regist-box .el-select{
    width: 100%;
}
</style>