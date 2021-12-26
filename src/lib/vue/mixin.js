/*
 * @Author: tackchen
 * @Date: 2021-11-05 01:17:26
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-11 13:05:02
 * @FilePath: /admin/src/lib/vue/mixin.js
 * @Description: Coding something
 */
import filters from './filters';
import {USER_TYPE} from '../common/biz-define';

export default {
    filters,
    data: () => ({
        USER_TYPE
    }),
};
