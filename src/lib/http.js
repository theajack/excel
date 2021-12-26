/*
 * @Author: tackchen
 * @Date: 2021-11-17 23:00:58
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-26 16:43:58
 * @FilePath: /excel/src/lib/http.js
 * @Description: Coding something
 */
import axios from 'axios';
import {toast, loading, notify} from './utils';
import {getToken} from './store/biz/login';
import {TOAST_TYPE} from './constant';
import router from '../router/index';
import {refreshOrderList} from './store/biz/table';

const host = 'localhost:8080';

export async function http ({
    url,
    method = 'post',
    params = {},
    data = {},
    token = true,
    refreshList = false,
}) {
    const {closeLoading} = loading();
    const headers = {};
    if (token) {
        const tk = getToken();
        headers.token = tk;
    }
    let result = null;
    try {
        result = await axios({
            url: `http://${host}/api${url}`, // dev
            // url: `/api${url}`, // prod
            params,
            data,
            method,
            headers,
        });
    } catch (e) {
        console.error(e);
    }
    closeLoading();

    if (result.status !== 200) return null;

    const httpData = result.data;

    if (httpData.status === 0) {
        const data = httpData.data;
        if (refreshList) {
            refreshOrderList();
        }
        return data || true;
    }
    if (httpData.errorCode === 'DataFormatError') {
        notify(httpData.errorCode, httpData.data, TOAST_TYPE.ERROR);
    } else {
        toast(`${httpData.data}(${httpData.errorCode})`, TOAST_TYPE.ERROR);
        if (httpData.data.indexOf('用户未登录') !== -1) {
            setTimeout(() => {router.push({name: 'login'});}, 1000);
        }
    }
    return null;
}