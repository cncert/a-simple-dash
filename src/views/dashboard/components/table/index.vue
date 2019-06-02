<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="hostInfoListCom"
      max-height="500"
      element-loading-text="加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="IP" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column>
      <el-table-column label="序列号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.result.success.ansible_product_serial }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内存" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.result.success.total_memory }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.display_status | statusFilter">{{ scope.row.display_status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="异常原因" align="center">
        <template slot-scope="scope">
          {{ scope.row.result | errorFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="耗时" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>4s</span>
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
        success: 'success',
        failed: 'failed',
        unreachable: 'danger'
      }
      return statusMap[status]
    },
    errorFilter(result) {
      if(Object.keys(result.failed).length !== 0){
        return result.failed
      }else if(Object.keys(result.unreachable).length !== 0){
        return result.unreachable
      }
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
        console.log("get default hostinfo")
      }else{
        let _info = {}
        let remoteHostInfo = this.$store.getters.hostInfo
        console.log(Object.keys(remoteHostInfo.result.success).length)
        _info = remoteHostInfo
        if(Object.keys(remoteHostInfo.result.success).length !== 0){
          _info["display_status"] = "success"
        }else if(Object.keys(remoteHostInfo.result.failed).length !== 0){
          _info["display_status"] = "failed"
        }else if(Object.keys(remoteHostInfo.result.unreachable).length !== 0){
          _info["display_status"] = "unreachable"
        }
        this.hostInfoList.unshift(_info)
      }
      return this.hostInfoList
    },
  },
  methods: {
  }
}
</script>
