/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:44:12
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 19:49:17
 * @FilePath: /admin/src/lib/common/utils.js
 * @Description: Coding something
 */

export function formatDate (time) {
    const date = new Date(time);
    if (!date) {return '--';}
    return `${date.getFullYear()}-${fn(date.getMonth() + 1)}-${fn(date.getDate())} ${fn(date.getHours())}:${fn(date.getMinutes())}:${fn(date.getSeconds())}`;
}

function fn (num) {
    return num < 10 ? ('0' + num) : num.toString();
}

export function delay (time = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

export function timeToJson (time = Date.now()) {
    const date = typeof time === 'number' ? new Date(time) : time;
    if (!date) {return null;}
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
    };
}

// 获取明天早上0点的时间戳
export function tomorrowZeroHourTime () {
    const json = timeToJson(Date.now() + dayToMs());
    return new Date(json.year, json.month - 1, json.date).getTime(); // todo
}

export function timeToDateStr (time = Date.now()) {
    const date = timeToJson(time);
    if (!date) {return '--';}
    return `${date.year}-${fn(date.month)}-${fn(date.date)}`;
}

export function isUpCaseLetter (letter) {
    return letter.charCodeAt(0) < 97;
}

// 驼峰转下划线
export function transformKey (key) {
    return key.split('').map(item => {
        return isUpCaseLetter(item) ? `_${item}` : item.toUpperCase();
    }).join('');
}

export function hourToMs (hour) {
    return hour * 60 * 60 * 1000;
}

export function dayToMs (day = 1) {
    return hourToMs(day * 24);
}

// 2021-12-14 | 2021-12-14T16:00:00.000Z => 1639440000000
export function dateStrToDateTime (str) {
    if (str.indexOf('T') !== -1) {
        str = str.split('T')[0];
    }

    const [year, month, date] = str.split('-');

    return new Date(year, parseInt(month) - 1, date).getTime();
}

export function parseJSON (data) {
    if (typeof data === 'object') {
        return data;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
}

export function deepClone (data) {
    return parseJSON(JSON.stringify(data));
}

export function convertToArray (value) {
    if (value instanceof Array) return value;
    return [value];
}