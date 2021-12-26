import {timeToJson, timeToDateStr, hourToMs, deepClone, dateStrToDateTime} from './utils';
import {HEADER_NAME, HEADER_OPERATOR, DATA_KEYS, EnumKeys, StatusText, DateKeys, ManKeys} from './biz-define';

/*
 * @Author: tackchen
 * @Date: 2021-11-06 14:50:27
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 19:49:10
 * @FilePath: /admin/src/lib/common/biz-util.js
 * @Description: 具体业务相关工具
 */
 
const TIME_RANGE_INDEX = {
    T1: '1',
    T2: '2',
    T3: '3'
};

// 1,2,3
const TIME_RANGE_MAP = [{
    // 10/1 - 第二年5/1
    [TIME_RANGE_INDEX.T1]: '8:30～12:00',
    [TIME_RANGE_INDEX.T2]: '13:30～15:30',
    [TIME_RANGE_INDEX.T3]: '15:30～18:00',
}, {
    // 5/1 - 10/1
    [TIME_RANGE_INDEX.T1]: '8:30～12:00',
    [TIME_RANGE_INDEX.T2]: '14:00～16:00',
    [TIME_RANGE_INDEX.T3]: '16:00～18:30',
}];
// 时间戳 转 时间区间
export function timeToTimeRangeStr (time) {
    if (!time) {return '--';}
    const date = timeToJson(time);
    if (!date) {return '--';}
    const str = timeToDateStr(time);
    const index = getRangeIndex(date);
    // hour=0 认为是第一个时间段
    return `${str} ${TIME_RANGE_MAP[index][date.hour || [TIME_RANGE_INDEX.T1]]}`;
}
// 时间区间转 时间戳
export function timeRangeStrToTime (timeStr) {
    if (typeof timeStr === 'number') return timeStr;
    if (!timeStr) return 0;
    const [dateStr, rangeStr] = timeStr.split(' ');
    const date = timeToJson(dateStrToDateTime(dateStr));
    const index = getRangeIndex(date);

    const map = TIME_RANGE_MAP[index];

    let hour = TIME_RANGE_INDEX.T1;
    for (const k in map) {
        if (map[k] === rangeStr) {
            hour = k;
            break;
        }
    }
    return new Date(date.year, date.month - 1, date.date, hour);
}

function getRangeIndex (date) {
    return (date.month >= 5 && date.month < 10) ? 1 : 0;
}

export function geneTimeRange (date = new Date()) {
    const json = timeToJson(date);
    const index = getRangeIndex(json);
    const d = TIME_RANGE_MAP[index];
    const result = [];
    for (const k in d) {
        result.push({
            hour: k,
            text: d[k],
            label: d[k],
            value: hourToMs(parseInt(k))
        });
    }
    return result;
}

export function buildAFilter ({key, values}) {
    if (!(values instanceof Array)) {
        values = [values];
    }
    values.forEach((value, i) => {
        if (value === null || typeof value === 'undefined' || Number.isNaN(value)) {
            values[i] = '';
        }
    });
    return {
        field: HEADER_NAME[key],
        operator: HEADER_OPERATOR[key],
        values
    };
}

export function buildFilters (filters) {
    return filters.map(filter => {
        return buildAFilter(filter);
    });
}

export function convertExcelOrder (data, needDeepClone = true) {
    if (needDeepClone)
        data = deepClone(data);

    data.forEach(item => {
        delete item.indexAddress;
        delete item.id;
        convertSingleOrderForReading(item);
    });

    return data;
}

// 将数据库存储格式转换成可读数据
export function convertOrderForReading (order, clone = false) {
    return convertOrderBase(order, clone);
}

function convertSingleOrderForReading (order) {
    for (const key in order) {
        order[key] = convertSingleKeyForReading(order, key);
    }
}

export function convertSingleKeyForReading (order, key) {
    let value = order[key];
    if (!value && value !== 0) {
        return '--';
    }
    if (EnumKeys.includes(key)) {
        if (!ManKeys.includes(key)) {
            value = StatusText[key][value];
        }
    } else if (DateKeys.includes(key)) {
        if (key === DATA_KEYS.APPOINT_DATE) {
            value = timeToTimeRangeStr(value);
        } else {
            value = timeToDateStr(value);
        }
    }
    return value;
}

function convertOrderBase (order, clone = false, fn = convertSingleOrderForReading) {
    if (clone) {
        order = deepClone(order);
    }
    if (order instanceof Array) {
        order.forEach(item => {
            fn(item);
        });
    } else {
        fn(order);
    }
    return order;
}

// 将导入数据转换成数据库存储格式
export function convertOrdersForDB (order, clone = false) {
    return convertOrderBase(order, clone, convertSingleOrderForDB);
}

function convertSingleOrderForDB (order) {
    for (const key in order) {
        order[key] = convertSingleKeyForDB(order, key);
    }
}
function convertSingleKeyForDB (order, key) {
    let value = order[key];

    if (value === '--') {
        return '';
    }

    if (EnumKeys.includes(key)) {
        if (!ManKeys.includes(key)) {
            value === StatusText[key].indexOf(value);
        }
    } else if (DateKeys.includes(key)) {
        if (key === DATA_KEYS.APPOINT_DATE) {
            value = timeRangeStrToTime(value);
        } else {
            value = timeToDateStr(value);
        }
    }
    return value;
}