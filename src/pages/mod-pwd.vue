<template>
    <div class='login-mask' :style="{height: height+'px'}">
        <div class='login-box'>
            <el-form class='login-form' ref='userLoginInfo' label-width='60px'>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-user-solid' v-model='userName' placeholder="请输入用户名"></el-input>
                </div>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-lock' v-model='password' type='password' placeholder="请输入旧密码" :show-password='true'></el-input>
                </div>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-unlock' v-model='newPassword' type='password' placeholder="请输入新密码" :show-password='true'></el-input>
                </div>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-circle-check' v-model='newPasswordAgain' type='password' placeholder="请再次输入新密码" :show-password='true'></el-input>
                </div>
                <div class='text-center'>
                    <el-row :gutter="10">
                        <el-col :span="14">
                            <el-button class='login-btn' type='primary' @click='modPwd' icon="el-icon-check">确认修改</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button plain class='login-btn' type='default' @click='cancel' icon="el-icon-close">取消</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import './styles/login.less';
import {TOAST_TYPE} from '../lib/constant';
import {toast} from '../lib/utils';
import {modPassword, isLogin, login, getUserName} from '../lib/store/biz/login';

export default {
    name: 'login',
    // components: { SystemInformation },
    data () {
        return {
            userName: getUserName(),
            password: '',
            newPassword: '',
            newPasswordAgain: '',
            height: 500,
        };
    },
    mounted () {
        document.title = '修改密码';
        this.height = window.innerHeight;
        this.userName = this.$route.params.userName;
        this.password = this.$route.params.password;
    },
    methods: {
        async modPwd () {
            // postMessageSync(MSG_TYPE.OPEN_DEVTOOL);
            if (!this.userName || !this.password || !this.newPassword) {
                return toast('用户名或密码不可为空', TOAST_TYPE.WARNING);
            }
            if (this.newPassword !== this.newPasswordAgain) {
                return toast('两次输入密码不一致', TOAST_TYPE.WARNING);
            }
            if (!isLogin()) {
                const loginSuccess = await login({
                    userName: this.userName,
                    password: this.password
                });
                if (!loginSuccess) {
                    return;
                }
            }
            const success = await modPassword({
                curPassword: this.password,
                newPassword: this.newPassword,
            });
            if (success) {
                toast('修改密码成功');
                this.$router.push({
                    name: 'login',
                    params: {
                        userName: this.userName,
                        password: this.newPassword
                    }
                });
            }
        },
        cancel () {
            this.$router.back();
        }
    }
};
</script>

<style>

</style>
