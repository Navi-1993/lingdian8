import Interceptor from "./core/interceptor";
import Request from "./index";

export const globalInterceptor = {
  request: new Interceptor(),
  response: new Interceptor()
};

/**
 * 全局配置
 * 只能配置 静态数据
 * `content-type` 默认为 application/json
 * `header` 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
  baseURL: "www.baidu.com", // 请求的基础url
  header: { // 设置请求头
    // 'X-Auth-Token': 'xxxx',
    contentType: "application/x-www-form-urlencoded"
    // 'Content-Type': 'application/json'
  }
};

/**
 * @Description: 全局 请求拦截器
 * @param {Object} config 发送请求的配置数据
 * @return: config 继续发送请求
 * @return: false 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * @return: Promise.reject('xxxxx') 停止发送请求, 会错误数据拦截，也会进入catch函数中
 */
globalInterceptor.request.use(
  config => {
    console.log('is global request interceptorA')

    return config;
  },
  err => {
    console.error("is global fail request interceptor: ", err);
    return false;
  }
);

/**
 * @Description: 全局 响应拦截器, 支持添加多个拦截器 例如: 根据状态码选择性拦截、过滤转换数据
 * @param {type} 
 * @param {Object} res 请求返回的数据
 * @param {Boolean} false 发送请求的配置数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>} 返回错误信息, 会错误数据拦截，也会进入catch函数中
 */
globalInterceptor.response.use(
  (res, config) => {
    return res;
  },
  (err, config) => {
    console.error("is global response fail interceptor");
    console.error("err: ", err);
    console.error("config: ", config);

    return Promise.reject(err);
  }
);
