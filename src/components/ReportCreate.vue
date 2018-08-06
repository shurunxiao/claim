<template>
  <div>
    <!--案件信息-->
    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>案件信息</h2>

      <el-form-item label="操作员">
        <el-select v-model="model.handleBy" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.userName"
            :label="item.userName"
            :value="item.userName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="意外日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="model.accidentDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="意外地点">
        <el-input v-model="model.accidentPlace" placeholder="请输入意外地点"></el-input>
      </el-form-item>
      <el-form-item label="详情包括车速、天气、路面情况">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="model.accidentDetail"></el-input>
      </el-form-item>

      <el-form-item label="案件描述">
        <upload :uploadParams="uploadParams" :attachmentList="attachmentList" attachmentType="案件描述"></upload>
      </el-form-item>

      <el-button type="primary" @click="submit" class="w">提交</el-button>
    </el-form>
  </div>
</template>

<script>
  import Upload from './Upload'

  export default {
    name: 'ReportCreate',
    components: {Upload},

    data(){
      return {
        userList: [],

        uploadParams: {
          userName: '',
          tokens: '',
          company_code: '',
          report_no: '',
          disable: false,
          preview: true
        },

        attachmentList: [],

        model: {
            handleBy: '',
            accidentDate: '',
            accidentPlace: '',
            accidentDetail: ''
          }
        };
    },

    mounted () {
      // 检查登陆状态
      if (!this.checkLogin()) return;
      // 查询操作员
      this.queryUserList();

      if (this.$route.params.reportNo) {
        //修改报案信息
        this.queryReportDetail();
      } else {
        // 创建报案号
        this.createReportNo();
      }

      this.uploadParams.userName = this.loginInfo.userName;
      this.uploadParams.tokens = this.loginInfo.tokens;
      this.uploadParams.company_code = this.loginInfo.company_code;
      this.uploadParams.report_no = this.loginInfo.reportNo;
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
      queryUserList() {
        const url =  window.SERVE_URl + 'queryUserList';
        this.$http.post(url, this.loginInfo.company_code).then(res => {

          if (this.loginInfo.roleStr === '1') {
            // 管理员只能分配给操作员1或者律师
            this.userList = res.data.result.filter(item => {
              return item.roleStr === '2' || item.roleStr === '4';
            });
          } else if (this.loginInfo.roleStr === '3') {
            // 操作员2只能分配给管理员
            this.userList = res.data.result.filter(item => {
              return item.roleStr === '1';
            });
          } else {
            this.userList = [];
          }
        }, error => {
          this.$message.error('查询异常');
          console.error(error.data.message);
        });
      },

      queryReportDetail() {
        const url = window.SERVE_URl + 'queryReportDetail';
        var param = {
          "report_no": this.$route.params.reportNo,
          "userName": this.loginInfo.userName,
          "tokens": this.loginInfo.tokens,
          company_code: this.loginInfo.company_code
        };

        var ld = this.loading('案件信息查询中…');
        this.$http.post(url, param).then(res => {
          ld.close();

          this.model.handleBy = this.$route.params.handleBy;
          this.model.accidentDate = res.data.result.reportAccident.accidentDate;
          this.model.accidentPlace = res.data.result.reportAccident.accidentPlace;
          this.model.accidentDetail = res.data.result.reportAccident.accidentDetail;

          this.loginInfo.reportNo = this.$route.params.reportNo;
          this.uploadParams.report_no = this.$route.params.reportNo;

          this.attachmentList = res.data.result.attachmentList || [];
          if (!!this.attachmentList) {
            this.attachmentList.forEach(item => {
              item.name = item.attachmentName;
            });
          }
        }, error => {
          ld.close();
          this.$message.error('案件信息中查询异常');
          console.error(error.data.message);
        });
      },

      createReportNo() {
        const url =  window.SERVE_URl + 'get_reportNo';

        var params = {
          userName: this.loginInfo.userName,
          tokens: this.loginInfo.tokens,
          company_code: this.loginInfo.company_code
        };

        this.$http.post(url, params).then(res => {
          this.loginInfo.reportNo = res.data.result;
          this.uploadParams.report_no = res.data.result;
        }, error => {
          this.$message.error('创建报案号异常');
          console.error(error.data.message);
        });
      },

      submit() {
        // 保存案件分配
        const url = window.SERVE_URl + 'distributeReport';
        var ld = this.loading('保存案件信息中…');
        var params = {
          userName: this.loginInfo.userName,
          tokens: this.loginInfo.tokens,
          company_code: this.loginInfo.company_code,
          reportNo: this.loginInfo.reportNo,
          handleBy: this.model.handleBy,
          accidentDate: this.model.accidentDate,
          accidentPlace: this.model.accidentPlace,
          accidentDetail: this.model.accidentDetail
        };

        this.$http.post(url, params).then(res => {
          ld.close();

          if ('ok' === res.data.status) {
            this.$message.success('保存案件信息成功');
            // 刷新页面
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            this.$message.error(res.data.result);
          }
        }, error => {
          ld.close();
          this.$message.error('系统异常');
          console.error(error.data.message);
        });
      }
    }
  }
</script>
