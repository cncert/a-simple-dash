/* eslint-disable */
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <div>home {{ text }}</div>
      <div @click="sendSocketMsg">
        <button>发socket信息</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      text: "这是首页"
    };
  },
  computed: {
    ...mapGetters([
      "name"
      // mapGetters作用：将getters.js中定义的变量导入到当前computed中,在template中可以直接使用这个变量
    ])
  },
  mounted() {
    // 触发后台socket事件
    // this.$socket.emit("/api/ansible_task", {
    //   elementid: "progressid",
    //   userid: "userId",
    //   ansible_module_name: "setup",
    //   ansible_module_args: ""
    // });
    // // 添加socket事件监听
    // this.sockets.subscribe("clientEventMessage", data => {
    //   console.log(data);
    // });
  },
  methods: {
    sendSocketMsg() {
      this.$http({
        method: "post",
        url: "http://127.0.0.1:5000/api/ansible_task",
        data: {
          elementid: "progressid",
          userid: "userId",
          ansible_module_name: "setup",
          ansible_module_args: ""
        }
      });
    },
    ...mapActions(["changeUserId"])
  },
  sockets: {
    celerystatus: function(data) {
      console.log(data);
    },
    userid: function(data) {
      console.log("socket connected");
      console.log(data);
      this.$store.dispatch("user/changeUserId", { data: data });
      console.log(this.$store.state);
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
