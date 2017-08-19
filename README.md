# cf-utils

> npm install github:cheney0618/cf-utils#master --save 

## 

名称|类型|描述
--|--|--
fetchTimeout|func|可超时fetch
Formatter|object|格式化
Convert|object|转换
Cache|object|对window默认存储对象封装
URLParse|object|URL地址解析
Log|object|console日志输出


## fetchTimeout

### 参数：

- fetch: fetch Promise对象
- timeout: 超时时间，单位:ms，默认6000

### 示例：
```
import 'isomorphic-fetch';
import { fetchTimeout } from 'cf-utils';

fetchTimeout(fetch('****'), 2000);

```

