<template>
  <div>
    <div class="header-nav ta-c">
      <el-col :span="3"><span style="position: relative;left: -2000px;">益群法律服务</span></el-col>
      <el-col :span="18"><h1>益群法律服务</h1></el-col>
      <el-col :span="3">{{loginInfo.userName}}欢迎您，<el-button type="text" @click="quit">退出</el-button>
      </el-col>
    </div>

    <div class="container">
      <div class="aside">
        <el-menu
          ref="elMenu"
          style="border-right: none"
          :router=true
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="ReportCreate" v-show="loginInfo.roleStr === '3'">
            <i class="el-icon-news"></i>
            <span slot="title">{{menuTitle.ReportCreate.name}}</span>
          </el-menu-item>
          <el-menu-item index="TaskList" v-show="loginInfo.roleStr === '1' || loginInfo.roleStr === '2' || loginInfo.roleStr === '4'">
            <i class="el-icon-star-off"></i>
            <span slot="title">{{menuTitle.TaskList.name}}</span>
          </el-menu-item>
          <el-menu-item index="TaskListForEnd" v-show="loginInfo.roleStr === '1' || loginInfo.roleStr === '2' || loginInfo.roleStr === '4'">
            <i class="el-icon-star-on"></i>
            <span slot="title">{{menuTitle.TaskListForEnd.name}}</span>
          </el-menu-item>
          <el-menu-item index="UserManager" v-show="loginInfo.roleStr === '1'">
            <i class="el-icon-goods"></i>
            <span slot="title">{{menuTitle.UserManager.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="main">
        <div class="manage-area">
          <div class="manage-area-title">
            <h2>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: item.url }" v-for="item in menuTitle[$route.name].breadcrumb">{{item.name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </h2>
          </div>
          <div class="manage-area-main">
            <router-view class="manage-area-main-inner"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        loginInfo: {},
        activeIndex: 'TaskList',
        menuTitle: {
          Home: {
            name: '首页',
            breadcrumb: []
          },
          Create: {
            name: '修改报案',
            breadcrumb: [{name: '案件查询', url: '/TaskList'}, {name: '修改报案', url: ''}]
          },
          TaskList: {
            name: '案件查询（未结案）',
            breadcrumb: [{name: '案件查询（未结案）', url: ''}]
          },
          TaskListForEnd: {
            name: '案件查询（已结案）',
            breadcrumb: [{name: '案件查询（已结案）', url: ''}]
          },
          UserManager: {
            name: '用户管理',
            breadcrumb: [{name: '用户管理', url: ''}]
          },
          Query: {
            name: '报案信息',
            breadcrumb: [{name: '案件查询', url: '/TaskList'}, {name: '修改报案', url: '/Create'}, {name: '报案信息', url: ''}]
          },
          Node: {
            name: '报案节点',
            breadcrumb: [{name: '案件查询', url: '/TaskList'}, {name: '修改报案', url: '/Create'}, {name: '报案信息', url: '/Query'}, {name: '报案节点', url: ''}]
          },
          ReportCreate: {
            name: '新建报案',
            breadcrumb: [{name: '新建报案', url: ''}]
          }
        }
      }
    },
    mounted () {
      // 检查登陆状态
      if (!this.checkLogin()) return;

      // 初始化赋值组件路由--》解决手工录入路由场景
      let elMenu = this.$refs.elMenu;
      if (elMenu.items[this.$route.name]) {
        elMenu.activeIndex = 'Home' === this.$route.name ? 'TaskList' : this.$route.name;
        elMenu.activeIndex = 'ReportCreate' === this.$route.name && this.loginInfo.roleStr === '1' ? 'TaskList' : elMenu.activeIndex;
      }

      // el-menu初始化没有跳转路由
      this.routeToItem();
    },
    methods: {
      quit() {
        sessionStorage.removeItem('loginInfo');
        this.$router.push({name: 'Login'});
      },
      routeToItem() {
        let elMenu = this.$refs.elMenu;
        elMenu.routeToItem(elMenu.items[elMenu.activeIndex]);
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
      }
    },
    watch: {
      '$route.name'(val) {
        // 检查登陆状态
        this.checkLogin();

        if (val === 'TaskList') {
          this.menuTitle.Query.breadcrumb = [{name: '案件查询（未结案）', url: '/TaskList'}, {name: '修改报案', url: '/Create'}, {name: '报案信息', url: ''}];
          this.menuTitle.Node.breadcrumb = [{name: '案件查询（未结案）', url: '/TaskList'}, {name: '修改报案', url: '/Create'}, {name: '报案信息', url: '/Query'}, {name: '报案节点', url: ''}]
        } else if (val === 'TaskListForEnd') {
          this.menuTitle.Query.breadcrumb = [{name: '案件查询（已结案）', url: '/TaskList'}, {name: '报案信息', url: ''}];
          this.menuTitle.Node.breadcrumb = [{name: '案件查询（已结案）', url: '/TaskList'}, {name: '报案信息', url: '/Query'}, {name: '报案节点', url: ''}]
        }

        // 通过Url手动切换路由
        let elMenu = this.$refs.elMenu;
        if (elMenu.items[val]) {
          elMenu.activeIndex = 'Home' === val ? 'TaskList' : val;
          // 操作员2跳ReportCreate页面
          if (this.loginInfo.roleStr === '3') {
            elMenu.activeIndex = 'ReportCreate';
          }
          this.routeToItem();
        }
      }
    }
  }
</script>
