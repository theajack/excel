/*
 * @Author: tackchen
 * @Date: 2021-11-05 01:01:13
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 01:09:47
 * @FilePath: /admin/src/lib/store/store.js
 * @Description: Coding something
 */

import {TAB_NAME} from '../constant';
import {createEmptyOrder, USER_TYPE} from '../common/biz-define';

export const userInfo = {
    type: USER_TYPE.STORE
};

window.userInfo = userInfo;

export const btnBox = {
    queryVisible: false,
};

export const orderItem = {
    visible: false,
    data: createEmptyOrder(),
    isAdd: false,
};

window.orderItem = orderItem;

export const tableData = {
    list: [],
};

// 多选的store
export const select = {
    items: [],
    count: 0,
};
// 分页的store
export const page = {
    isApplyFilter: false,
    isApplyFilterResult: false,
    total: 140,
    size: 50,
    index: 1,
    sizes: [20, 50, 100, 150, 200]
};
window.page = page;

export const dialogVisible = {
    resetPwd: false,
    regist: false,
    sendOrder: false,
    dispatchOrder: false,
    deliverOrder: false,
};

export const query = createEmptyOrder();
window.query = query;

export const tabData = {
    active: TAB_NAME.ALL,
    overdueCount: 0,
};

export const orderData = {
    attr: '',
    isDesc: false,
};