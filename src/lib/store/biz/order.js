/*
 * @Author: tackchen
 * @Date: 2021-11-07 16:57:26
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 00:24:50
 * @FilePath: /admin/src/lib/store/biz/order.js
 * @Description: Coding something
 */
import {orderItem} from '../store';
import {createEmptyOrder, DATA_KEYS, HEADER_NAME} from '../../common/biz-define';
import {uploadAllOrders, uploadSingleOrderService} from '../service/order';
import {toast} from '../../utils';
import {refreshOrderList} from './table';

export function editOrder (data) {
    orderItem.visible = true;
    orderItem.data = data;
    orderItem.isAdd = false;
}

export function addOrder () {
    orderItem.visible = true;
    const data = createEmptyOrder();
    data[DATA_KEYS.NC_ORDER_ID] = '-';
    orderItem.data = data;
    orderItem.isAdd = true;
}

export async function uploadOrders (excelData) {
    const data = excelData[0].data;
    const uploadDataList = data.map((item) => {
        const uploadData = {};
        for (const key in HEADER_NAME) {
            const value = item[HEADER_NAME[key]];
            uploadData[key] = typeof value === 'undefined' ? '' : value;
        }
        return uploadData;
    });

    if (await uploadAllOrders(uploadDataList)) {
        toast(`导入${uploadDataList.length}条订单成功`);
        refreshOrderList();
    }
}

export function recordSingleOrder () {
    const order = orderItem.data;
    return uploadSingleOrderService(order);
}