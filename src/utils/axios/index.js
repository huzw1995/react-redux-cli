import axios from "axios";
import _Error from "../error";

let token = document.getElementsByName("_csrf")[0].getAttribute("content");
let header = document
  .getElementsByName("_csrf_header")[0]
  .getAttribute("content");
axios.defaults.headers.common[header] = token;
const cancelToken = axios.CancelToken;
let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let removePending = (config) => {
  // console.log(config);
  for (let i in pending) {
    if (pending[i].url === axios.defaults.baseURL + config.url) {
      //在当前请求在数组中存在时执行取消函数
      pending[i].f(); //执行取消操作
      //pending.splice(i, 1); 根据具体情况决定是否在这里就把pending去掉
      console.log(pending[i].url);
    }
  }
};
//1,创建axios实例
// 为什么要实现axios的实例来创建请求，而不是使用全局的axios
// 因为可能一个项目可以有多个域的请求，那么一个全局的axios就无法满足要求了
// 根据不用的模块创建不同的axios实例
const http = axios.create({
  // 请求时会拼接baseurl
  baseURL: "/",
  // 超时毫秒数
  timeout: 10000,
});

// 2,axios的拦截器
// 2.1,请求拦截的作用
http.interceptors.request.use(
  (config) => {
    removePending(config); //在一个axios发送前执行一下判定操作，在removePending中执行取消操作
    // console.log(config.url);
    config.cancelToken = new cancelToken(function executor(c) {
      //本次axios请求的配置添加cancelToken
      pending.push({
        // url: config.url,
        url: axios.defaults.baseURL + config.url,
        f: c,
      });
      // console.log(axios.defaults.baseURL+config.url);
      //将本次的url添加到pending中，因此对于某个url第一次发起的请求不会被取消，因为还没有配置取消函数
    });
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2.2,响应拦截
http.interceptors.response.use(
  (response) => {
    let { status, data } = response;
    if (response) {
      if (status && status === 200 && data) {
        if (data.success) {
          return data;
        } else {
          return Promise.reject(new _Error(data));
        }
      } else {
        return Promise.reject(new _Error(data));
      }
    } else {
      return Promise.reject(new _Error("接口没有返回值"));
    }
  },
  (error) => {
    // 返回响应状态码错误时进入
    let response = error.response;
    if (response) {
      let status = response.status;
      if (status === 403) {
        return Promise.reject(new _Error("您没有权限进行此项操作"));
      } else if (status === 404 || status === 502 || status === 504) {
        return Promise.reject(new _Error("网络异常"));
      }
      if ("data" in response) {
        return Promise.reject(new _Error(response.data));
      } else if ("statusText" in response) {
        return Promise.reject(new _Error(response.statusText));
      }
    } else if (e.message === "Network Error") {
      return Promise.reject(new _Error("网络异常"));
    }
  }
);

const get = (url, opts) => {
  opts = opts || {};
  return http({
    url,
    method: "get",
    data: opts,
  });
};

const post = (url, opts) => {
  opts = opts || {};
  return http({
    url,
    method: "post",
    data: opts,
  });
};

export default {
  get,
  post,
};
