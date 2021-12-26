/*
 * @Author: tackchen
 * @Date: 2021-11-07 16:56:52
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 11:37:44
 * @FilePath: /admin/src/lib/store/biz/table.js
 * @Description: Coding something
 */

import {tableData, select, page, tabData} from '../store';
import {filterOrdersService, getAllOverdueOrder} from '../service/order';
import {getMergeFilters, changeTabFilters} from './filters';

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

export async function changeTablePage (index = 1) {
    page.index = index;
    await refreshOrderList();
}

export function changeTableSize (size) {
    page.size = size;
    changeTablePage();
}

export async function initOrderList () {
    refreshOrderList();
    initOverDueCount();
}

export async function initOverDueCount (count) {
    if (typeof count === 'undefined') {
        count = (await getAllOverdueOrder()).length;
    }
    tabData.overdueCount = count;
}

export async function refreshOrderList () {
    tableData.list = await filterOrdersService({
        pageSize: page.size,
        pageNum: page.index,
        filters: getMergeFilters()
    });
}

export function refreshTotalCount (count) {
    page.total = count;
}

export function changeTableTab () {
    changeTabFilters(tabData.active);
    changeTablePage();
}

export function getSelectedOrderIds () {
    return select.items.map(item => item.id).join(',');
}