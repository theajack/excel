/*
 * @Author: tackchen
 * @Date: 2021-11-05 00:17:25
 * @LastEditors: tackchen
 * @LastEditTime: 2021-11-20 15:43:00
 * @FilePath: /admin/src/lib/excel.js
 * @Description: Coding something
 */
import XLSX from 'xlsx';

export function readExcelFile (file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = e => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetNames = workbook.SheetNames;
            resolve(sheetNames.map((sheetName) => {
                const worksheet = workbook.Sheets[sheetName];
                return {
                    sheetName,
                    header: getHeaderRow(worksheet),
                    data: XLSX.utils.sheet_to_json(worksheet)
                };
            }));
        };
        reader.readAsArrayBuffer(file);
    });
}

function getHeaderRow (sheet) {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C;
    const R = range.s.r;
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];
        let hdr = 'UNKNOWN ' + C;
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
    }
    return headers;
}

export function exportAsExcel (data, header, name) {
    // 数据表格
    const table = [header, ...data];
    // 创建book
    const wb = XLSX.utils.book_new();
    // json转sheet
    const ws = XLSX.utils.json_to_sheet(table, {header: Object.keys(header), skipHeader: true});
    // 设置列宽
    // ws['!cols'] = [
    //     {width: 15},
    //     {width: 15},
    //     {width: 15},
    //     {width: 15},
    //     {width: 10}
    //     // ...
    // ];
    // sheet写入book
    XLSX.utils.book_append_sheet(wb, ws, 'file');
    // 输出
    XLSX.writeFile(wb, `${name || `file${Date.now()}`}.xlsx`);
}
