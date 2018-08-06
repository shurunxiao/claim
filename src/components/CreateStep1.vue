<template>
  <el-form class="manage-area-main-inner-box" ref="model" :model="model">
    <el-form-item label="是否有第三者车辆损坏">
      <el-radio-group v-model="model.isThirdCarInsured">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否有第三者财物损坏">
      <el-radio-group v-model="model.isPropertyInsured">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否有人受伤">
      <el-radio-group v-model="model.isPersonInsured">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name: 'Step1',
    props: {
      model: {
        // 是否有第三者车辆损坏
        isThirdCarInsured: "",
        // 是否有第三者财物损坏
        isPropertyInsured: "",
        // 是否有人受伤
        isPersonInsured: "",
        company_code: '',
        roleStr: '',
        handleBy: ''
      },
    },

    watch: {
      model() {
      }
    }
  }
</script>
