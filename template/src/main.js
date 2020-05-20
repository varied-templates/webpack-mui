// webpack 打包入口文件
/**
 * !!! 如果你在生成应用时选择了组件，模板已经按照按需引入模式进行配置，您无需再次全局引入，否则会冲突
 * import { Button } from 'simple-mobile'; 在需要的地方 import 需要的组件就好了
 * 具体请参考 http://huangwanneng.cn/#/quickstart 按需引入章节
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import http from './utils/http';

Vue.prototype.$http = http; // 引入前后端交互工具
{{#if_eq hasHotUpdate "Yes"}}
import {
  Progress,
  Dialog,
} from 'vant';
Vue.use(Progress).use(Dialog);
{{/if_eq}}
// 开始创建Vue实例
new Vue({
  el: '#app',
  components: { App },
  router, // 注入路由
  template: '<App />',
  data: {
    addList: null,
    editAdd: null,
    selectedAdd: null,
    deliverType: 'inStore',
  },
});
