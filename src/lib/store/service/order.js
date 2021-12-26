import {http} from '../../http';
import {buildAFilter, buildFilters} from '../../common/biz-util';
import {DATA_KEYS, HEADER_NAME, ORDER_STATUS, DELIVER_STATUS} from '../../common/biz-define';
import {dayToMs} from '../../common/utils';
import {refreshTotalCount, refreshOrderList} from '../biz/table';
import {page, orderData} from '../store';

/*
 * @Author: tackchen
 * @Date: 2021-11-18 00:15:02
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 13:03:19
 * @FilePath: /admin/src/lib/store/service/order.js
 * @Description: Coding something
 */

/**
 * pageSize=100&
 * pageNum=0&
 * filters=
    0: {field: '提货状态', operator: 'EQUALS', values: Array(1)}
    1: {field: '报装', operator: 'IN', values: Array(2)}
    2: {field: '业务', operator: 'LIKE', values: Array(1)}
 * orderBy=电站编号&
 * isDesc=false
 */
export async function filterOrdersService ({
    pageSize = page.size,
    pageNum = page.index,
    filters = [],
}) {
    const params = {pageSize, pageNum: pageNum - 1};
    if (!(filters instanceof Array)) {
        filters = [filters];
    }
    const filterStr = encodeURIComponent(JSON.stringify(filters));
    if (orderData.attr) {
        params.orderBy = HEADER_NAME[orderData.attr];
        params.isDesc = orderData.isDesc;
    }
    const result = await http({
        method: 'get',
        url: `/order/getOrdersByFilters?filters=${filterStr}`,
        params,
    });
    if (!result) {
        return [];
    }
    refreshTotalCount(result.total);
    return result.orders;
}

export function uploadAllOrders (data) {
    return http({
        url: '/order/uploadAllOrder',
        data: JSON.stringify(data)
    });
}

export function getAllOrders () {
    return http({
        method: 'get',
        url: '/order/getAllOrder',
    });
}

// 已提货订单
export function getDeliveredOrder ({pageSize, pageNum}) {
    return filterOrdersService({
        pageSize,
        pageNum,
        filters: buildAFilter({
            key: DATA_KEYS.DELIVER_STATUS,
            values: [DELIVER_STATUS.DELIVERED]
        })
    });
}

export function getAllDeliveredOrder () {
    return http({
        method: 'get',
        url: '/order/getDeliveredOrder',
    });
}

// 逾期订单
export function getOverdueOrder ({pageSize, pageNum}) {
    // 【逾期订单】定义：【派单时间】之后的30天没有【提货状态】的变动属于【逾期订单】.
    return filterOrdersService({
        pageSize,
        pageNum,
        filters: buildFilters([{
            key: DATA_KEYS.DISPATCH_DATE,
            values: [new Date(2000, 1, 1).getTime(), Date.now() - dayToMs(30)]
        }, {
            key: DATA_KEYS.DELIVER_STATUS,
            values: [DELIVER_STATUS.NOT_DELIVERED]
        }])
    });
}
export function getAllOverdueOrder () {
    return http({
        method: 'get',
        url: '/order/getOverdueOrder',
    });
}
// 未提货订单
export function getUndeliveredOrder ({pageSize, pageNum}) {
    return filterOrdersService({
        pageSize,
        pageNum,
        filters: buildAFilter({
            key: DATA_KEYS.DELIVER_STATUS,
            values: [DELIVER_STATUS.NOT_DELIVERED]
        })
    });
    // return http({
    //     url: '/order/getUndeliveredOrder',
    // });
}
// 变更/终止订单
export function getChangedOrder ({pageSize, pageNum}) {
    
    return filterOrdersService({
        pageSize,
        pageNum,
        filters: buildAFilter({
            key: DATA_KEYS.ORDER_STATUS,
            values: [ORDER_STATUS.NOT_SUSPENDED, ORDER_STATUS.SUSPENDED]
        })
    });
    // return http({
    //     url: '/order/getChangedOrder',
    // });
}

export function uploadSingleOrderService (order) {
    return http({
        method: 'post',
        url: '/order_v2/uploadData',
        data: JSON.stringify(order)
    });
}

export function sendOrderService ({orderIds, ncOrderId, packageName}) {
    return http({
        method: 'post',
        url: '/order_v2/putInStorage',
        params: {orderIds, ncOrderId, packageName},
        refreshList: true,
    });
}

export function dispatchOrderService ({orderIds, constructorName, dispatchDate}) {
    return http({
        method: 'post',
        url: '/order_v2/dispatchOrder',
        params: {orderIds, constructorName, dispatchDate},
        refreshList: true,
    });
}

export function deliverOrderService ({
    orderIds,
    deliverStatus = DELIVER_STATUS.DELIVERED,
    pickUpDate
}) {
    return http({
        method: 'post',
        url: '/order_v2/updateDeliverStatus',
        params: {orderIds, deliverStatus, pickUpDate},
        refreshList: true,
    });
}

export async function cancelOrdersService (orderIds) {
    const result = await Promise.all(orderIds.split(',').map(orderId => {
        return cancelSingleOrderService(orderId, false);
    }));

    for (let i = 0; i < result.length; i++) {
        if (!result[i]) {
            return false;
        }
    }
    refreshOrderList();
    return true;
}

export async function cancelSingleOrderService (orderId, refreshList = true) {
    return http({
        method: 'post',
        url: '/appointment/cancelPickUp',
        params: {orderId},
        refreshList
    });
}