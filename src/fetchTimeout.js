export const fetchTimeout = (fetchPromise, timeout = 6000) => {
    let abortFunc = null;
    let abortPromise = new Promise((resolve, reject) => {
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

