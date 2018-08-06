<template>
  <div>
    <div class="manage-area-main-inner-box" v-show="!isDone">
      <el-form>
        <el-form-item label="案件节点">
          <el-select v-model="handleNode" placeholder="请选择">
            <el-option
              v-for="item in nodeOptions"
              :key="item.valueCode"
              :label="item.valueChineseName"
              :value="item.valueCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理意见">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="handleRemark"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="submitInfo" class="w">提交</el-button>
    </div>

    <el-form class="manage-area-main-inner-box" v-for="item in taskList">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>{{item.handleNodeName}}</h2>
      <el-form-item label="处理人">{{item.handleBy}}</el-form-item>
      <el-form-item label="处理时间">{{item.startTime | dateFormat}}</el-form-item>
      <el-form-item label="处理建议">{{item.handleRemark}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
  import baseData from "../data/baseData";
  import _ from "underscore";

  export default {
    name: 'Node',

    data(){
      return {
        isDone: false,
        handleNode: '',
        handleRemark: '',
        taskList: [],
        nodeOptions: []
      }
    },

    mounted () {
      // 检查登陆状态
      if (!this.checkLogin()) return;
      // 查询角色操作明细
      this.queryNode();
      // 初始化下拉框
      this.initNodeOptions();
    },

    methods: {
      initNodeOptions() {
        if (this.loginInfo.roleStr === '4') {
          // 律师角色，只能选择结案或者废弃
          this.nodeOptions = _.filter(baseData.node, item => {
            return _.contains(['99', '00'], item.valueCode);
          });
        } else if (this.loginInfo.roleStr === '1') {
          // 管理员，可以操作任何状态
          this.nodeOptions = _.filter(baseData.node, item => {
            return !_.contains(['01'], item.valueCode);
          });
        } else {
          // 操作员，不能结案
          this.nodeOptions = _.filter(baseData.node, item => {
            return !_.contains(['01', '00'], item.valueCode);
          });
        }
      },
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

      queryNode() {
        const url =  window.SERVE_URl + 'queryReportDetail';
        let param = {
          "report_no": this.loginInfo.reportNo,
          "userName":  this.loginInfo.userName,
          "tokens": this.loginInfo.tokens,
          company_code: this.loginInfo.company_code
        };

        let ld = this.loading('案件信息中…');
        this.$http.post(url, param).then(res => {
          ld.close();

          this.taskList = res.data.result.taskList;
          if (!this.taskList) return;

          this.taskList.forEach(task => {
            var item = _.findWhere(baseData.node, {valueCode: task.handleNode}) || {};
            task.handleNodeName = item.valueChineseName;
          });

          // 是否包含完结
          this.isDone = !!this.taskList.filter(task => {
            return task.handleNode === '00';
          }).length;
        }, error => {
          ld.close();
          this.$message.error('案件信息中查询异常');
          console.error(error.data.message);
        });
      },

      submitInfo () {
        // 翻转状态
        const url =  window.SERVE_URl + 'sendTask';
        let param = {
          "handleNode": this.handleNode,
          "remark": this.handleRemark,
          "reportNo": this.loginInfo.reportNo,
          "tokens": this.loginInfo.tokens,
          "userName": this.loginInfo.userName,
          "taskId": this.loginInfo.taskId,
          company_code: this.loginInfo.company_code
        };

        let ld = this.loading('提交中…');
        this.$http.post(url, param).then(res => {
          ld.close();
          if ('ok' === res.data.status) {
            this.$message.success('提交成功');
            // 前往首页
            // this.$router.push('Home');
            this.queryNode();
          } else {
            this.$message.error(res.data.result);
          }
        }, error => {
          ld.close();
          this.$message.error('系统异常');
          console.error(error.data.message);
        });
      },
    },

    filters: {
      dateFormat(date){
        // 意外日期
        try {
          return date.slice(0, 10) + ' ' + date.slice(11, 19);
        } catch (e) {
          return date;
        }
      }
    }
  }
</script>
