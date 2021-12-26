/*
 * @Author: tackchen
 * @Date: 2021-11-07 16:56:52
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-26 17:25:53
 * @FilePath: /excel/src/lib/biz/table.js
 * @Description: Coding something
 */

import {tableData, select, page} from '../store/store';

export function setSelectItems (val) {
    select.items = val;
    select.count = val.length;
}
export function getSelectData () {
    return select;
}

export function getTableData () {
    return tableData;
}

export function getTablePage () {
    return page;
}

export function refreshTotalCount (count) {
    page.total = count;
}
