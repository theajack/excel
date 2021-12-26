/*
 * @Author: tackchen
 * @Date: 2021-11-05 01:01:13
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-26 21:19:28
 * @FilePath: /excel/src/lib/store/store.js
 * @Description: Coding something
 */

export const excelNames = {
    list: []
};

export const tableData = {
    list: [],
    header: [],
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
    total: 0,
    size: 50,
    index: 1,
    sizes: [2, 4, 20, 50, 100, 150, 200, 2000, 5000]
};