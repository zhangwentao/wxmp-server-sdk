"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const https_1 = require("https");
const constants_1 = require("./constants");
const login = (params) => {
    const { appid, secret, code } = params;
    const grant_type = 'authorization_code';
    return new Promise((resolve, reject) => {
        (0, https_1.get)(`${constants_1.URL.jscode2session}?grant_type=${grant_type}&appid=${appid}&secret=${secret}&js_code=${code}`, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                }
                catch (e) {
                    reject(e.message);
                }
            });
        });
    });
};
exports.login = login;
