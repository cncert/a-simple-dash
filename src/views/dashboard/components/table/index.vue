<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="hostInfoListCom"
      element-loading-text="加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="IP">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="序列号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内存" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      hostInfoList: [],
      listLoading: true
    }
  },
  created() {
    this.listLoading = false
  },
  computed: {
    userId: function () {
      return this.$store.getters.userId
    },
    hostInfoListCom: function () {
      if(JSON.stringify(this.$store.getters.hostInfo) == "{}"){
        console.log("FFFFFFFFFFFFFF")
      }else{
        let _info = {}
        let remoteHostInfo = this.$store.getters.hostInfo.status
        for(var key in remoteHostInfo){
          if(JSON.stringify(remoteHostInfo[key]) !== "{}"){
            _info = remoteHostInfo
            _info["status"] = "success"
          }else{
            _info["status"] = "fail"
          }
        }
        this.hostInfoList.unshift(this.$store.getters.hostInfo.status)
      }
      console.log(this.$store.getters.hostInfo.status)
      return this.hostInfoList
    },
  },
  methods: {
  }
}
</script>
