/*
 * @Author: tackchen
 * @Date: 2021-12-26 17:24:30
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-26 21:18:37
 * @FilePath: /excel/src/lib/biz/excel.js
 * @Description: Coding something
 */
import {tableData, page} from '../store/store';

let originTableData = [];

export function initOriginData ({data, header}) {
    originTableData = data;
    page.total = originTableData.length;
    tableData.header = header;
    changeTablePage();
}

export function refreshTableList () {
    const start = (page.index - 1) * page.size;
    tableData.list = originTableData.splice(start, start + page.size);
}

export async function changeTablePage (index = 1) {
    page.index = index;
    refreshTableList();
}

export function changeTableSize (size) {
    page.size = size;
    changeTablePage();
}