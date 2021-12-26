/*
 * @Author: tackchen
 * @Date: 2021-11-05 00:47:24
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 13:03:32
 * @FilePath: /admin/src/lib/vue/filters.js
 * @Description: Coding something
 */
import {DELIVER_STATUS_TEXT, INSTALL_STATUS_TEXT, PROGRESS_STATUS_TEXT, ORDER_STATUS_TEXT, DISPATCH_STATUS_TEXT} from '../common/biz-define';
import {timeToDateStr} from '../common/utils';
import {timeToTimeRangeStr} from '../common/biz-util';
import {DATA_KEYS} from '../common/biz-define';

export default {
    [DATA_KEYS.DELIVER_STATUS]: v => DELIVER_STATUS_TEXT[v],
    [DATA_KEYS.INSTALL_STATUS]: v => INSTALL_STATUS_TEXT[v],
    [DATA_KEYS.ORDER_STATUS]: v => ORDER_STATUS_TEXT[v],
    [DATA_KEYS.PROGRESS_STATUS]: v => PROGRESS_STATUS_TEXT[v],
    [DATA_KEYS.DISPATCH_STATUS]: v => DISPATCH_STATUS_TEXT[v],
    timeToDateStr,
    timeToTimeRangeStr,
};