/*
 * @Author: tackchen
 * @Date: 2021-12-27 07:37:09
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-28 00:56:33
 * @FilePath: /excel/src/lib/biz/filters.js
 * @Description: Coding something
 */

import {page, query} from '../store/store';
import {changeTablePage, getDataSource, sortExcelData} from './excel';
import {refreshTotalCount} from './table';

const StoreKey = 'ATTR_KEY';
const value = localStorage.getItem(StoreKey);
const data = value ? JSON.parse(value) : [
    ['入院时间', '出院/区时间', '手术日期'],
    ['年龄', '住院天数', '总费用', '手术费', '耗材费', '特殊材料费', '总药费', '药占比'],
    ['年龄']
];

export const DateKeys = data[0];

export const NumberKeys = data[1];

export const AgeKeys = data[2];

export function saveKeys (dk, nk, ak) {
    // console.log(dk, nk, ak);
    DateKeys.splice(0, DateKeys.length);
    DateKeys.push(...dk);
    NumberKeys.splice(0, NumberKeys.length);
    NumberKeys.push(...nk);
    AgeKeys.splice(0, AgeKeys.length);
    AgeKeys.push(...ak);
    localStorage.setItem(StoreKey, JSON.stringify([dk, nk, ak]));
}

let filteResultDataSource = []; // 筛选出的结果

export function initFilterSource () {
    filteResultDataSource = getDataSource();
    refreshTotalCount(filteResultDataSource.length);
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

export function pureClearFilters () {
    for (const k in query) {
        query[k] = '';
    }
    page.isApplyFilter = false;
}

export async function clearFilters () {
    pureClearFilters();
    startQueryWithFilters();
}

export function startQueryWithFilters () {
    if (!page.isApplyFilter) {
        filteResultDataSource = getDataSource();
        page.isApplyFilterResult = false;
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
                    } else {
                        return false;
                    }
                }
            }
            return true;
        });
        page.isApplyFilterResult = true;
    }
    refreshTotalCount(filteResultDataSource.length);
    sortExcelData();
    changeTablePage();
}