'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 存储类型
 */
var type = {
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
var setItem = function setItem(key, value) {
  var storageType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : type.sessionStorage;

  window[storageType].setItem(key, JSON.stringify(value));
};

/**
 * 获取存储键值
 * @param {String} key 存储键
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
 * @returns {String}
 */
var getItem = function getItem(key) {
  var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : type.sessionStorage;

  return window[storageType].getItem(key);
};

/**
 * 获取存储键JSON对象
 * @param {String} key 存储键
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
 * @returns {Object} JSON对象
 */
var getItemToJson = function getItemToJson(key) {
  var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : type.sessionStorage;

  return JSON.parse(getItem(key, storageType));
};

/**
 * 清除指定键值
 * @param {String} key 缓存键
 * @param {String} [storageType] 存储类型：Cache.TYPE定义类型
 */
var removeItem = function removeItem(key) {
  var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : type.sessionStorage;

  window[storageType].removeItem(key);
};

/**
 * 浏览器缓存
 */
exports.default = {
  type: type,
  setItem: setItem,
  getItem: getItem,
  getItemToJson: getItemToJson,
  removeItem: removeItem
};