/*
 * @Author: tackchen
 * @Date: 2021-11-06 17:38:15
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-16 00:56:24
 * @FilePath: /admin/src/lib/vue/directive.js
 * @Description: Coding something
 */
import Vue from 'vue';
import {userInfo, orderItem} from '../store/store';
import {NotEditKeys, USER_TYPE, USER_TYPE_NAME} from '../common/biz-define';
import {haveReadRight, haveWriteRight} from '../order-item-rights';
import {AppointKeys} from '../common/biz-define';

export function initDirective () {

    const isTypeInModifies = (binding) => {
        const type = userInfo.type;
        const name = USER_TYPE_NAME[type];
        return binding.modifiers[name] === true;
    };

    const hideEl = (el) => {
        const parent = el.parentElement;
        if (parent && parent.className.indexOf('el-tabs__item') !== -1) {
            el = parent;
        }
        el.style.display = 'none';
    };

    Vue.directive('right', {
        inserted: function (el, binding) {
            const type = userInfo.type;
            let visible = true;
            if (type === USER_TYPE.CONST || type === USER_TYPE.SALE) {
                visible = false;
            } else if (type === USER_TYPE.ADMIN) {
                visible = true;
            } else {
                visible = isTypeInModifies(binding);
            }
            if (!visible) hideEl(el);
        },
    });

    Vue.directive('right-only', {
        inserted: function (el, binding) {
            const exist = isTypeInModifies(binding);
            if (!exist) hideEl(el);
        }
    });

    Vue.directive('right-no', {
        inserted: function (el, binding) {
            const exist = isTypeInModifies(binding);
            if (exist) hideEl(el);
        }
    });
    const editRightFn = function (el, binding, vnode) {
        let read = false, write = false;
        const key = binding.value;
        if (!NotEditKeys.includes(key)) {
            if (orderItem.isAdd) {
                if (!AppointKeys.includes(key)) {
                    if (haveReadRight(key)) {
                        read = true;
                        write = true;
                    }
                }
            } else {
                if (haveReadRight(key)) {
                    read = true;
                    if (haveWriteRight(key)) {
                        write = true;
                    }
                }
            }
        }

        el.style.display = read ? 'block' : 'none';
        vnode.componentInstance.$children[1].$emit('update:disabled', !write);
    };
    Vue.directive('right-edit', {
        update: editRightFn,
        inserted: editRightFn
    });
}