const logInfo = (api, data, res) => {
    console.groupCollapsed(api);
    console.log('REQUEST: ', data);
    console.log('RESPONSE: ', res);
    console.groupEnd(api);
}

const logError = (api, data, res) => {
    console.groupCollapsed(api);
    console.log('REQUEST: ', data);
    console.error('RESPONSE: ', res);
    console.groupEnd(api);
}

const logWarning = (api, data, res) => {
    console.groupCollapsed(api);
    console.log('REQUEST: ', data);
    console.warn('RESPONSE: ', res);
    console.groupEnd(api);
}

export default {
    use: (api, data, res) => {
        if (typeof res != 'object' || (!res.hasOwnProperty('code') && !res.hasOwnProperty('Code'))) {
            logWarning(api, data, res);
            return;
        }

        if (res.code == 0 || res.Code == 0) {
            logInfo(api, data, res);
        } else {
            logError(api, data, res);
        }
    }
};


