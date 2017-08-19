/**
 * 存储类型
 */
const type = {
    /**
     * 本地存储
     */
    localStorage: 'localStorage',
    /**
     * 本地SESSION存储
     */
    sessionStorage: 'sessionStorage'
};

/**
 * 存储键值对
 * @param {String} key 存储键
 * @param {Object} value 值，存储时统一转换成字符串
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
*/
const setItem = (key, value, storageType = type.sessionStorage) => {
    window[storageType].setItem(key, JSON.stringify(value));
}

/**
 * 获取存储键值
 * @param {String} key 存储键
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
 * @returns {String}
 */
const getItem = (key, storageType = type.sessionStorage) => {
    return window[storageType].getItem(key);
}

/**
 * 获取存储键JSON对象
 * @param {String} key 存储键
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
 * @returns {Object} JSON对象
 */
const getItemToJson = (key, storageType = type.sessionStorage) => {
    return JSON.parse(getItem(key, storageType));
}

/**
 * 清除指定键值
 * @param {String} key 缓存键
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
 */
const removeItem = (key, storageType = type.sessionStorage) => {
    window[storageType].removeItem(key);
}

/**
 * 浏览器缓存
 */
export default {
    type,
    setItem,
    getItem,
    getItemToJson,
    removeItem,
}
