/*
 * @Author: tackchen
 * @Date: 2021-12-26 17:24:30
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-28 00:27:47
 * @FilePath: /excel/src/lib/biz/excel.js
 * @Description: Coding something
 */
// import {exportAsExcel} from '../excel';
import {exportAsExcel} from '../excel';
import {tableData, page, select} from '../store/store';
import {formatDateFromXlxs, simpleDeepClone, timeToDateTimeStr} from '../utils';
import {AgeKeys, DateKeys, getFilterSource, initFilterSource, NumberKeys, pureClearFilters} from './filters';

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

export function formatDataForExport (data) {
    return simpleDeepClone(data).map(item => {
        for (const k in item) {
            if (DateKeys.includes(k)) {
                if (typeof item[k] === 'number') {
                    item[k] = timeToDateTimeStr(item[k]);
                }
            } else if (AgeKeys.includes(k)) {
                item[k] += '岁';
            }
        }
        return item;
    });
}

export function initOriginData ({data, header}) {
    data = formatDataFromExcel(data);
    tableTotalData = data;
    dataSource = simpleDeepClone(data);
    initFilterSource();
    tableData.header = header;
    changeTablePage();
    pureClearFilters();
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
        const source = simpleDeepClone(getFilterSource());
        console.log(source, source.map(item => item['入院时间']));
        tableTotalData = source.sort((a, b) => {
            if (!a[property]) return LESS;
            if (!b[property]) return MORE;
            if (a[property] > b[property]) return MORE;
            if (a[property] < b[property]) return LESS;
            return 0;
        });
        console.log(tableTotalData, tableTotalData.map(item => item['入院时间']));
    }
    refreshTableList();
}

export function exportDataAsExcel () {
    let data = null;
    let name = '';
    if (select.count > 0) {
        data = select.items;
        name = `选择的${select.count}条数据`;
    } else {
        data = getFilterSource();
        name = page.isApplyFilterResult ? `删选出的${data.length}条数据` : `全部${data.length}条数据`;
    }
    
    const header = {};
    tableData.header.forEach(name => {
        header[name] = name;
    });
    exportAsExcel(formatDataForExport(data), header, name);
}