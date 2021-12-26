import {select, query, tabData, page} from '../store';
import {exportAsExcel} from '../../excel';
import {getTableData, changeTablePage} from './table';
import {DELIVER_STATUS, ORDER_STATUS, APPOINT_STATUS, DISPATCH_STATUS} from '../../common/biz-define';
import {TAB_NAME, TOAST_TYPE} from '../../constant';
import {getAllOrders, getAllDeliveredOrder, getAllOverdueOrder} from '../service/order';
import {deepClone, dayToMs, convertToArray, tomorrowZeroHourTime} from '../../common/utils';
import {loading, toast} from '../../utils';
import {HEADER_NAME, createEmptyOrder, NumberKeys, DATA_KEYS} from '../../common/biz-define';
import {convertExcelOrder, buildAFilter, buildFilters} from '../../common/biz-util';

/*
 * @Author: tackchen
 * @Date: 2021-11-20 13:36:07
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 13:02:58
 * @FilePath: /admin/src/lib/store/biz/filters.js
 * @Description: Coding something
 */
const OverDueRangeTime = Date.now() - dayToMs(30);

export function getDisabledDate (time) {
    if (tabData.active !== TAB_NAME.OVERDUE) {
        return false;
    }
    return time.getTime() < OverDueRangeTime;
}

const Filters = {
    [TAB_NAME.ALL]: [],
    [TAB_NAME.DELIVER]: buildAFilter({
        key: DATA_KEYS.DELIVER_STATUS,
        values: [DELIVER_STATUS.DELIVERED]
    }),
    [TAB_NAME.OVERDUE]: buildFilters([{
        key: DATA_KEYS.DISPATCH_DATE,
        values: [new Date(2000, 1, 1).getTime(), OverDueRangeTime]
    }, {
        key: DATA_KEYS.DELIVER_STATUS,
        values: [DELIVER_STATUS.NOT_DELIVERED]
    }]),
    'undeleivered': buildAFilter({
        key: DATA_KEYS.DELIVER_STATUS,
        values: [DELIVER_STATUS.NOT_DELIVERED]
    }),
    'changed': buildAFilter({
        key: DATA_KEYS.ORDER_STATUS,
        values: [ORDER_STATUS.NOT_SUSPENDED, ORDER_STATUS.SUSPENDED]
    }),
    [TAB_NAME.NOT_DELIVERED]: buildFilters([{ // 今日之前已预约未提货
        key: DATA_KEYS.APPOINT_STATUS,
        values: [APPOINT_STATUS.BOOKED], // 已预约
    }, {
        key: DATA_KEYS.APPOINT_DATE,
        values: ['', tomorrowZeroHourTime()], // 今日之前
    }, {
        key: DATA_KEYS.DELIVER_STATUS,
        values: [DELIVER_STATUS.NOT_DELIVERED], // 未提货
    }]),
    [TAB_NAME.DISPATCH]: buildAFilter({ // 已派单
        key: DATA_KEYS.DISPATCH_STATUS,
        values: [DISPATCH_STATUS.DISPATCHED]
    })
};

let queryFilters = []; // queryBox 里的选择器
let tabFilters = []; // tab 的选择器

function buildFilterFn (key) {
    return filter => {
        return filter.field === HEADER_NAME[key];
    };
}

export function getMergeFilters () {
    if (tabData.active === TAB_NAME.ALL) {
        return queryFilters;
    }
    const result = deepClone(tabFilters); // 使用tabFilters为优先

    queryFilters.forEach(filter => { // 排除queryFilters中的重复filter
        if (!result.find(item => item.field === filter.field)) {
            result.push(filter);
        }
    });

    if (tabData.active === TAB_NAME.OVERDUE) { // 如果为逾期订单tab
        const dispatchDateFn = buildFilterFn(DATA_KEYS.DISPATCH_DATE);
        const tabDDFilter = tabFilters.find(dispatchDateFn); // 查找tabFilters中派单时间filter
        const resultDDFilter = result.find(dispatchDateFn); // 查找queryFilters中派单时间filter

        if (tabDDFilter) {
            if (resultDDFilter) { // 如果有 派单时间filter ，则使用两个时间查询上限的最小值
                resultDDFilter.values[1] = Math.min(tabDDFilter.values[1], resultDDFilter.values[1]);
            } else {
                result.push(tabDDFilter);
            }
        }
    }
    
    return result;
}

export function changeQueryFilters (filters) {
    queryFilters = convertToArray(filters);
}

export function changeTabFilters (activeTab) {
    tabFilters = convertToArray(Filters[activeTab] || []);
    // console.log(activeTab, Filters[activeTab], tabFilters);
}

export function isApplyedFilters () {
    for (const k in query) {
        if (query[k] !== '') {
            return true;
        }
    }
    return false;
}

const AllOrdersServices = {
    [TAB_NAME.ALL]: getAllOrders,
    [TAB_NAME.DELIVER]: getAllDeliveredOrder,
    [TAB_NAME.OVERDUE]: getAllOverdueOrder,
};
const FileName = {
    [TAB_NAME.ALL]: '全部',
    [TAB_NAME.DELIVER]: '已提货',
    [TAB_NAME.OVERDUE]: '已逾期',
};

export async function exportData (name = TAB_NAME.ALL) {
    const {closeLoading} = loading('正在导出中...');
    let data = [];
    let fileName = '';
    if (select.count === 0) {
        if (page.isApplyFilter) {
            data = deepClone(getTableData().list);
            fileName = '筛选出的订单列表';
        } else {
            data = await AllOrdersServices[name]();
            fileName = `${FileName[name]}订单列表`;
        }
    } else {
        data = deepClone(select.items);
        fileName = `选中的${select.count}个订单列表`;
    }
    if (data.length === 0) {
        closeLoading();
        toast('当前无可导出的数据', TOAST_TYPE.INFO);
        return;
    }
    // console.log(convertExcelOrder);
    convertExcelOrder(data, false);
    
    exportAsExcel(data, HEADER_NAME, fileName);
    closeLoading();
}

export async function clearFilters () {
    const empty = createEmptyOrder();
    for (const k in query) {
        query[k] = empty[k];
    }
    changeQueryFilters([]);
    await changeTablePage();

    page.isApplyFilterResult = false;
}

export async function startQueryWithFilters () {
    if (!page.isApplyFilter) return toast('当前为启用任何筛选器', TOAST_TYPE.WARNING);

    changeQueryFilters(buildQueryFilters());

    await changeTablePage();

    page.isApplyFilterResult = page.isApplyFilter;
}

function buildQueryFilters () {
    const filters = [];
    for (const key in query) {
        if (query[key] === '') continue;
        let values = query[key];
        if (NumberKeys.includes(key)) {
            values = values.map(value => parseFloat(value));
        }
        filters.push(buildAFilter({key, values}));
    }
    return filters;
}