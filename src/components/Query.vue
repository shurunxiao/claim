<template>
  <div>
    <!--案件信息-->
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>案件信息</h2>

      <el-form-item label="意外日期">{{reportAccident.accidentDate | dateFormat}}</el-form-item>
      <el-form-item label="意外地点">{{reportAccident.accidentPlace}}</el-form-item>
      <el-form-item label="详情包括车速、天气、路面情况">{{reportAccident.accidentDetail}}</el-form-item>
      <el-form-item label="案件描述">
        <upload :uploadParams="uploadParams[0]" :attachmentList="attachmentList" attachmentType="案件描述"></upload>
      </el-form-item>
    </el-form>

    <!--第三方车辆损坏情况-->
    <!--<el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>第三方车辆损坏情况</h2>

      <el-form-item label="车牌号码">{{reportAccident.thirdCarNo}}</el-form-item>
      <el-form-item label="损坏程度">
        <el-radio-group v-model="reportAccident.thirdCarDamageLevel">
          <el-radio disabled :label="item.valueChineseName" v-for="item in damageLevelOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="责任在哪方">
        <el-radio-group v-model="reportAccident.thirdCarResponsible">
          <el-radio disabled :label="item.valueChineseName" v-for="item in dutyOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名">{{reportAccident.thirdCarName}}</el-form-item>
      <el-form-item label="联系电话">{{reportAccident.thirdCarMobile}}</el-form-item>
      <el-form-item label="家庭地址">{{reportAccident.thirdCarAddress}}</el-form-item>
      <el-form-item label="保险公司">{{reportAccident.thirdCarInsurer}}</el-form-item>
      <el-form-item label="保单号码">{{reportAccident.thirdCarPolicyNo}}</el-form-item>
    </el-form>-->

    <!--受伤者情况-->
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>受伤者1情况</h2>
      <el-form-item label="受伤者是">
        <el-radio-group v-model="reportAccident.injuredPerson1Type">
          <el-radio disabled :label="item.valueChineseName" v-for="item in injuredPersonTypeOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名">{{reportAccident.injuredPerson1Name}}</el-form-item>
      <el-form-item label="联系电话">{{reportAccident.injuredPerson1Mobile}}</el-form-item>
      <el-form-item label="家庭住址">{{reportAccident.injuredPerson1Address}}</el-form-item>
      <el-form-item label="受伤程度">
        <el-radio-group v-model="reportAccident.injuredPerson1Level">
          <el-radio disabled :label="item.valueChineseName" v-for="item in injuredPersonLevelOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否送往医院">
        <el-radio-group v-model="reportAccident.injuredPerson1Hospital">
          <el-radio disabled :label="item.valueChineseName" v-for="item in injuredPersonHospitalOptions"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="受伤者1附件">
        <upload :uploadParams="uploadParams[1]" :attachmentList="attachmentList" attachmentType="受伤者1附件"></upload>
      </el-form-item>
    </el-form>
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>受伤者2情况</h2>
      <el-form-item label="受伤者是">
        <el-radio-group v-model="reportAccident.injuredPerson2Type">
          <el-radio disabled :label="item.valueChineseName" v-for="item in injuredPersonTypeOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名">{{reportAccident.injuredPerson2Name}}</el-form-item>
      <el-form-item label="联系电话">{{reportAccident.injuredPerson2Mobile}}</el-form-item>
      <el-form-item label="家庭住址">{{reportAccident.injuredPerson2Address}}</el-form-item>
      <el-form-item label="受伤程度">
        <el-radio-group v-model="reportAccident.injuredPerson2Level">
          <el-radio disabled :label="item.valueChineseName" v-for="item in injuredPersonLevelOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否送往医院">
        <el-radio-group v-model="reportAccident.injuredPerson2Hospital">
          <el-radio disabled :label="item.valueChineseName" v-for="item in injuredPersonHospitalOptions"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="受伤者2附件">
        <upload :uploadParams="uploadParams[2]" :attachmentList="attachmentList" attachmentType="受伤者2附件"></upload>
      </el-form-item>
    </el-form>

    <!--警方信息-->
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>警方信息</h2>
      <el-form-item label="姓名">{{reportAccident.policeName}}</el-form-item>
      <el-form-item label="联系电话">{{reportAccident.policeMobile}}</el-form-item>
    </el-form>

    <!-- 我方司机信息 -->
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>我方司机信息</h2>
      <el-form-item label="车主姓名">{{reportInfo.carOwnerName}}</el-form-item>
      <el-form-item label="司机姓名">{{reportInfo.driverName}}</el-form-item>
      <el-form-item label="司机联系电话">{{reportInfo.driverMobile}}</el-form-item>
    </el-form>

    <!-- 对方司机信息 -->
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>对方司机信息</h2>
      <el-form-item label="司机姓名">{{reportInfo.otherCarOwnerName}}</el-form-item>
      <el-form-item label="司机联系电话">{{reportInfo.otherCarOwnerMobile}}</el-form-item>
      <el-form-item label="司机身份证">{{reportInfo.otherCarOwnerCardNo}}</el-form-item>
      <el-form-item label="司机家庭地址">{{reportInfo.otherCarOwnerAddress}}</el-form-item>
    </el-form>

    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>司机附件信息</h2>

      <el-form-item label="定则">
        <upload :uploadParams="uploadParams[3]" :attachmentList="attachmentList" attachmentType="定则"></upload>
      </el-form-item>

      <el-form-item label="法院传票">
        <upload :uploadParams="uploadParams[4]" :attachmentList="attachmentList" attachmentType="法院传票"></upload>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="nextStep" v-show="isShowBtn" class="w mb-20">下一步</el-button>
  </div>
</template>

<script>
  import baseData from "../data/baseData";
  import Upload from './Upload'
  import _ from 'underscore'

  export default {
    name: 'Query',
    components: {Upload},

    mounted() {
      // 检查登陆状态
      if (!this.checkLogin()) return;
      // 查询报告明细
      this.queryReportDetail();

      var loginInfo = this.loginInfo;
      _.each(this.uploadParams, item => {
        item.userName = loginInfo.userName;
        item.tokens = loginInfo.tokens;
        item.company_code = loginInfo.company_code;
        item.report_no = loginInfo.reportNo;
      });
    },
    methods: {
      handleSelect(index) {
        this.activeIndex = index;
      },
      checkLogin() {
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

      nextStep() {
        this.$router.push('Node');
      },

      queryReportDetail() {
        const url = window.SERVE_URl + 'queryReportDetail';
        var param = {
          "report_no": this.loginInfo.reportNo,
          "userName": this.loginInfo.userName,
          "tokens": this.loginInfo.tokens,
          company_code: this.loginInfo.company_code
        };

        var ld = this.loading('案件信息查询中…');
        this.$http.post(url, param).then(res => {
          ld.close();
          if ('ok' === res.data.status) {
            this.isShowBtn = true;
            this.reportAccident = res.data.result.reportAccident || {};
            this.reportInfo = res.data.result.reportInfo || {};
            this.attachmentList = res.data.result.attachmentList || [];
            if (!_.isEmpty(this.attachmentList)) {
              this.attachmentList.forEach(item => {
                item.name = item.attachmentName;
              });
            }
            // 是否包含完结
            this.uploadParams.disable = !!res.data.result.taskList.filter(task => {
              return task.handleNode === '00';
            }).length;
          } else {
            this.$message.error(res.data.result);
          }
        }, error => {
          ld.close();
          this.$message.error('案件信息中查询异常');
          console.error(error.data.message);
        });
      }

    },
    data() {
      return {
        isShowBtn: false,
        uploadAction: window.SERVE_URl + 'upload',
        activeIndex: '1',
        dialogVisible: false,
        dialogImageUrl: '',
        reportAccident: {},
        reportInfo: {},
        uploadParams: [{
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        },
        {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        }, {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        }, {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        }, {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        }],
        attachmentList: [],

        // 损坏程度
        damageLevelOptions: baseData.damageLevel,
        // 责任
        dutyOptions: baseData.duty,
        // 受伤者类型
        injuredPersonTypeOptions: baseData.injuredPersonType,
        // 受伤程度
        injuredPersonLevelOptions: baseData.injuredPersonLevel,
        // 是否送往医院
        injuredPersonHospitalOptions: baseData.injuredPersonHospitalOptions,
      }
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
