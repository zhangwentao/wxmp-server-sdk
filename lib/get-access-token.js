"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const https_1 = require("https");
const constants_1 = require("./constants");
const grant_type = 'client_credential';
const getAccessToken = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { appid, secret } = params;
    return new Promise((resolve, reject) => {
        (0, https_1.get)(`${constants_1.URL.accessToken}?grant_type=${grant_type}&appid=${appid}&secret=${secret}`, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    const { access_token, expires_in } = parsedData;
                    resolve({
                        access_token,
                        expires_in
                    });
                }
                catch (e) {
                    reject(e.message);
                }
            });
        });
    });
});
exports.getAccessToken = getAccessToken;
