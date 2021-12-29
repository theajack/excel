/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:44:12
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-29 22:59:18
 * @FilePath: /excel/src/lib/utils.js
 * @Description: Coding something
 */
import {Message, MessageBox, Loading, Notification} from 'element-ui';
import {TOAST_TYPE} from './constant';
import Cookies from 'js-cookie';

export const DATE_SPLIT = '/';

export function loading (text = '加载中...') {
    const instance = Loading.service({
        text
    });
    return {
        closeLoading () { instance.close(); },
        changeText (s) { instance.text = s; }
    };
}

export function toast (message, type = TOAST_TYPE.SUCCESS, duration = 2000) {
    Message({
        message,
        type,
        duration,
        showClose: true,
    });
}

export function notify (title, message, type = TOAST_TYPE.SUCCESS, duration = 0, html = false) {
    return Notification({
        title,
        message,
        duration,
        type,
        dangerouslyUseHTMLString: html,
    });
}

window.Notification = Notification;

export function alert ({
    message,
    confirmButtonText = '确定',
    showClose = true,
    title = '提示框',
    type = 'success'
}) {
    return MessageBox.alert(
        message,
        {
            title,
            type,
            confirmButtonText,
            closeOnClickModal: false,
            showClose
        }
    );
}

export function confirm ({
    message,
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    showClose = true,
    title = '提示框',
    type = 'warning'
}) {
    return MessageBox.confirm(
        message,
        {
            title,
            type,
            confirmButtonText,
            cancelButtonText,
            closeOnClickModal: false,
            showClose
        }
    ).catch(() => {});
}

export function printData (data, header) {
    const tableToPrint = document.createElement('table');// 将要被打印的表格
    tableToPrint.cellSpacing = 0;
    tableToPrint.border = 1;
    tableToPrint.style.width = '100%';
    tableToPrint.style.textAlign = 'center';
    tableToPrint.style.wordBreak = 'break-all';
    tableToPrint.style.fontSize = '12px';

    let html = '';
    html += '<tr>';
    for (const k in header) {
        html += `<th>${header[k]}</th>`;
    }
    html += '</tr>';

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        html += '<tr>';
        for (const k in item) {
            html += `<td>${item[k]}</td>`;
        }
        html += '</tr>';
    }
    tableToPrint.innerHTML = html;

    const newWin = window.open('');// 新打开一个空窗口
    newWin.document.write(tableToPrint.outerHTML);// 将表格添加进新的窗口
    newWin.document.close();// 在IE浏览器中使用必须添加这一句
    newWin.focus();// 在IE浏览器中使用必须添加这一句

    newWin.print();// 打印
    newWin.close();// 关闭窗口
}

const COOKIE_PREFIX = 'gf_';
export function setCookie (name, value, expires) {
    if (value === null) {
        Cookies.remove(name);
    } else {
        if (expires) {
            Cookies.set(`${COOKIE_PREFIX}${name}`, value, {expires});
        } else {
            Cookies.set(`${COOKIE_PREFIX}${name}`, value);
        }
    }
}

export function getCookie (name) {
    return Cookies.get(`${COOKIE_PREFIX}${name}`);
}

// 只进行一层的深拷贝
export function simpleDeepClone (source) {
    return source.map(item => Object.assign({}, item));
}

export function formatDateFromXlxs (serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    const seconds = total_seconds % 60;
    total_seconds -= seconds;
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;
    const d = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    return d.getTime();
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
    return `${date.year}${DATE_SPLIT}${fn(date.month)}${DATE_SPLIT}${fn(date.date)}`;
}

export function timeToDateTimeStr (time = Date.now()) {
    const date = new Date(time);
    if (!date) {return '--';}
    return `${date.getFullYear()}${DATE_SPLIT}${fn(date.getMonth() + 1)}${DATE_SPLIT}${fn(date.getDate())} ${fn(date.getHours())}:${fn(date.getMinutes())}:${fn(date.getSeconds())}`;
}

export function dayToMs (day = 1) {
    return hourToMs(day * 24);
}

function fn (num) {
    return num < 10 ? ('0' + num) : num.toString();
}

export function hourToMs (hour) {
    return hour * 60 * 60 * 1000;
}

export function timeStrToDateTime (str) {
    const [dateStr, timeStr] = str.split(' ');
    if (!dateStr) return '';
    const [year, month, date] = dateStr.split(DATE_SPLIT);
    const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
    if (timeStr) {
        const [hour, minute, second] = timeStr.split(':');
        dateObject.setHours(hour);
        dateObject.setMinutes(minute);
        dateObject.setSeconds(second);
    }
    return dateObject.getTime();
}