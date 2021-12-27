/*
 * @Author: tackchen
 * @Date: 2021-12-27 07:37:09
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-27 09:20:39
 * @FilePath: /excel/src/lib/biz/filters.js
 * @Description: Coding something
 */

import {page, query} from '../store/store';
import {changeTablePage, getDataSource, sortExcelData} from './excel';

export const DateKeys = [
    '入院时间', '出院/区时间', '手术日期'
];

export const NumberKeys = [
    '年龄', '住院天数', '总费用', '手术费', '耗材费', '特殊材料费',
    '总药费', '药占比'
];

let filteResultDataSource = []; // 筛选出的结果

export function initFilterSource () {
    filteResultDataSource = getDataSource();
}

export function getFilterSource () {
    return filteResultDataSource;
}

export function isApplyedFilters () {
    for (const k in query) {
        if (query[k] !== '') {
            return true;
        }
    }
    return false;
}

export async function clearFilters () {
    for (const k in query) {
        query[k] = '';
    }
    page.isApplyFilterResult = false;
    startQueryWithFilters();
}

export function startQueryWithFilters () {
    if (!page.isApplyFilter) {
        filteResultDataSource = getDataSource();
    } else {
        filteResultDataSource = getDataSource().filter(item => {
            for (const k in query) {
                if (query[k]) {
                    const q = query[k];
                    const v = item[k];
                    if (typeof v === 'number') {
                        if (q instanceof Array) {
                            const min = q[0] !== '' ? parseFloat(q[0]) : '';
                            const max = q[1] !== '' ? parseFloat(q[1]) : '';
                            if ((min !== '' && v < min) || (max !== '' && v > max)) {
                                return false;
                            }
                        } else {
                            if (!v.toString().includes(q.toString())) {
                                return false;
                            }
                        }
                    } else if (typeof v === 'string') {
                        if (!v.includes(q)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
    }
    sortExcelData();
    changeTablePage();
}