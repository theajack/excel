import {dialogVisible} from '../store';
import {getConstructorList, getSalesmanList} from '../service/user';
import {setConstructorOptions, setSalesmanOptions} from '../../common/biz-define';

/*
 * @Author: tackchen
 * @Date: 2021-11-07 17:03:26
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-03 22:48:30
 * @FilePath: /admin/src/lib/store/biz/common.js
 * @Description: Coding something
 */
export function showResetPwd () {
    dialogVisible.resetPwd = true;
}

export function showRegist () {
    dialogVisible.regist = true;
}

export function initEmpolyOptions () {
    initConstructorOptions();
    initSalesmanOptions();
}

async function initConstructorOptions () {
    const result = await getConstructorList();
    setConstructorOptions(result);
}
async function initSalesmanOptions () {
    const result = await getSalesmanList();
    setSalesmanOptions(result);
}