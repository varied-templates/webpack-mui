import qs from 'qs';
{{#if_eq hasHotUpdate "Yes"}}
import {
  Toast,
  Dialog
} from 'vant';
{{/if_eq}}
const post = (url, data) => {
  data = qs.stringify(data);
  {{#if_eq hasHotUpdate "Yes"}}
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '加载中',
  });
  {{/if_eq}}
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production' && process.env.IOS) {
      mui.plusReady(function () {
        mui.ajax(url, {
          data,
          dataType: 'json', //服务器返回json格式数据
          type: 'post', //HTTP请求类型
          timeout: 10000, //超时时间设置为10秒；
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: localStorage.getItem("user_token")
          },
          success: function (resData) {
            {{#if_eq hasHotUpdate "Yes"}}
            Toast.clear();
            {{/if_eq}}
            if (resData.code === 1 || resData.code === '1') {
              resolve(resData.data);
            } else {
              {{#if_eq hasHotUpdate "Yes"}}
              Dialog.alert({
                message: resData.msg,
              }).then(() => {
                // on close
                reject(resData.msg);
              });
              {{/if_eq}}
              {{#if_eq hasHotUpdate "No"}}
              reject(resData.msg);
              {{/if_eq}}
            }
          },
          error: function (xhr, type, errorThrown) {
            {{#if_eq hasHotUpdate "Yes"}}
            Toast.clear();
            Dialog.alert({
              message: xhr.statusText,
            }).then(() => {
              // on close
              reject(xhr);
            });
            {{/if_eq}}
            {{#if_eq hasHotUpdate "No"}}
            reject(xhr);
            {{/if_eq}}
          }
        });
      });
    } else {
      mui.ajax(url, {
        data,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          token: localStorage.getItem("user_token")
        },
        success: function (resData) {
          {{#if_eq hasHotUpdate "Yes"}}
          Toast.clear();
          {{/if_eq}}
          if (resData.code === 1 || resData.code === '1') {
            resolve(resData.data);
          } else {
            {{#if_eq hasHotUpdate "Yes"}}
            Dialog.alert({
              message: resData.msg,
            }).then(() => {
              // on close
              reject(resData.msg);
            });
            {{/if_eq}}
            {{#if_eq hasHotUpdate "No"}}
            reject(resData.msg);
            {{/if_eq}}
          }
        },
        error: function (xhr, type, errorThrown) {
          {{#if_eq hasHotUpdate "Yes"}}
          Toast.clear();
          Dialog.alert({
            message: xhr.statusText,
          }).then(() => {
            // on close
            reject(xhr);
          });
          {{/if_eq}}
          {{#if_eq hasHotUpdate "No"}}
          reject(xhr);
          {{/if_eq}}
        }
      });
    }
  });
};
export default {
  post
};
