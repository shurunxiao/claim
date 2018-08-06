<template>
  <div>
    <el-steps :active="activeStep" finish-status="success" simple>
<!--
      <el-step title="事故概况" description=""></el-step>
-->
      <el-step title="事故详情" description=""></el-step>
      <el-step title="司机信息" description=""></el-step>
    </el-steps>

<!--
    <step1 v-show="activeStep == 0" :model="model.accidentInfo"></step1>
-->
    <step2 v-show="activeStep == 1" :model="model.accidentInfo" :attachmentList="model.attachmentList"></step2>
    <step3 v-show="activeStep == 2" :model="model.driverInfo" :attachmentList="model.attachmentList"></step3>

    <el-button type="primary" @click="nextStep" class="w mb-20">{{activeStep == 2 ? '完成' : '下一步'}}</el-button>
  </div>
</template>

<script>
  import Step1 from './CreateStep1'
  import Step2 from './CreateStep2'
  import Step3 from './CreateStep3'
  import _ from 'underscore'

  export default {
    name: 'Create',
    components: {Step1, Step2, Step3},

    data() {
      return {
        activeStep: 1,
        model: {
          accidentInfo: {
            handleBy: '',
            // 是否有第三者车辆损坏
            isThirdCarInsured: "",
            // 是否有第三者财物损坏
            isPropertyInsured: "",
            // 是否有人受伤
            isPersonInsured: "",
            // 事故时间
            accidentDate: new Date(),
            // 事故地点
            accidentPlace: '',
            // 事故经过
            accidentDetail: '',
            // 第三方车辆
            // 车牌号码
            /*thirdCarNo: '',
            // 损坏程度
            thirdCarDamageLevel: '',
            // 责任方
            thirdCarResponsible: '',
            // 姓名
            thirdCarName: '',
            // 联系电话
            thirdCarMobile: '',
            // 家庭住址
            thirdCarAddress: '',
            // 保险公司
            thirdCarInsurer: '',
            // 保单号码
            thirdCarPolicyNo: '',*/
            // 第三方财物
            // 姓名
            thirdPropertyName: '',
            // 联系电话
            thirdPropertyMobile: '',
            // 家庭住址
            thirdPropertyAddress: '',
            // 物品1名称
            thirdPropertyGoods1Name: '',
            // 物品1损坏程度
            thirdPropertyGoods1Level: '',
            // 物品2名称
            thirdPropertyGoods2Name: '',
            // 物品2损坏程度
            thirdPropertyGoods2Level: '',
            // 受伤者情况
            // 受伤者1类型
            injuredPerson1Type: '',
            // 受伤者1姓名
            injuredPerson1Name: '',
            // 受伤者1联系方式
            injuredPerson1Mobile: '',
            // 受伤者1家庭住址
            injuredPerson1Address: '',
            // 受伤者1程度
            injuredPerson1Level: '',
            // 受伤者1是否送往医院
            injuredPerson1Hospital: '',
            // 受伤者2类型
            injuredPerson2Type: '',
            // 受伤者2姓名
            injuredPerson2Name: '',
            // 受伤者2联系方式
            injuredPerson2Mobile: '',
            // 受伤者1家庭住址
            injuredPerson2Address: '',
            // 受伤者2程度
            injuredPerson2Level: '',
            // 受伤者2是否送往医院
            injuredPerson2Hospital: '',
            // 乘客姓名
            passengerName: '',
            // 乘客电话
            passengerMobile: '',
            // 乘客家庭住址
            passengerAddress: '',
            // 目击者1姓名
            eyewitness1Name: '',
            // 目击者1电话
            eyewitness1Mobile: '',
            // 目击者1地址
            eyewitness1Address: '',
            // 目击者2姓名
            eyewitness2Name: '',
            // 目击者2电话
            eyewitness2Mobile: '',
            // 目击者2地址
            eyewitness2Address: '',
            // 警方姓名
            policeName: '',
            // 警方电话
            policeMobile: '',
            // 警方材料
            policeAttachment: '',
            reportNo: '',
            tokens: '',
            userName: '',
            company_code: '',
            roleStr: '',
            // todo 以下字段未对上
            carAmount: 0,
            idReportAccident: '',
          },
          driverInfo: {
            // 车主姓名
            carOwnerName: '',
            // 驾驶员姓名
            driverName: '',
            // 驾驶员电话
            driverMobile: '',
            // 对方司机姓名
            otherCarOwnerName: '',
            // 对方司机手机
            otherCarOwnerMobile: '',
            // 对方司机身份证
            otherCarOwnerCardNo: '',
            // 对方司机家庭地址
            otherCarOwnerAddress: '',
            reportNo: '',
            tokens: '',
            userName: '',
            company_code: '',
            roleStr: '',
            // todo 以下字段未对上
            idReportInfo: '',
            reportName: '',
          },

          attachmentList: []
        }
      }
    },
    mounted () {
      // 检查登陆状态
      if (!this.checkLogin()) return;
      // 查询报告明细
      this.queryReportDetail();
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
      updateModelFromSession () {
        this.model.accidentInfo.reportNo = this.loginInfo.reportNo;
        this.model.accidentInfo.tokens = this.loginInfo.tokens;
        this.model.accidentInfo.userName = this.loginInfo.userName;
        this.model.accidentInfo.roleStr = this.loginInfo.roleStr;
        this.model.accidentInfo.company_code = this.loginInfo.company_code;

        this.model.driverInfo.reportNo = this.loginInfo.reportNo;
        this.model.driverInfo.tokens = this.loginInfo.tokens;
        this.model.driverInfo.userName = this.loginInfo.userName;
        this.model.driverInfo.roleStr = this.loginInfo.roleStr;
        this.model.driverInfo.company_code = this.loginInfo.company_code;
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
        if (this.activeStep === 0) {
          this.activeStep ++
        } else if (this.activeStep === 1) {
          this.saveAccidentInfo();
        } else {
          this.saveDriverInfo();
        }
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
          this.model.accidentInfo = res.data.result.reportAccident || {};
          this.model.driverInfo = res.data.result.reportInfo || {};
          this.model.attachmentList = res.data.result.attachmentList || {};
          if (!_.isEmpty(this.model.attachmentList)) {
            this.model.attachmentList.forEach(item => {
              item.name = item.attachmentName;
            });
          }
          // 从sessionStorage更新信息
          this.updateModelFromSession();
        }, error => {
          ld.close();
          this.$message.error('案件信息中查询异常');
          console.error(error.data.message);
        });
      },

      saveAccidentInfo(){
        // 保存事故信息
        const url = window.SERVE_URl + 'accident_report';
        var param = this.model.accidentInfo;
        var ld = this.loading('保存事故信息中…');
        this.$http.post(url, param).then(res => {
          ld.close();

          if ('ok' === res.data.status) {
            this.activeStep ++;
          } else {
            this.$message.error(res.data.result);
          }
        }, error => {
          ld.close();
          this.$message.error('系统异常');
          console.error(error.data.message);
        });
      },
      saveDriverInfo(){
        // 保存司机信息
        const url = window.SERVE_URl + 'add_reportInfo';
        var param = this.model.driverInfo;
        var ld = this.loading('保存司机信息中…');
        this.$http.post(url, param).then(res => {
          ld.close();

          if ('ok' === res.data.status) {
            this.$message.success('报案成功');
            // 前往首页
            this.$router.push('query');
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
