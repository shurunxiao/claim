<template>
  <div>
    <el-form class="manage-area-main-inner-box">
      <el-input v-model="reportName" placeholder="模糊检索案件名称" class="mr-20"></el-input>
      <el-input v-model="handleBy" placeholder="模糊检索处理人" class="mr-20" v-show="this.loginInfo.roleStr === '1'"></el-input>

      <el-button type="primary" @click="queryTask">查询</el-button>
    </el-form>

    <div class="manage-area-main-inner-box">
      <el-table
        :data="taskList"
        class="w">
        <el-table-column
          prop="businessKey"
          sortable
          label="理赔案件编号">
        </el-table-column>
        <el-table-column
          prop="reportName"
          sortable
          label="案件名称">
        </el-table-column>
        <el-table-column
        prop="startTime"
        sortable
        label="案件时间">
        </el-table-column>
        <el-table-column
          prop="updatedDate"
          sortable
          label="最近更新时间">
        </el-table-column>
        <el-table-column
          prop="handleNodeName"
          label="案件节点">
        </el-table-column>
        <el-table-column
          prop="handleBy"
          label="处理人">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookReport(scope.row, scope.$index)">查看</el-button>
            <el-button type="text" size="small" v-show="loginInfo.roleStr === '1'" @click="deleteReport(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import baseData from "../data/baseData";
  import _ from "underscore";

  export default {
    name: 'TaskListForEnd',
    data(){
      return {
        loginInfo: {},
        reportName: '',
        handleBy: '',
        taskList: []
      }
    },
    mounted () {
      // 检查登陆状态
      if (!this.checkLogin()) return;
      // 查询未结案任务列表
      this.queryTask();
    },
    methods: {
      checkLogin () {
        let loginInfo = sessionStorage.getItem('loginInfo');
        if (loginInfo) {
          this.loginInfo = JSON.parse(loginInfo);
          return true;
        } else {
          this.$message.error('请重新登陆，谢谢');
          this.$router.push({name: 'Login'});
          return false;
        }
      },

      loading(text) {
        return this.$loading({
          lock: true,
          text: text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },

      queryTask(){
        var url = window.SERVE_URl + 'getTaskListForEnd';
        var param = {
          "userName": this.loginInfo.userName,
          "userId": 0,
          "tokens": this.loginInfo.tokens,
          company_code: this.loginInfo.company_code,
          handeby: this.handleBy,
          reportName: this.reportName
        };

        let ld = this.loading('任务查询中…');
        this.$http.post(url, param).then(res => {
          ld.close();

          this.taskList = res.data.result;
          if (_.isEmpty(this.taskList)) return null;

          this.taskList.forEach(item => {
            if (!item) return;

            try {
              item.startTime = item.startTime && item.startTime.slice(0, 10) + ' ' + item.startTime.slice(11, 19);
              item.updatedDate = item.updatedDate && item.updatedDate.slice(0, 10) + ' ' + item.updatedDate.slice(11, 19);
            } catch (e) {}

            if (!item.handleNode) return;
            var task = _.findWhere(baseData.node, {valueCode: item.handleNode}) || {};
            item.handleNodeName = task.valueChineseName;
          });
        }, error => {
          ld.close();
          this.$message.error('任务查询异常');
          console.error(error.data.message);
        });
      },
      lookReport(task) {
        this.loginInfo.reportNo = task.businessKey;
        this.loginInfo.taskId = task.taskId;
        sessionStorage.setItem('loginInfo', JSON.stringify(this.loginInfo));
        this.$router.push('Query');
      },

      deleteReport(task, index){
        this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url = window.SERVE_URl + 'deleteReport';
          var param = {
            "userName": this.loginInfo.userName,
            "userId": 0,
            "tokens": this.loginInfo.tokens,
            company_code: this.loginInfo.company_code,
            reportNo: task.businessKey,
            taskId: task.taskId
          };

          let ld = this.loading('任务删除中…');
          this.$http.post(url, param).then(res => {
            ld.close();
            if ('ok' === res.data.status) {
              this.$message.success('任务删除成功');
              // 重新查询任务列表
              this.queryTask();
            } else {
              this.$message.error(res.data.result);
            }
          }, error => {
            ld.close();
            this.$message.error('任务删除异常');
            console.error(error.data.message);
          });
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      }
    }
  }

</script>
