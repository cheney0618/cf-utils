
/**
 * 转换为选择项目列表数据
 * @param list
 * @param valueKey
 * @param labelKey
 * @returns {Array}
 */
const toSelectData = (list, valueKey, labelKey) => {
    if (list instanceof Array) {
        let options = [];
        list.forEach((value, index) => {
            options.push({
                value: value[valueKey] + '',
                label: value[labelKey] + '',
            });
        });
        return options;
    }

    return [];
};

/**
 * 对列表中的指定value转换为列表项对象
 * @param {Array} list 查找的列表
 * @param {Object} value 查找的值
 * @param {string} [key] 查找的属性
 */
const findItem = (list, value, key = 'id', ) => {
    if (!list) {
        return null;
    }

    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.hasOwnProperty(key)) {
            if (item[key] == value) {
                return item[key];
            }
        }
    }

    return null;
}

const findItems = (list, value, key = 'id') => {
    if (!list) {
        return null;
    }

    return list.filter(item => {
        if (!item.hasOwnProperty(key)) {
            return false;
        }
        return item[key] == value;
    });
}

/**
 * 身份证号码转换为身份信息
 * @param {string} identityNumber 身份证号码字符串
 * @returns {*}
 */
const toIdentity = identityNumber => {
    var info = {
        isTrue: false,      // 身份证号是否有效。默认为 false
        birthday: null,     // 出生日期。默认为null
        year: null,         // 出生年。默认为null
        month: null,        // 出生月。默认为null
        day: null,          // 出生日。默认为null
        gender: null,
    };

    if (!identityNumber || 18 != identityNumber.length) {
        info.isTrue = false;
        return info;
    }

    if (18 == identityNumber.length) {
        var year = identityNumber.substring(6, 10);
        var month = identityNumber.substring(10, 12);
        var day = identityNumber.substring(12, 14);
        var p = identityNumber.substring(14, 17);
        var birthday = new Date(year + '-' + month + '-' + day);

        // 这里用getFullYear()获取年份，避免千年虫问题
        var yearCorrection = birthday.getFullYear() != parseFloat(year),
            monthCorrection = birthday.getMonth() != parseFloat(month) - 1,
            dayCorrection = birthday.getDate() != parseFloat(day);

        if (yearCorrection || monthCorrection || dayCorrection) {
            info.isTrue = false;
            return info;
        }

        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];  // 加权因子
        var Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];                         // 身份证验证位值.10代表X

        // 验证校验位
        var sum = 0; // 声明加权求和变量
        var _cardNo = identityNumber.split("");

        if (_cardNo[17].toLowerCase() == 'x') {
            _cardNo[17] = 10;           // 将最后位为x的验证码替换为10方便后续操作
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * _cardNo[i];  // 加权求和
        }
        var i = sum % 11;               // 得到验证码所位置

        if (_cardNo[17] != Y[i]) {
            info.isTrue = false
            return info;
        }

        info.isTrue = true;
        info.birthday = birthday;
        info.year = birthday.getFullYear();
        info.month = birthday.getMonth() + 1;
        info.day = birthday.getDate();
        info.gender = (p % 2 != 0);  // true为男， false为女
    }

    return info;
}

/**
 * 百分利率转换为小数
 * @param value
 * @returns {Number}
 */
const toRate = (value, precision = 8) => {
    return parseFloat((value / 100).toFixed(precision) + '');
}

/**
 * 分转为元
 * @param {Number} value 
 * @param {Number} [exchange] 换算比例
 * @param {Number} [fractionSize] 保留小数位数
 */
const toYuan = (value, exchange = 100, fractionSize = 2) => {
    let k = value / exchange;

    return k.toFixed(fractionSize);
};


export default {
    toSelectData,
    toIdentity,
    toRate,
    toYuan,
    findItem,
    findItems,
}

