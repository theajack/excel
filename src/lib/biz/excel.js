/*
 * @Author: tackchen
 * @Date: 2021-12-26 17:24:30
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-27 09:06:43
 * @FilePath: /excel/src/lib/biz/excel.js
 * @Description: Coding something
 */
import {tableData, page} from '../store/store';
import {formatDateFromXlxs, simpleDeepClone} from '../utils';
import {DateKeys, getFilterSource, initFilterSource, NumberKeys} from './filters';

let dataSource = []; // 最原始的数据 不能改变

let tableTotalData = [];

const sortInfo = {
    property: '',
    order: ''
};

export function getDataSource () {
    return dataSource;
}

export function setSortInfo (property, order) {
    sortInfo.property = property;
    sortInfo.order = order;
}

export function formatDataFromExcel (data) {
    return data.map(item => {
        for (const k in item) {
            if (DateKeys.includes(k)) {
                if (typeof item[k] === 'number')
                    item[k] = formatDateFromXlxs(item[k]);
            } else if (NumberKeys.includes(k)) {
                if (typeof item[k] !== 'number') {
                    const value = parseFloat(item[k]);
                    if (!Number.isNaN(value)) {
                        item[k] = value;
                    }
                }
            }
        }
        return item;
    });
}

export function formatDataForExport () {
    
}

export function initOriginData ({data, header}) {
    data = formatDataFromExcel(data);
    tableTotalData = data;
    dataSource = simpleDeepClone(data);
    initFilterSource();
    page.total = tableTotalData.length;
    tableData.header = header;
    changeTablePage();
}

export function refreshTableList () {
    const start = (page.index - 1) * page.size;
    tableData.list = tableTotalData.slice(start, start + page.size);
}

export async function changeTablePage (index = 1) {
    page.index = index;
    refreshTableList();
}

export function changeTableSize (size) {
    page.size = size;
    changeTablePage();
}

export function sortExcelData () {
    const {property, order} = sortInfo;
    if (!order) {
        tableTotalData = simpleDeepClone(getFilterSource());
    } else {
        const MORE = order === 'ascending' ? 1 : -1;
        const LESS = - MORE;
        tableTotalData = simpleDeepClone(getFilterSource()).sort((a, b) => {
            if (a[property] > b[property]) return MORE;
            if (a[property] < b[property]) return -LESS;
            return 0;
        });
    }
    refreshTableList();
}