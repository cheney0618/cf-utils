'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 解析URL查询参数（?）
 * @param [url]
 * @returns {*}
 */
var getQueryParams = function getQueryParams(url) {
    if (!url) {
        return nll;
    }

    var t = url.split('?');
    var search = t[1] || t[0];

    var map = {};
    var arr = search.split('&');

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var kv = item.split('=');
        var k = kv[0];
        if (map.hasOwnProperty(k)) {
            if (map[k] instanceof Array) {
                map[k] = [].concat(_toConsumableArray(map[k]), [kv[1]]);
            } else {
                map[k] = [map[k], kv[1]];
            }
        } else {
            map[k] = kv[1];
        }
    }

    return map;
};

exports.default = {
    getQueryParams: getQueryParams
};