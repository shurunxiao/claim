<template>
  <div>
    <!--案件信息-->
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-success"></i>案件信息</h2>

      <el-form-item label="意外日期">{{model.accidentDate | dateFormat}}</el-form-item>
      <el-form-item label="意外地点">{{model.accidentPlace}}</el-form-item>
      <el-form-item label="详情包括车速、天气、路面情况">{{model.accidentDetail}}</el-form-item>

      <el-form-item label="案件描述">
        <upload :uploadParams="uploadParams1" :attachmentList="attachmentList" attachmentType="案件描述"></upload>
      </el-form-item>
    </el-form>

    <!--第三方车辆损坏情况-->
    <!--<el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>第三方车辆损坏情况</h2>

      <el-form-item label="车牌号码">
        <el-input v-model="model.thirdCarNo" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="损坏程度">
        <el-radio-group v-model="model.thirdCarDamageLevel">
          <el-radio :label="item.valueChineseName" v-for="item in damageLevelOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="责任在哪方">
        <el-radio-group v-model="model.thirdCarResponsible">
          <el-radio :label="item.valueChineseName" v-for="item in dutyOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="model.thirdCarName" placeholder="请输入车主姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="model.thirdCarMobile" placeholder="请输入车主联系电话"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址">
        <el-input v-model="model.thirdCarAddress" placeholder="请输入车主家庭地址"></el-input>
      </el-form-item>
      <el-form-item label="保险公司">
        <el-input v-model="model.thirdCarInsurer" placeholder="请输入保险公司名称"></el-input>
      </el-form-item>
      <el-form-item label="保单号码">
        <el-input v-model="model.thirdCarPolicyNo" placeholder="请输入保单号码"></el-input>
      </el-form-item>
    </el-form>-->

    <!--受伤者情况-->
    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>受伤者1情况</h2>
      <el-form-item label="受伤者是">
        <el-radio-group v-model="model.injuredPerson1Type">
          <el-radio :label="item.valueChineseName" v-for="item in injuredPersonTypeOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="model.injuredPerson1Name" placeholder="请输入伤者姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="model.injuredPerson1Mobile" placeholder="请输入伤者联系电话"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="model.injuredPerson1Address" placeholder="请输入伤者家庭住址"></el-input>
      </el-form-item>
      <el-form-item label="受伤程度">
        <el-radio-group v-model="model.injuredPerson1Level">
          <el-radio :label="item.valueChineseName" v-for="item in injuredPersonLevelOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否送往医院">
        <el-radio-group v-model="model.injuredPerson1Hospital">
          <el-radio :label="item.valueChineseName" v-for="item in injuredPersonHospitalOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="受伤者1附件">
        <upload :uploadParams="uploadParams2" :attachmentList="attachmentList" attachmentType="受伤者1附件"></upload>
      </el-form-item>
    </el-form>
    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>受伤者2情况</h2>
      <el-form-item label="受伤者是">
        <el-radio-group v-model="model.injuredPerson2Type">
          <el-radio :label="item.valueChineseName" v-for="item in injuredPersonTypeOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="model.injuredPerson2Name" placeholder="请输入伤者姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="model.injuredPerson2Mobile" placeholder="请输入伤者联系电话"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="model.injuredPerson2Address" placeholder="请输入伤者家庭住址"></el-input>
      </el-form-item>
      <el-form-item label="受伤程度">
        <el-radio-group v-model="model.injuredPerson2Level">
          <el-radio :label="item.valueChineseName" v-for="item in injuredPersonLevelOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否送往医院">
        <el-radio-group v-model="model.injuredPerson2Hospital">
          <el-radio :label="item.valueChineseName" v-for="item in injuredPersonHospitalOptions"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="受伤者2附件">
        <upload :uploadParams="uploadParams3" :attachmentList="attachmentList" attachmentType="受伤者2附件"></upload>
      </el-form-item>
    </el-form>

    <!--警方信息-->
    <el-form class="manage-area-main-inner-box" ref="model" :model="model">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>警方信息</h2>
      <el-form-item label="姓名">
        <el-input v-model="model.policeName" placeholder="请输入警察姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="model.policeMobile" placeholder="请输入警察联系电话"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import baseData from "../data/baseData";
  import Upload from './Upload'

  export default {
    name: 'Step2',
    components: {Upload},

    data() {
      return {
        uploadParams1: {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        },
        uploadParams2: {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        },
        uploadParams3: {
          report_no: '',
          userName: '',
          tokens: '',
          company_code: '',
          disable: false,
          preview: true
        },
        // 损坏程度
        damageLevelOptions: baseData.damageLevel,
        // 责任
        dutyOptions: baseData.duty,
        // 受伤者类型
        injuredPersonTypeOptions: baseData.injuredPersonType,
        // 受伤程度
        injuredPersonLevelOptions: baseData.injuredPersonLevel,
        // 是否送往医院
        injuredPersonHospitalOptions: baseData.injuredPersonHospitalOptions
      }
    },
    props: {
      attachmentList: {
        type: Array,
        default: []
      },

      model: {
        // 事故时间
        accidentDate: '',
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
        // 受伤者2家庭住址
        injuredPerson2Address: '',
        // 受伤者2程度
        injuredPerson2Level: '',
        // 受伤者2是否送往医院
        injuredPerson2Hospital: '',
        // 乘客及目击证人
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
        // 警方信息
        // 警方姓名
        policeName: '',
        // 警方电话
        policeMobile: '',
      }
    },

    watch: {
      model() {
        this.uploadParams1.userName = this.model.userName;
        this.uploadParams1.tokens = this.model.tokens;
        this.uploadParams1.company_code = this.model.company_code;
        this.uploadParams1.report_no = this.model.reportNo;

        this.uploadParams2.userName = this.model.userName;
        this.uploadParams2.tokens = this.model.tokens;
        this.uploadParams2.company_code = this.model.company_code;
        this.uploadParams2.report_no = this.model.reportNo;

        this.uploadParams3.userName = this.model.userName;
        this.uploadParams3.tokens = this.model.tokens;
        this.uploadParams3.company_code = this.model.company_code;
        this.uploadParams3.report_no = this.model.reportNo;
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
