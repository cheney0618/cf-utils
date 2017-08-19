export const fetchTimeout = (fetchPromise, timeout) => {
    let abortFunc = null;
    let abortFromise = new Promise((resolve, reject) => {
        abortFunc = msg => {
            reject(msg || 'timeout');
        }
    });

    let abortablePromise = Promise.race([
        fetchPromise,
        abortPromise,
    ]);

    setTimeout(() => abortFunc(), timeout);

    return abortablePromise;
};

