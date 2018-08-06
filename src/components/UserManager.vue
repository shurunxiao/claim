<template>
  <div>
    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>新建账号</h2>
      <el-form-item label="用户名">
        <el-input v-model="model.userName" placeholder="请输入意外地点"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password" placeholder="请输入意外地点"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="model.roleStr" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="addUser" class="w">创建</el-button>
    </el-form>

    <el-form class="manage-area-main-inner-box">
      <h2 class="manage-area-main-inner-box-title"><i class="el-icon-info"></i>账号列表</h2>
      <div>
        <el-tag
          :key="user.userName"
          v-for="user in userList"
          closable
          :disable-transitions="false"
          @close="deleteUser(user)">
          {{user.userName}}
        </el-tag>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'UserManager',

    data() {
      return {
        model: {
          roleStr: '',
          password: '',
          userName: ''
        },

        userList: [],

        roleOptions: []
      }
    },

    mounted () {
      // 检查登陆状态
      if (!this.checkLogin()) return;
      // 角色基础数据
      this.queryRoleList();
      // 用户列表
      this.queryUserList();
    },

    methods: {
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

      queryRoleList(){
        const url =  window.SERVE_URl + 'queryRoleList';
        let param = {
          "company_code": this.loginInfo.company_code
        };

        this.$http.post(url, param).then(res => {
          this.roleOptions = res.data.result;
        }, error => {
          this.$message.error('查询异常');
          console.error(error.data.message);
        });
      },

      queryUserList() {
        const url =  window.SERVE_URl + 'queryUserList';

        this.$http.post(url, this.loginInfo.company_code).then(res => {
          this.userList = res.data.result;
        }, error => {
          this.$message.error('查询异常');
          console.error(error.data.message);
        });
      },

      addUser() {
        const url =  window.SERVE_URl + 'addUser';

        this.model.company_code = this.loginInfo.company_code;
        this.model.tokens = this.loginInfo.tokens;
        this.model.create_by = this.loginInfo.userName;

        this.$http.post(url, this.model).then(res => {
          if (res.data.status === 'ok') {
            this.$message.success('创建用户成功');
            this.queryUserList();
            this.model = {};
          } else {
            this.$message.error(res.data.result);
          }
        }, error => {
          this.$message.error('创建用户异常');
          console.error(error.data.message);
        });
      },

      deleteUser(user) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url =  window.SERVE_URl + 'deleteUser';

          user.company_code = this.loginInfo.company_code;
          user.tokens = this.loginInfo.tokens;
          user.create_by = this.loginInfo.userName;
          this.$http.post(url, user).then(res => {
            if (res.data.status === 'ok') {
              this.$message.success('删除用户成功');
              this.queryUserList();
            } else {
              this.$message.error(res.data.result);
            }
          }, error => {
            this.$message.error('删除用户异常');
            console.error(error.data.message);
          });
        });
      }
    }
  }
</script>
