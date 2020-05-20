<template>
  <div class="view-frame">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive == true"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive != true"></router-view>
    {{#if_eq hasHotUpdate "Yes"}}
    <div class='update'>
      <van-dialog v-model="show" :title="title" :showConfirmButton="false">
        <div class="progress">
          <van-progress :percentage="percentage"/>
        </div>
      </van-dialog>
    </div>
    {{/if_eq}}
  </div>
</template>

<script>
  export default {
    name: 'App',
    {{#if_eq hasHotUpdate "Yes"}}
    data() {
      return {
        show: false,
        title: '',
        percentage: 0
      }
    },
    methods: {
      install(task) {
        let self = this;
        plus.runtime.install(task.filename, {
          force: true
        }, function () {
          //完成更新向服务器进行通知
          self.show = false;
          self.$dialog.alert({
            message: '更新完毕，将重启应用！',
          }).then(() => {
            plus.runtime.restart();
          });
        }, function (err) {
          self.show = false;
          self.$dialog.alert({
            title: '安装升级失败',
            message: JSON.stringify(err),
          }).then(() => {
          });
        });
      }
    },
    mounted() {
      let self = this;
      mui.plusReady(function () {
        plus.runtime.getProperty(plus.runtime.appid, function (info) {
          console.log(info.version); //当前安装包的version
          self.$http.post('/api/index/version', {}).then(res => {
            console.log(res);
            if (res > info.version) {
              try {
                self.$dialog.confirm({
                  title: '发现新版本' + res,
                  message: '是否需要现在更新？',
                })
                  .then(() => {
                    self.show = true;
                    let options = {
                      method: "GET"
                    };
                    let dtask = plus.downloader.createDownload('http://dzdj.ybnettech.com/popular.wgt',
                      options);
                    dtask.addEventListener("statechanged", function (task, status) {
                      switch (task.state) {
                        case 1: // 开始
                          self.title = '开始下载';
                          break;
                        case 2: // 已连接到服务器
                          self.title = '链接到服务器';
                          break;
                        case 3: // 已接收到数据
                          self.title = '正在下载';
                          self.percentage = Math.floor(task.downloadedSize / task.totalSize * 100);
                          break;
                        case 4: // 下载完成
                          self.install(task);
                          break;
                      }
                    });
                    dtask.start();
                  })
                  .catch(() => {
                    // on cancel
                  });
              } catch (e) {
                self.show = false;
                console.log(e)
              }
            }
          }).catch(e => {
            console.log(e)
          });
        });
      });
    },
    {{/if_eq}}
  };
</script>
{{#if_eq hasHotUpdate "Yes"}}
<style scoped lang='less'>
  .update {
    .progress {
      padding: 30px 16px;
    }
  }
</style>
{{/if_eq}}
