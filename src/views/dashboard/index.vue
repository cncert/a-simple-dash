/* eslint-disable */
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <div>home {{ text }}</div>
      <div>websocket状态: {{ webStatus }}</div>
      <div>userId {{ userId }}</div>
      <div>主机信息 {{ hostInfo }}</div>
      <div @click="sendSocketMsg">
        <button>执行任务</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { longTask } from "@/api/task";
import VueSocketio from "vue-socket.io";
import { thisExpression } from "@babel/types";

export default {
  name: "Dashboard",
  data() {
    return {
      text: "这是首页",
      hostInfo: ""
    };
  },
  computed: {
    ...mapGetters([
      "name",
      "webStatus",
      "userId"
      // mapGetters作用：将getters.js中定义的变量导入到当前computed中,在template中可以直接使用这个变量
    ])
  },
  mounted() {},
  methods: {
    sendSocketMsg() {
      console.log(this.$socket.connected);
      if (!this.$store.getters.webStatus) {
        window.location.reload();
      } else {
        let sendData = {
          elementid: "progressid",
          userid: this.$store.getters.userId,
          ansible_module_name: "setup",
          ansible_module_args: ""
        };
        longTask(sendData)
          .then(response => {
            const data = response;
            console.log(data);
            resolve(data); //resolve的意思就是：我们期望Promise返回的数据，类似于return
          })
          .catch(error => {});
      }
    }
  },
  sockets: {
    celerystatus: function(hostInfo) {
      this.hostInfo = hostInfo;
    },
    userid: function(data) {
      // 通过dispatch触发actions，actions进而触发mutations，最终修改state,
      // 其中，下边的type是指定的actions，user是存放actions的文件，changeUserId是action的名字
      this.$store.dispatch({ type: "user/changeUserId", datas: data });
    },
    status: function(data) {
      console.log(data);
      this.$store.dispatch({ type: "user/changeStatus", status: data.status });
    },
    connect: function(data) {
      this.$socket.emit("status", { status: "client connected" });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
