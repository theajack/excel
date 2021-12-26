import {http} from '../../http';

/*
 * @Author: tackchen
 * @Date: 2021-11-17 23:10:22
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-02 21:16:23
 * @FilePath: /admin/src/lib/store/service/user.js
 * @Description: Coding something
 */
export function loginService ({userName, password}) {
    return http({
        url: '/user/login',
        method: 'post',
        params: {
            userName, password
        },
        token: false,
    });
}

export function resetPasswordService ({userName}) {
    return http({
        url: '/user/resetPassword',
        method: 'post',
        params: {userName},
    });
}

export function modPasswordService ({curPassword, newPassword}) {
    return http({
        url: '/user/updatePassword',
        method: 'post',
        params: {
            curPassword, newPassword
        },
    });
}

export function registUserService ({userName, name, type}) {
    return http({
        url: '/user/registerUser',
        method: 'post',
        params: {
            userName, name, type
        },
    });
}

export function getConstructorList () {
    return http({
        url: '/user_v2/getConstructorList',
        method: 'get',
    });
}

export function getSalesmanList () {
    return http({
        url: '/user_v2/getSalesmanList',
        method: 'get',
    });
}