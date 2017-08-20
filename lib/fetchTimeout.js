'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fetchTimeout = exports.fetchTimeout = function fetchTimeout(fetchPromise) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6000;

    var abortFunc = null;
    var abortPromise = new Promise(function (resolve, reject) {
        abortFunc = function abortFunc(msg) {
            reject({
                status: 408,
                statusText: msg || 'timeout'
            });
        };
    });

    var abortablePromise = Promise.race([fetchPromise, abortPromise]);

    setTimeout(function () {
        return abortFunc();
    }, timeout);

    return abortablePromise;
};