/*
 * @Author: tackchen
 * @Date: 2021-11-17 23:48:58
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 13:04:50
 * @FilePath: /admin/src/lib/store/biz/login.js
 * @Description: Coding something
 */
import {loginService, modPasswordService, resetPasswordService, registUserService} from '../service/user';
import {setCookie, getCookie} from '../../utils';
import storage from '../../storage';
import {userInfo, tabData} from '../store';
import {TAB_NAME} from '../../constant';
import {USER_TYPE} from '../../common/biz-define';
import {changeTabFilters} from './filters';
import router from '../../../router';

// store record cons1 cons2 sale1 sale2

let token = getCookie('token') || '';
let userType = parseInt(getCookie('userType') || '');
let _userName = storage.read('userName') || '';

userInfo.type = userType;
initTabActive();

export function getUserName () {
    return _userName;
}

export function isLogin () {
    return token && userType;
}

export function getToken () {
    return token;
}

export function getUserType () {
    return userType;
}

export async function login ({userName, password}) {
    const result = await loginService({userName, password});
    if (!result) return false;
    token = result.token;
    userType = result.type;
    _userName = userName;
    storage.write('userName', userName);
    setCookie('token', token);
    setCookie('userType', userType);
    userInfo.type = userType;
    initTabActive();
    return true;
}

export function logout () {
    token = '';
    userType = '';
    userInfo.type = '';
    setCookie('token', '');
    setCookie('userType', '');
    router.push({name: 'login'});
}

export function modPassword ({curPassword, newPassword}) {
    return modPasswordService({curPassword, newPassword});
}
export function resetPassword ({userName}) {
    return resetPasswordService({userName});
}
export function registUser ({
    userName, name, type
}) {
    return registUserService({userName, name, type});
}

export function initTabActive () {
    if (userType === USER_TYPE.STORE) {
        tabData.active = TAB_NAME.NOT_DELIVERED;
        changeTabFilters(tabData.active);
    }
}