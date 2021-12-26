/*
 * @Author: tackchen
 * @Date: 2021-12-06 22:39:01
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 01:00:16
 * @FilePath: /admin/src/lib/order-item-rights.js
 * @Description: Coding something
 */

import {DATA_KEYS, HEADER_LIST, USER_TYPE} from './common/biz-define';
import {userInfo} from './store/store';

export const RIGHT_ALL = 'all';

export const ORDER_ITEM_RIGHT = {
    [USER_TYPE.ADMIN]: {
        read: RIGHT_ALL,
        write: RIGHT_ALL,
    },
    [USER_TYPE.RECORD]: {
        read: [
            DATA_KEYS.FULL_ADDRESS,
            DATA_KEYS.AGENT_NAME,
            DATA_KEYS.STATION_ID,
            DATA_KEYS.STATION_TYPE,
            DATA_KEYS.HOUSEHOLDER_NAME,
            DATA_KEYS.HOUSEHOLDER_PHONE,
            DATA_KEYS.COMPONENT_QUANTITY,
            DATA_KEYS.COMPONENT_POWER,
            DATA_KEYS.MACHINE_CAPACITY,
            DATA_KEYS.SALESMAN_NAME,
            DATA_KEYS.INSTALL_STATUS,
            DATA_KEYS.COMMENT,
            DATA_KEYS.PROGRESS_STATUS,
        ],
        write: [
            DATA_KEYS.INSTALL_STATUS,
            DATA_KEYS.PROGRESS_STATUS,
        ],
    },
    [USER_TYPE.STORE]: {
        read: [
            DATA_KEYS.STATION_ID,
            DATA_KEYS.CONSTRUCTOR_NAME,
            DATA_KEYS.SALESMAN_NAME,
            DATA_KEYS.COMPONENT_QUANTITY,
            DATA_KEYS.COMPONENT_POWER,
            DATA_KEYS.HOUSEHOLDER_NAME,
            DATA_KEYS.HOUSEHOLDER_PHONE,
            DATA_KEYS.APPOINT_DATE,
            DATA_KEYS.APPOINT_CODE,
            DATA_KEYS.DELIVER_STATUS,
            DATA_KEYS.PICK_UP_DATE,
        ],
        write: [
            DATA_KEYS.DELIVER_STATUS,
            DATA_KEYS.PICK_UP_DATE,
        ]
    }
};

export function canUserReadInfo (key) {
    return userInfo.type !== USER_TYPE.RECORD || ORDER_ITEM_RIGHT[USER_TYPE.RECORD].read.includes(key);
}

export function haveReadRight (key) {
    return haveRight(key, 'read');
}
export function haveWriteRight (key) {
    return haveRight(key, 'write');
}

export function haveRight (key, type = 'read') {
    const rights = ORDER_ITEM_RIGHT[userInfo.type];
    return rights[type] === RIGHT_ALL || rights[type].includes(key);
}

export function getOrderColumeList () {
    if (userInfo.type !== USER_TYPE.RECORD) {
        return HEADER_LIST;
    }
    const keys = ORDER_ITEM_RIGHT[USER_TYPE.RECORD].read;
    const list = [];
    HEADER_LIST.forEach(item => {
        if (keys.includes(item.key)) {
            list.push(item);
        }
    });
    return list;
}