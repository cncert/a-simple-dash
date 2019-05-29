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
    <dash-table />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { longTask } from "@/api/task";
import VueSocketio from "vue-socket.io";
import { thisExpression } from "@babel/types";
import { constants } from 'fs';
import dashTable from "./components/table"
import io from 'socket.io-client'

export default {
  
  name: "Dashboard",
  data() {
    return {
      text: "这是首页",
      hostInfo: ""
    };
  },
  components: {
    dashTable,
  },
  computed: {
    ...mapGetters([
      "name",
      "webStatus",
      "userId"
      // mapGetters作用：将getters.js中定义的变量导入到当前computed中,在template中可以直接使用这个变量
    ])
  },
  mounted() {
    const iosocket = io.connect(process.env.VUE_APP_WS_API);
    iosocket.emit('connect');
    iosocket.on('status', data =>{
      this.$store.dispatch({ type: "user/changeStatus", status: data.status });
    });
    iosocket.on('userid', data=>{
      console.log(data,"userid")
      this.$store.dispatch({ type: "user/changeUserId", datas: data });
    });
    iosocket.on('celerystatus', data=>{
      console.log(data,"changeHostInfo")
      this.hostInfo = data;
      this.$store.dispatch({ type: "user/changeHostInfo", hostInfo: data });
    })

  },
  methods: {
    sendSocketMsg() {
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
  },
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
