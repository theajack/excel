<template>
    <div class='login-mask' :style="{height: height+'px'}">
        <div class='login-box'>
            <el-form class='login-form' ref='userLoginInfo' label-width='60px'>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-user-solid' v-model='userName' placeholder="请输入用户名"></el-input>
                </div>
                <div class='login-item'>
                    <el-input prefix-icon='el-icon-lock' v-model='password' type='password' placeholder="请输入密码" :show-password='true'></el-input>
                </div>
                <div class='text-center'>
                    <el-row :gutter="10">
                        <el-col :span="14">
                            <el-button class='login-btn' type='primary' @click='login' icon="el-icon-user-solid">登录</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button plain class='login-btn' type='default' @click='modPassword' icon="el-icon-key">修改密码</el-button>
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
import {login, getUserName} from '../lib/store/biz/login';

export default {
    name: 'login',
    // components: { SystemInformation },
    data () {
        return {
            userName: getUserName(),
            password: '',
            height: 500,
        };
    },
    mounted () {
        document.title = '登录';
        this.height = window.innerHeight;
        if (this.$route.params.userName) {
            this.userName = this.$route.params.userName;
            this.password = this.$route.params.password;
        }
    },
    methods: {
        async login () {
            // postMessageSync(MSG_TYPE.OPEN_DEVTOOL);
            if (!this.userName || !this.password) {
                return toast('用户名或密码不可为空', TOAST_TYPE.WARNING);
            }
            const success = await login({
                userName: this.userName,
                password: this.password
            });
            if (success) {
                toast('登录成功');
                this.$router.push({name: 'list'});
            }
        },
        modPassword () {
            this.$router.push({
                name: 'mod-pwd',
                params: {
                    userName: this.userName,
                    password: this.password
                }
            });
        }
    }
};
</script>

<style>

</style>
