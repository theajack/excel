/*
 * @Author: tackchen
 * @Date: 2021-12-11 12:29:37
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 00:31:19
 * @FilePath: /admin/src/lib/common/biz-define.js
 * @Description: Coding something
 */

export const DELIVER_STATUS = {
    NOT_DELIVERED: 0,
    DELIVERED: 1,
};

export const DELIVER_STATUS_TEXT = ['未提货', '已提货'];

export const INSTALL_STATUS = {
    EMPTY: 0,
    NOT_INSTALLED: 1,
    INSTALLED: 2,
};

export const INSTALL_STATUS_TEXT = ['空', '未报装', '已报装'];

export const ORDER_STATUS = {
    EMPTY: 0,
    NOT_SUSPENDED: 1,
    SUSPENDED: 2,
    CHANGED: 3,
};

export const ORDER_STATUS_TEXT = ['空', '系统未终止', '系统已终止', '已变更'];

export const PROGRESS_STATUS = {
    EMPTY: 0,
    DONE: 1,
};

export const PROGRESS_STATUS_TEXT = ['空', '已完工'];

export const APPOINT_STATUS = {
    UN_BOOK: 0,
    BOOKED: 1,
    CANCELLED: 2,
    FINISHED: 3,
};

export function isUnAppoint (status) {
    return status === null || status === APPOINT_STATUS.UN_BOOK || status === APPOINT_STATUS.CANCELLED;
}

export const APPOINT_STATUS_TEXT = ['未预约', '已预约', '已取消', '已完成'];

export const DISPATCH_STATUS = {
    NOT_DISPATCH: 0,
    DISPATCHED: 1,
};

export const DISPATCH_STATUS_TEXT = ['未派单', '已派单'];


export const USER_TYPE = {
    ALL: 1,
    SALE: 2, // 业务员
    CONST: 3, // 施工员
    RECORD: 4, // 录入员
    STORE: 5, // 仓库管理员
    ADMIN: 6, // 超管
    OTHER: 9,
};

export const USER_TYPE_INFO = [
    {key: USER_TYPE.ADMIN, value: '超级管理员'},
    {key: USER_TYPE.RECORD, value: '录入员'},
    {key: USER_TYPE.STORE, value: '仓库管理员'},
    {key: USER_TYPE.CONST, value: '施工员'},
    {key: USER_TYPE.SALE, value: '业务员'},
];

// USET_TYPE => 类型中文
export const USER_TYPE_NAME_CN = (() => {
    const name = {};
    USER_TYPE_INFO.forEach(item => {
        name[item.key] = item.value;
    });
    return name;
})();

// USET_TYPE => 类型英文小写
export const USER_TYPE_NAME = (() => {
    const name = {};
    for (const k in USER_TYPE) {
        name[USER_TYPE[k]] = k.toLowerCase();
    }
    return name;
})();


export const DATA_KEYS = {
    'ORIGIN_SERIAL': 'originSerial',
    'AGENT_ID': 'agentId',
    'FULL_ADDRESS': 'fullAddress',
    'AGENT_NAME': 'agentName',
    'STATION_ID': 'stationId',
    'STATION_TYPE': 'stationType',
    'HOUSEHOLDER_NAME': 'householderName',
    'NC_ORDER_ID': 'ncOrderId',
    'HOUSEHOLDER_PHONE': 'householderPhone',
    'PACKAGE_NAME': 'packageName',
    'COMPONENT_QUANTITY': 'componentQuantity',
    'COMPONENT_POWER': 'componentPower',
    'MACHINE_CAPACITY': 'machineCapacity',
    'AMOUNT': 'amount',
    'SALESMAN_NAME': 'salesmanName',
    'CONSTRUCTOR_NAME': 'constructorName',
    'DELIVER_STATUS': 'deliverStatus',
    'INSTALL_STATUS': 'installStatus',
    'DISPATCH_DATE': 'dispatchDate',
    'DISPATCH_STATUS': 'dispatchStatus',
    'PICK_UP_DATE': 'pickUpDate',
    'ORDER_STATUS': 'orderStatus',
    'PROGRESS_STATUS': 'progressStatus',
    'AREA': 'area',
    'COMMENT': 'comment',

    'APPOINT_CODE': 'appointmentCode',
    'APPOINT_DATE': 'appointmentDate',
    'APPOINT_ID': 'appointmentId',
    // 'APPOINT_PERIOD':'appointmentPeriod',
    'APPOINT_STATUS': 'appointmentStatus',
};

export const StatusText = {
    [DATA_KEYS.DELIVER_STATUS]: DELIVER_STATUS_TEXT,
    [DATA_KEYS.INSTALL_STATUS]: INSTALL_STATUS_TEXT,
    [DATA_KEYS.ORDER_STATUS]: ORDER_STATUS_TEXT,
    [DATA_KEYS.PROGRESS_STATUS]: PROGRESS_STATUS_TEXT,
    [DATA_KEYS.APPOINT_STATUS]: APPOINT_STATUS_TEXT,
    [DATA_KEYS.DISPATCH_STATUS]: DISPATCH_STATUS_TEXT,
    [DATA_KEYS.SALESMAN_NAME]: [],
    [DATA_KEYS.CONSTRUCTOR_NAME]: [],
};

export const EnumKeys = Object.keys(StatusText);

export const NumberKeys = [
    DATA_KEYS.COMPONENT_QUANTITY,
    DATA_KEYS.MACHINE_CAPACITY,
    DATA_KEYS.AMOUNT,
];

export const DateKeys = [
    DATA_KEYS.PICK_UP_DATE,
    DATA_KEYS.DISPATCH_DATE,
    DATA_KEYS.APPOINT_DATE,
];

export const ManKeys = [
    DATA_KEYS.CONSTRUCTOR_NAME,
    DATA_KEYS.SALESMAN_NAME,
];

export const AppointKeys = [
    DATA_KEYS.APPOINT_CODE,
    DATA_KEYS.APPOINT_DATE,
    DATA_KEYS.APPOINT_ID,
    DATA_KEYS.APPOINT_STATUS
];

export const RequiredKeys = [
    DATA_KEYS.AGENT_ID,
    DATA_KEYS.FULL_ADDRESS,
    DATA_KEYS.AGENT_NAME,
    DATA_KEYS.STATION_ID,
    DATA_KEYS.STATION_TYPE,
    // DATA_KEYS.HOUSEHOLDER_NAME,
    // DATA_KEYS.HOUSEHOLDER_PHONE,
    DATA_KEYS.PACKAGE_NAME,
    DATA_KEYS.COMPONENT_QUANTITY,
    DATA_KEYS.COMPONENT_POWER,
    DATA_KEYS.MACHINE_CAPACITY,
    DATA_KEYS.SALESMAN_NAME,
];
export const NotEditKeys = [
    DATA_KEYS.ORIGIN_SERIAL,
    DATA_KEYS.NC_ORDER_ID,
];

export const StatusOptions = (() => {
    const options = {};
    for (const k in StatusText) {
        if (ManKeys.includes(k)) {
            options[k] = StatusText[k];
        } else {
            options[k] = buildArraySelectOptions(StatusText[k]);
        }
    }
    return options;
})();

function buildArraySelectOptions (array) {
    return array.map((label, index) => {
        return {
            value: index,
            label
        };
    });
}

export function setSalesmanOptions (data) {
    StatusText[DATA_KEYS.SALESMAN_NAME] = data.map(item => item.name);
    StatusOptions[DATA_KEYS.SALESMAN_NAME] = data.map(item => buildAUserOption(item));
}
export function setConstructorOptions (data) {
    StatusText[DATA_KEYS.CONSTRUCTOR_NAME] = data.map(item => item.name);
    StatusOptions[DATA_KEYS.CONSTRUCTOR_NAME] = data.map(item => buildAUserOption(item));
}

function buildAUserOption ({name, userName}) {
    return {
        label: name,
        value: name,
        userName: userName,
    };
}

export function pushIntoUserOptions ({type, name, userName}) {
    let key = '';
    if (type === USER_TYPE.CONST) {
        key = DATA_KEYS.CONSTRUCTOR_NAME;
    } else if (type === USER_TYPE.SALE) {
        key = DATA_KEYS.SALESMAN_NAME;
    }
    if (key) {
        StatusText[key].push(name);
        StatusOptions[key].push(buildAUserOption({name, userName}));
    }
}

export const HEADER_NAME = {
    [DATA_KEYS.ORIGIN_SERIAL]: '序号', // 都不用
    [DATA_KEYS.AGENT_ID]: '代理商编号', //
    [DATA_KEYS.FULL_ADDRESS]: '项目地址',
    [DATA_KEYS.AGENT_NAME]: '代理商名称',
    [DATA_KEYS.STATION_ID]: '电站编号',
    [DATA_KEYS.STATION_TYPE]: '电站类型',
    [DATA_KEYS.HOUSEHOLDER_NAME]: '户主名称',
    [DATA_KEYS.NC_ORDER_ID]: '单号', // 都不用 默认 -
    [DATA_KEYS.HOUSEHOLDER_PHONE]: '联系电话',
    [DATA_KEYS.PACKAGE_NAME]: '套餐名称', //
    [DATA_KEYS.COMPONENT_QUANTITY]: '组件数量',
    [DATA_KEYS.COMPONENT_POWER]: '组件功率',
    [DATA_KEYS.MACHINE_CAPACITY]: '装机容量',
    [DATA_KEYS.AMOUNT]: '金额（元）', //
    [DATA_KEYS.SALESMAN_NAME]: '业务',
    [DATA_KEYS.CONSTRUCTOR_NAME]: '施工', //
    [DATA_KEYS.DELIVER_STATUS]: '提货状态', //
    [DATA_KEYS.INSTALL_STATUS]: '报装',
    [DATA_KEYS.DISPATCH_DATE]: '派单日期', //
    [DATA_KEYS.DISPATCH_STATUS]: '派单状态', //
    [DATA_KEYS.PICK_UP_DATE]: '提货日期', //
    [DATA_KEYS.ORDER_STATUS]: '变更/终止', //
    [DATA_KEYS.PROGRESS_STATUS]: '完工进度', //
    [DATA_KEYS.AREA]: '台区', //
    [DATA_KEYS.COMMENT]: '备注',

    // 预约 都不能录入
    [DATA_KEYS.APPOINT_CODE]: '预约排名',
    [DATA_KEYS.APPOINT_DATE]: '预约时间',
    [DATA_KEYS.APPOINT_STATUS]: '预约状态',
    [DATA_KEYS.APPOINT_ID]: '预约id',

};

export const FILTER_OPREATOR = {
    EQUALS: 'EQUALS',
    IN: 'IN',
    LIKE: 'LIKE',
    RANGE: 'RANGE',
};

export const HEADER_OPERATOR = {
    [DATA_KEYS.ORIGIN_SERIAL]: FILTER_OPREATOR.LIKE, // '序号',
    [DATA_KEYS.AGENT_ID]: FILTER_OPREATOR.LIKE, // '代理商编号',
    [DATA_KEYS.FULL_ADDRESS]: FILTER_OPREATOR.LIKE, // '项目地址',
    [DATA_KEYS.AGENT_NAME]: FILTER_OPREATOR.LIKE, // '代理商名称',
    [DATA_KEYS.STATION_ID]: FILTER_OPREATOR.LIKE, // '电站编号',
    [DATA_KEYS.STATION_TYPE]: FILTER_OPREATOR.LIKE, // '电站类型',
    [DATA_KEYS.HOUSEHOLDER_NAME]: FILTER_OPREATOR.LIKE, // '户主名称',
    [DATA_KEYS.NC_ORDER_ID]: FILTER_OPREATOR.LIKE, // '单号',
    [DATA_KEYS.HOUSEHOLDER_PHONE]: FILTER_OPREATOR.LIKE, // '联系电话',
    [DATA_KEYS.PACKAGE_NAME]: FILTER_OPREATOR.LIKE, // '套餐名称',
    [DATA_KEYS.COMPONENT_QUANTITY]: FILTER_OPREATOR.RANGE, // '组件数量',
    [DATA_KEYS.COMPONENT_POWER]: FILTER_OPREATOR.LIKE, // '组件功率',
    [DATA_KEYS.MACHINE_CAPACITY]: FILTER_OPREATOR.RANGE, // '装机容量',
    [DATA_KEYS.AMOUNT]: FILTER_OPREATOR.RANGE, // '金额(元)',
    [DATA_KEYS.SALESMAN_NAME]: FILTER_OPREATOR.LIKE, // '业务',
    [DATA_KEYS.CONSTRUCTOR_NAME]: FILTER_OPREATOR.LIKE, // '施工',
    [DATA_KEYS.DELIVER_STATUS]: FILTER_OPREATOR.IN, // '提货状态',
    [DATA_KEYS.INSTALL_STATUS]: FILTER_OPREATOR.IN, // '报装',
    [DATA_KEYS.DISPATCH_DATE]: FILTER_OPREATOR.RANGE, // '派单日期',
    [DATA_KEYS.DISPATCH_STATUS]: FILTER_OPREATOR.IN, // '派单日期',
    [DATA_KEYS.PICK_UP_DATE]: FILTER_OPREATOR.RANGE, // '提货日期',
    [DATA_KEYS.ORDER_STATUS]: FILTER_OPREATOR.IN, // '变更/终止',
    [DATA_KEYS.PROGRESS_STATUS]: FILTER_OPREATOR.IN, // '完工进度',
    [DATA_KEYS.AREA]: FILTER_OPREATOR.LIKE, // '台区',
    [DATA_KEYS.COMMENT]: FILTER_OPREATOR.LIKE, // '备注'
    // 预约
    [DATA_KEYS.APPOINT_CODE]: FILTER_OPREATOR.LIKE, //  '预约排名',
    [DATA_KEYS.APPOINT_DATE]: FILTER_OPREATOR.RANGE, // '预约时间',
    [DATA_KEYS.APPOINT_STATUS]: FILTER_OPREATOR.IN, // '预约状态',
    [DATA_KEYS.APPOINT_ID]: FILTER_OPREATOR.LIKE, // '预约id',
};

export const HEADER_LIST = (() => {
    const list = [];
    for (const k in HEADER_NAME) {
        list.push({key: k, value: HEADER_NAME[k]});
    }
    return list;
})();

export function createEmptyOrder () {
    const item = {};
    for (const k in DATA_KEYS) {
        item[DATA_KEYS[k]] = '';
    }
    return item;
}

export const MAX_APPOINT_COUNT = 15;