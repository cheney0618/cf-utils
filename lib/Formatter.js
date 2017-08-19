'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 格式化百分比
 * @param {Number} number 值
 * @param {Number} [fractionSize] 保留小数位数
 * @param {Object} [options] 可选项
 * @param {Boolean} [options.showDash] 空值或无效值是否显示'-', 默认为true
 * @returns {*}
*/
var toPercent = function toPercent(number, fractionSize, options) {
    var opt = _extends({
        showDash: true
    }, options);

    if (number == null || number == undefined || isNaN(number) || !isFinite(number)) {
        if (opt.showDash) {
            return '-';
        }
        return number;
    }

    fractionSize = fractionSize || 2;

    return (number * 100).toFixed(fractionSize).toString() + '%';
};

/**
 * 格式化价格
 * @param {Number} price 价格
 * @param {Object} [options] 可选项 
 * @param {Number} [options.fractionSize] 保留小数位数，默认不保留小数
 * @param {Number} [options.exchangeRate] 换算比率，默认价格按分换算为元
 * @param {String} [options.unitName] 单位名称，默认为空
 * @param {String} [options.currency] 货币符号，默认为空
 * @returns {*}
 */
var toPrice = function toPrice(number, options) {
    var opt = _extends({
        fractionSize: 0,
        exchangeRate: 100,
        unitName: '',
        currency: ''
    }, options);

    if (isNaN(number) || !isFinite(number)) {
        return number;
    }

    // 金额从服务器获取的均以分为单位，按单位换算到目标单位
    number /= opt.exchangeRate;

    var currency = opt.currency;
    if (opt.unitName != '') {
        currency = '';
    }

    return currency + toThousand(number, opt.fractionSize) + opt.unitName;
};

/**
 * 格式化价格，无效价格用“-”表示
 * @param {Number} price 价格
 * @param {Object} [options] 可选项 
 * @param {Number} [options.fractionSize] 保留小数位数，默认保留两位小数
 * @param {Number} [options.exchangeRate] 换算比率，默认价格按分换算为元
 * @param {String} [options.unitName] 单位名称，默认为空
 * @param {String} [options.currency] 货币符号，默认为人民币符号：￥
 * @param {Boolean} [options.includeZero] 0值是否显示为“-”，默认为true
 * @returns {*}
 */
var toPriceDash = function toPriceDash(number, options) {
    var opt = _extends({
        fractionSize: 2,
        exchangeRate: 100,
        unitName: '',
        includeZero: true,
        currency: '￥'
    }, options);

    if (!number || isNaN(number) || !isFinite(number) || number == 0 && opt.includeZero) {
        return '-';
    }

    return toPrice(number, opt);
};

/**
 * 千份位格式化
 * @param {Number} number 数字
 * @param {Number} [precision] 精度（保留小数位置）
 * @returns {*}
 */
var toThousand = function toThousand(number, precision) {
    if (precision <= 0) {
        precision = 0;
    } else {
        precision = precision || 2;
    }

    var toFixed = function toFixed(value, precision) {
        var power = Math.pow(10, precision);
        return (Math.round(value * power) / power).toFixed(precision);
    };

    number = toFixed(number, precision);

    var num = number + "";
    num = num.replace(new RegExp(",", "g"), "");
    // 正负号处理
    var symbol = "";
    if (/^([-+]).*$/.test(num)) {
        symbol = num.replace(/^([-+]).*$/, "$1");
        num = num.replace(/^([-+])(.*)$/, "$2");
    }

    if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
        var num = num.replace(new RegExp("^[0]+", "g"), "");
        if (/^\./.test(num)) {
            num = "0" + num;
        }

        var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
        var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");

        var re = /(\d+)(\d{3})/;

        while (re.test(integer)) {
            integer = integer.replace(re, "$1,$2");
        }
        return symbol + integer + decimal;
    } else {
        return number;
    }
};

/**
 * 格式化
 */
exports.default = {
    toPercent: toPercent,
    toPrice: toPrice,
    toPriceDash: toPriceDash,
    toThousand: toThousand
};