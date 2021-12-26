/*
 * @Author: tackchen
 * @Date: 2021-11-20 11:52:30
 * @LastEditors: tackchen
 * @LastEditTime: 2021-11-20 11:52:30
 * @FilePath: /admin/src/lib/storage.js
 * @Description: Coding something
 */

 
import {parseJSON} from './common/utils';

let store = null;
const tail = '_gf';

useLocalStorage();

function useLocalStorage () {
    store = window.localStorage;
}

function useSessionStorage () {
    store = window.sessionStorage;
}

function geneKey (key) {
    return key + tail;
}

function parseKey (key) {
    const index = key.length - tail.length;
    if (key.substr(index) === tail) {
        return key.substr(0, index);
    }
    return key;
}

function write (key, value) {
    const type = typeof value;
    if (type === 'object') {
        value = JSON.stringify(value);
    } else if (type !== 'string') {
        value = value.toString();
    }
    store.setItem(geneKey(key), `${type}:${value}`);
}

function read (key) {
    const value = store.getItem(geneKey(key));
    return parseValue(value);
}

function parseValue (value) {
    if (value === null) {
        return null;
    }
    const splitIndex = value.indexOf(':');
    let type = 'string';
    if (splitIndex !== -1) {
        const readType = value.substr(0, splitIndex);
        if (['string', 'number', 'boolean', 'object', 'undefined'].indexOf(readType) !== -1) {
            type = readType;
            value = value.substr(splitIndex + 1);
        }
    }
    if (type === 'number') {
        return parseFloat(value);
    } if (type === 'boolean') {
        return value === 'true';
    } if (type === 'object') {
        return parseJSON(value);
    }
    return value;
}

function readAll () {
    const obj = {};
    Object.keys(store).forEach((item) => {
        obj[item] = store.getItem(item);
    });
    return obj;
}

function remove (key) {
    store.removeItem(geneKey(key));
}

function clear () {
    Object.keys(store).forEach((item) => {
        store.removeItem(item);
    });
}

export default function storage (key, value) {
    if (typeof key === 'object' && key !== null) {
        for (const k in key) storage(k, key[k]);
        return;
    }
    if (typeof value === 'undefined') {
        if (typeof key === 'undefined') return readAll();
        if (key === null) clear();
        else return read(key);
    } else if (value === null) remove(key);
    else write(key, value);
}

storage.useLocalStorage = useLocalStorage;
storage.useSessionStorage = useSessionStorage;
storage.read = read;
storage.readAll = read;
storage.write = write;
storage.remove = remove;
storage.clear = clear;
storage.parseValue = parseValue;
storage.parseKey = parseKey;

window.storage = storage;