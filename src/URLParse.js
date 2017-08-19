/**
 * 解析URL查询参数（?）
 * @param [url]
 * @returns {*}
 */
const getQueryParams = url => {
    if (!url) {
        return nll;
    }

    let t = url.split('?');
    let search = t[1] || t[0];

    let map = {};
    let arr = search.split('&');

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let kv = item.split('=');
        let k = kv[0];
        if (map.hasOwnProperty(k)) {
            if (map[k] instanceof Array) {
                map[k] = [...map[k], kv[1]];
            }
            else {
                map[k] = [map[k], kv[1]];
            }
        }
        else {
            map[k] = kv[1];
        }
    }

    return map;
};

export default {
    getQueryParams,
};

