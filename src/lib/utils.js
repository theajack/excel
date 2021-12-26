/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:44:12
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 13:22:51
 * @FilePath: /admin/src/lib/utils.js
 * @Description: Coding something
 */
import {Message, MessageBox, Loading, Notification} from 'element-ui';
import {TOAST_TYPE} from './constant';
import Cookies from 'js-cookie';

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