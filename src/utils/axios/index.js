import axios from "axios";
import _Error from "../error";

let cancelList = [];

const CancelToken = axios.CancelToken;
let token = document.getElementsByName("_csrf")[0].getAttribute("content");
let header = document
  .getElementsByName("_csrf_header")[0]
  .getAttribute("content");
axios.defaults.headers.common[header] = token;
//1,创建axios实例
// 为什么要实现axios的实例来创建请求，而不是使用全局的axios
// 因为可能一个项目可以有多个域的请求，那么一个全局的axios就无法满足要求了
// 根据不用的模块创建不同的axios实例
const instance = axios.create({
  // 请求时会拼接baseurl
  baseURL: "/",
  // 超时毫秒数
  timeout: 10000,
});

// 2,axios的拦截器
// 2.1,请求拦截的作用
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求

    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

    // 3.某些网络请求,必须携带一些特殊的信息

    // 放行
    return config;
  },
  (err) => {
    // 一般网络异常之类的错误才会进入这里
    console.log(err);
  }
);
// 2.2,响应拦截
instance.interceptors.response.use(
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
    if (axios.isCancel(error)) {
    } else {
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
    return Promise.reject(error);
  }
);

export default {
  get(url, opts) {
    opts = opts || {};
    opts.cancelToken = new CancelToken(function executor(callback) {
      cancelList.push(callback);
    });
    return axios.get(url, opts);
  },
  post(url, opts) {
    opts = opts || {};
    opts.cancelToken = new CancelToken(function executor(callback) {
      cancelList.push(callback);
    });
    return axios.post(url, opts);
  },
  cancel() {
    cancelList.forEach((item) => item());
    cancelList = [];
  },
};
