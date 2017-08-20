export const fetchTimeout = (fetchPromise, timeout = 6000) => {
    let abortFunc = null;
    let abortPromise = new Promise((resolve, reject) => {
        abortFunc = msg => {
            reject({
                status: 408,
                statusText: msg || '请求超时！',
            });
        }
    });

    let abortablePromise = Promise.race([
        fetchPromise,
        abortPromise,
    ]);

    setTimeout(() => abortFunc(), timeout);

    return abortablePromise;
};

