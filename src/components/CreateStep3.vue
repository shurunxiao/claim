<template>
  <div>
    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>我方司机信息</h2>
      <el-form-item label="车主姓名">
        <el-input v-model="model.carOwnerName" placeholder="请输入车主姓名"></el-input>
      </el-form-item>
      <el-form-item label="司机姓名">
        <el-input v-model="model.driverName" placeholder="请输入司机姓名"></el-input>
      </el-form-item>
      <el-form-item label="司机联系电话">
        <el-input v-model="model.driverMobile" placeholder="请输入司机电话"></el-input>
      </el-form-item>
    </el-form>

    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>对方司机信息</h2>
      <el-form-item label="司机姓名">
        <el-input v-model="model.otherCarOwnerName" placeholder="请输入司机姓名"></el-input>
      </el-form-item>
      <el-form-item label="司机联系电话">
        <el-input v-model="model.otherCarOwnerMobile" placeholder="请输入司机电话"></el-input>
      </el-form-item>
      <el-form-item label="司机身份证">
        <el-input v-model="model.otherCarOwnerCardNo" placeholder="请输入司机身份证"></el-input>
      </el-form-item>
      <el-form-item label="司机家庭地址">
        <el-input v-model="model.otherCarOwnerAddress" placeholder="请输入司机家庭地址"></el-input>
      </el-form-item>
    </el-form>

    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>司机附件信息</h2>

      <el-form-item label="司机之驾驶执照">
        <upload :uploadParams="uploadParams[0]" :attachmentList="attachmentList" attachmentType="司机之驾驶执照"></upload>
      </el-form-item>

      <el-form-item label="司机之身份证">
        <upload :uploadParams="uploadParams[1]" :attachmentList="attachmentList" attachmentType="司机之身份证"></upload>
      </el-form-item>

      <el-form-item label="行驶证">
        <upload :uploadParams="uploadParams[2]" :attachmentList="attachmentList" attachmentType="司机之行驶证"></upload>
      </el-form-item>
    </el-form>

    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>案件附件信息</h2>

      <el-form-item label="定则">
        <upload :uploadParams="uploadParams[3]" :attachmentList="attachmentList" attachmentType="定则"></upload>
      </el-form-item>

      <el-form-item label="法院传票">
        <upload :uploadParams="uploadParams[4]" :attachmentList="attachmentList" attachmentType="法院传票"></upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Upload from './Upload'
  import _ from 'underscore'

  export default {
    name: 'Step3',
    components: {Upload},

    data() {
      return {
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
        }]
      }
    },
    props: {
      attachmentList: {
        type: Array,
        default: []
      },

      model: {
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
      }
    },

    watch: {
      model() {
        var model = this.model;
        _.each(this.uploadParams, item => {
          item.userName = model.userName;
          item.tokens = model.tokens;
          item.company_code = model.company_code;
          item.report_no = model.reportNo;
        });
      }
    },
  }
</script>
