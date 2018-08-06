<template>
  <div class="login-body">
    <div class="login-wrapper">
      <div class="login-inner">
        <div class="lg-content">
          <div class="qc-pt-login-content J-commonLoginContent ">
            <div class="login-tab">
              <h1 class="login-tab-title J-txtLoginTitle">
                账号登录
              </h1>
              <div class="login-box J-loginContentBox J-qcloginBox">
                <div class="login-form">
                  <ul class="form-list">
                    <li>
                      <div class="form-input">
                        <el-input v-model="model.userName" placeholder="请输入用户名"></el-input>
                      </div>
                    </li>
                    <li>
                      <div class="form-input">
                        <el-input size="large" type="password" v-model="model.password" placeholder="请输入密码"></el-input>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="op-btn">
                  <el-button style="width: 310px" type="primary" @click="login()">登录</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg-footer">
        <div class="lg-footer-inner">
          <div class="copyright">
            <div class="tag-line">
              Copyright 益群法律服务 CO. LTD. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        model: {
          userName: '',
          password: ''
        },
        lanVersion: ['English', '繁体中文', '简体中文']
      }
    },
    methods: {
      loading(text) {
        return this.$loading({
          lock: true,
          text: text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },

      login() {
        const url = window.SERVE_URl + 'login';
        var param = {
          "loginDate": new Date(),
          "userName": this.model.userName,
          "password": this.model.password,
        };

        let ld = this.loading('登录中…');
        this.$http.post(url, param).then(res => {
          ld.close();

          if ('ok' === res.data.status) {
            this.$message.success('登陆成功，' + res.data.result.userName);
            // 登陆信息存session
            let loginInfo = {
              loginDate: param.loginDate,
              userName: param.userName,
              tokens: res.data.result.tokens,
              roleStr: res.data.result.roleStr,
              company_code: res.data.result.company_code
            };
            sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
            // 前往首页
            this.$router.push('Home');
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

<style lang="stylus">
  html {
    font-family: PingFangSC-Light,'helvetica neue',arial,'hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;
    font-size: 14px;
    -webkit-tap-highlight-color: transparent;
  }

  .login-body
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 1000px;

  .login-wrapper
    width: 100%;
    height: 100%;
    background: url(../assets/qcloud-login-bg.jpg?nowebp) top center no-repeat;
    background-size: cover;
    position: relative;
    min-height: 660px;

  .lg-logo {
    padding-bottom: 40px;
    position: relative;
  }
  .lg-logo:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right,rgba(255,255,255,.15),rgba(255,255,255,0));
    bottom: 0;
    left: 0
  }
  .lg-logo-icon {
    background-image: url(../assets/logo.png);
    width: 150px;
    height: 40px;
    display: inline-block;
    background-position: 0.58% 64.28%;
    background-size: 214.66666666666666% 685.785536159601%;
    background-repeat: no-repeat;
  }
  .lg-aside {
    padding-top: 50px;
    margin-right: 450px;
    padding-left: 10px;
  }
  .lg-aside-event-tit {
    color: #fff;
    font-size: 0;
    padding-top: 30px;
  }
  .lg-aside-event-tit h2 {
    display: inline-block;
    font-weight: 400;
    font-size: 28px;
    vertical-align: top;
    line-height: 1.8;
  }
  .lg-aside-event-icon {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-right: 20px;
    padding-left: 4px;
  }
  .lg-aside-event-icon img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    vertical-align: top;
  }
  .lg-aside-event-con {
    padding-left: 70px;
    font-size: 14px;
    color: #fff;
    vertical-align: middle;
  }
  .lg-aside-event-txt {
    margin-top: 15px;
  }
  .lg-aside-event-txt-icon {
    background-image: url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/login/css/sprite/login-v20180108-201806142230.svg);
    width: 16px;
    height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    background-position: 92.47999999999999% 48.29%;
    background-size: 2012.5% 2291.666666666667%;
    background-repeat: no-repeat;
  }
  .login-inner {
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    text-align: center
    /*margin: 0 auto;*/
  }
  .lg-content {
    /*position: absolute;
    right: 10px;
    top: 120px;*/
    padding-top: 20%;
  }
  .qc-pt-login-content {
    position: relative;
    display: inline-block;
    text-align: center;
  }
  .qc-pt-login-content .login-tab {
    display: inline-block;
    background: #fff;
    width: 430px;
    border-radius: 4px;
    padding-bottom: 40px;
  }
  .login-tab-title {
    font-size: 24px;
    line-height: 40px;
    font-weight: 400;
    padding-top: 40px;
    color: #333;
  }
  .qc-pt-login-content .login-box {
    position: relative;
  }
  .login-box .login-form {
    padding-top: 25px;
  }
  .qc-pt-login-content .login-box .op-btn {
    width: 310px;
    margin: 0 auto;
    padding-bottom: 0;
  }
  .qc-pt-login-content .login-box .login-form .form-list {
    width: 310px;
    margin: 0 auto;
  }

  .qc-pt-login-content .login-box .login-form .form-input {
    padding-bottom: 15px;
    position: relative;
  }

  .login-wrapper .lg-footer {
    position: absolute;
    bottom: 5px;
    height: 80px;
    line-height: 80px;
    width: 100%;
    border-top: rgba(255,255,255,.15) 1px solid;
  }
  .lg-footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .login-wrapper .copyright .tag-line {
    color: #e9edf2;
    text-align center
  }
</style>
