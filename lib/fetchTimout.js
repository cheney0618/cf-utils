'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fetchTimeout = exports.fetchTimeout = function fetchTimeout(fetchPromise, timeout) {
    var abortFunc = null;
    var abortFromise = new Promise(function (resolve, reject) {
        abortFunc = function abortFunc(msg) {
            reject(msg || 'timeout');
        };
    });

    var abortablePromise = Promise.race([fetchPromise, abortPromise]);

    setTimeout(function () {
        return abortFunc();
    }, timeout);

    return abortablePromise;
};