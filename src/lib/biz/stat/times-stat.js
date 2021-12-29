/*
 * @Author: tackchen
 * @Date: 2021-12-29 22:12:05
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-29 22:38:36
 * @FilePath: /excel/src/lib/biz/stat/times-stat.js
 * @Description: Coding something
 */

import {exportAsExcel} from '../../excel';
import {loading} from '../../utils';
import {getDataSource} from '../excel';

const TIME_STAT_KEY = {
    TIME: '入院次数',
    COUNT: '统计人数',
    PERCENT: '比例',
    ALL_ID: '所有入院号',
};

const mainKey = '入院号';

export function timesStat () {
    const {closeLoading} = loading('正在统计中...');
    const data = getDataSource();

    const map = {};

    for (let i = 0, n = data.length; i < n; i++) {
        const key = data[i][mainKey];
        
        if (!map[key]) {
            map[key] = 1;
        } else {
            map[key] ++;
        }
    }
    const times = [];
    const excelData = [];

    for (const id in map) {
        const time = map[id];
        const index = times.indexOf(time);

        if (index === -1) {
            times.push(time);
            excelData.push({
                [TIME_STAT_KEY.TIME]: time,
                [TIME_STAT_KEY.COUNT]: 1,
                [TIME_STAT_KEY.ALL_ID]: id
            });
        } else {
            excelData[index][TIME_STAT_KEY.COUNT] ++;
            excelData[index][TIME_STAT_KEY.ALL_ID] += `,${id}`;
        }
    }
    let totalCount = 0;

    excelData.forEach(item => {
        totalCount += item[TIME_STAT_KEY.COUNT];
    });
    excelData.forEach(item => {
        item[TIME_STAT_KEY.PERCENT] = `${((item[TIME_STAT_KEY.COUNT] / totalCount) * 100).toFixed(1)}%`;
    });

    excelData.sort((a, b) => {return a[TIME_STAT_KEY.TIME] - b[TIME_STAT_KEY.TIME];});

    const header = {};
    for (const k in TIME_STAT_KEY) {
        header[TIME_STAT_KEY[k]] = TIME_STAT_KEY[k];
    }

    exportAsExcel(excelData, header, '随访统计结果');
    closeLoading();
}