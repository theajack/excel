/*
 * @Author: tackchen
 * @Date: 2021-12-26 17:26:32
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-27 08:39:01
 * @FilePath: /excel/src/lib/biz/import.js
 * @Description: Coding something
 */

import {readExcelFile} from '../excel';
import {excelNames} from '../store/store';
import {initOriginData} from './excel';

export async function importExcels ({files, mainKey = '序号'}) { // todo 主键
    return new Promise((resolve) => {
        console.log(files);
        const size = files.length;
        let index = 0;

        const excelData = {};
        const addIntoExcelData = (data) => {
            data.forEach(item => {
                const mainKeyValue = item[mainKey];
                if (excelData[mainKeyValue]) {
                    excelData[mainKeyValue] = Object.assign(excelData[mainKeyValue], item);
                } else {
                    excelData[mainKeyValue] = item;
                }
            });
        };

        const headers = [];
        const addIntoHeader = (header) => {
            header.forEach(item => {
                if (headers.indexOf(item) === -1 && item.indexOf('UNKNOWN') !== 0) {
                    headers.push(item);
                }
            });
        };

        const onResult = (data) => {
            console.log(data.data);
            addIntoExcelData(data.data);
            addIntoHeader(data.header);
            index ++;
            if (index >= size) {
                const finalData = Object.values(excelData);
                resolve({
                    data: finalData,
                    header: headers
                });
            }

        };
        for (const k in files) {
            if (files[k] instanceof File) {
                importSingleExcel(files[k], onResult);
            }
        }
    });
}

async function importSingleExcel (file, onResult) {
    const results = await readExcelFile(file);
    results.forEach(single => {
        onResult(single);
    });
}

export function clearImportedExcels () {
    excelNames.list = [];
    initOriginData([]);
}