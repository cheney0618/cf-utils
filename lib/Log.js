'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var logInfo = function logInfo(api, data, res) {
    console.groupCollapsed(api);
    console.log('REQUEST: ', data);
    console.log('RESPONSE: ', res);
    console.groupEnd(api);
};

var logError = function logError(api, data, res) {
    console.groupCollapsed(api);
    console.log('REQUEST: ', data);
    console.error('RESPONSE: ', res);
    console.groupEnd(api);
};

var logWarning = function logWarning(api, data, res) {
    console.groupCollapsed(api);
    console.log('REQUEST: ', data);
    console.warn('RESPONSE: ', res);
    console.groupEnd(api);
};

exports.default = {
    use: function use(api, data, res) {
        if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) != 'object' || !res.hasOwnProperty('code') && !res.hasOwnProperty('Code')) {
            logWarning(api, data, res);
            return;
        }

        if (res.code == 0 || res.Code == 0) {
            logInfo(api, data, res);
        } else {
            logError(api, data, res);
        }
    }
};