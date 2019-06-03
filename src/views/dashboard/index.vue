/* eslint-disable */
<template>
  <div class="dashboard-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6" class="data-self-line-height">
        <div @click="sendSocketMsg">
          <el-button type="primary">获取主机信息</el-button>
        </div>
      </el-col>
      <el-col :span="6" class="data-self-line-height data-self-text-center">
        <div class="data-self-time-font-size">
          <date-times/>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="data-self-webstatus">
          <h2>
            信道状态:
            <el-button
              class="data-self-webstatus-icon"
              v-bind:class="{'data-self-webstatus-icon-color-success':webStatus,'data-self-webstatus-icon-color-failed':!webStatus}"
              circle
              size="medium"
            ></el-button>
          </h2>
        </div>
      </el-col>
    </el-row>
    <dash-table/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { longTask } from "@/api/task";
import VueSocketio from "vue-socket.io";
import { thisExpression } from "@babel/types";
import { constants } from "fs";
import dashTable from "./components/table";
import DateTimes from "./components/timer";
import io from "socket.io-client";

export default {
  name: "Dashboard",
  data() {
    return {
      text: "这是首页",
      hostInfo: "",
      date: new Date()
    };
  },
  components: {
    dashTable,
    DateTimes
  },
  computed: {
    ...mapGetters([
      "name",
      "webStatus",
      "userId" // websocket channel id
      // mapGetters作用：将getters.js中定义的变量导入到当前computed中,在template中可以直接使用这个变量
    ])
  },
  mounted() {
    const iosocket = io.connect(process.env.VUE_APP_WS_API);
    iosocket.emit("connect");
    iosocket.on("status", data => {
      this.$store.dispatch({ type: "user/changeStatus", status: data.status });
    });
    iosocket.on("userid", data => {
      // console.log(data,"userid")
      this.$store.dispatch({ type: "user/changeUserId", datas: data });
    });
    iosocket.on("celerystatus", data => {
      // console.log(data,"changeHostInfo")
      this.hostInfo = data;
      this.$store.dispatch({ type: "user/changeHostInfo", hostInfo: data });
    });
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
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
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
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
.data-self {
  &-webstatus {
    float: right;
    color: #454e56;
  }
  &-webstatus-icon {
    padding-top: 20px;
    padding-bottom: 0px;
  }
  &-webstatus-icon-color-success {
    background-color: #20be4d;
  }
  &-webstatus-icon-color-failed {
    background-color: gray;
  }
  &-line-height {
    line-height: 4em;
  }
  &-text-center {
    text-align: center;
  }
  &-time-font-size {
    font-size: 40px;
  }
}
</style>
