
/**
 * 是否支持触摸
 * @returns {boolean}
 */
const isSupportTouch = () => {
    return ('ontouchstart' in document.documentElement);
};

/**
 * 是否为短日期格式
 * @param {string} date 日期字符串
 * @param {boolean} [ignoreWhite] 是否忽略空白
 * @returns {boolean}
 */
const isSmallDate = (date, ignoreWhite) => {
    if (ignoreWhite) {
        if (!date) {
            return true;
        }
        if ((date + '').trim() == '') {
            return true;
        }
    }

    if (!date) {
        return false;
    }

    if (date.replace(' ', 0) == '') {
        return false;
    }

    let r = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    else {
        let d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    }
};

/**
 * 是否为纯数字
 * @param {string|number} number
 * @param {boolean} [ignoreWhite] 是否忽略空白
 * @returns {boolean}
 */
const isNumeric = (number, ignoreWhite) => {
    if (ignoreWhite && (number + '').trim() == '') {
        return true;
    }
    return /^\d+(\.\d+)?$/.test(number.trim());
};

/**
 * 验证数字和字母混合字符串
 * @param {string} value 被验证字符串
 * @param {number} [minLength] 最小长度
 * @param {number} [maxLength] 最大长度
 * @param {boolean} [ignoreWhite] 是否忽略空白
 * @returns {boolean}
 */
const isNumericCharMix = (value, minLength, maxLength, ignoreWhite) => {
    if (ignoreWhite && (value + '').trim() == '') {
        return true;
    }
    let reg = new RegExp('^[0-9A-Za-z]' + this._getLengthReg(minLength, maxLength) + '$');
    return reg.test(value.trim());
};

/**
 * 验证手机号码
 * @param {string} mobilePhone 手机号码
 * @param {boolean} [ignoreWhite] 是否忽略空白
 * @returns {boolean}
 */
const isMobilePhone = (mobilePhone, ignoreWhite) => {
    if (ignoreWhite && mobilePhone.trim() == '') {
        return true;
    }
    let reg = new RegExp('^1([3587]{1}[0-9]{9})$');
    return reg.test(mobilePhone);
};

/**
 * 验证是否为中文
 * @param {string} value
 * @param {number} [minLength] 最小位数
 * @param {number} [maxLength] 最大位数
 * @param {boolean} [ignoreWhite] 是否忽略空白
 * @returns {boolean}
 */
const isChinese = (value, minLength, maxLength, ignoreWhite) => {
    if (ignoreWhite && value.trim() == '') {
        return true;
    }
    let chsReg = new RegExp('^[\u4e00-\u9fa5]' + this._getLengthReg(minLength, maxLength) + '$');
    return chsReg.test(value);
};

/**
 * 匹配字符串长度
 * @param {string} value
 * @param {number} [minLength] 最小长度
 * @param {number} [maxLength] 最大长度
 * @param {boolean} [ignoreWhite] 是否忽略空白
 * @returns {boolean}
 */
const matchLength = (value, minLength, maxLength, ignoreWhite) => {
    if (ignoreWhite && value.trim() == '') {
        return true;
    }
    let reg = new RegExp('^[\\s\\S]' + this._getLengthReg(minLength, maxLength) + '$');
    return reg.test(value);
};

/**
 * 获取匹配长度表达式
 * @param {number} [minLength] 最小长度
 * @param {number} [maxLength] 最大长度
 * @returns {string} 匹配长度正则表达式
 * @private
 */
const _getLengthReg = (minLength, maxLength) => {
    let len = '*';
    if (minLength && maxLength) {
        len = '{' + minLength + ',' + maxLength + '}';
    }
    if (minLength && !maxLength) {
        len = '{' + minLength + ',}';
    }
    if (!minLength && maxLength) {
        len = '{,' + maxLength + '}';
    }

    return len;
};

export default {
    isSupportTouch,
    isSmallDate,
    isNumeric,
    isNumericCharMix,
    isMobilePhone,
    isChinese,
    matchLength,
};

