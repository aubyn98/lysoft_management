<template>
  <div class="Login">
    <div class="Login_header">
      <div class="Login_img_box">
        <!-- <img src="../assets/logo.png" alt="领域软件" /> -->
        <!-- <p>领域软件</p> -->
      </div>
    </div>
    <div class="Login_main">
      <div class="ballBox">
        <div class="ball"></div>
      </div>
      <div class="Login_main_content">
        <div class="Login_form_box">
          <div class="Login_form_content">
            <!-- <div class="Login_form_left">
              <div class="Login_form_p_left"></div>
            </div> -->
            <div class="Login_form_right">
              <div class="Login_img_box">
                <img src="../assets/img/logo.png" alt="领域软件" />
                <p>领域软件</p>
              </div>
              <div class="Login_form">
                <div class="Login_form_item">
                  <i class="el-icon-office-building"></i
                  ><input
                    type="text"
                    placeholder="请输入用户代号"
                    v-model="msg.code"
                  />
                </div>
                <div class="Login_form_item">
                  <i class="el-icon-notebook-1"></i
                  ><el-select
                    v-model="msg.accountBook"
                    :disabled="!msg.code"
                    placeholder="请选择用户账本"
                    class="input"
                    size="mini"
                    @click.native="getAccountBooks"
                  >
                    <el-option
                      v-for="item in accountBooks"
                      :key="item.zb"
                      :label="item.zb"
                      :value="item.zb"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="Login_form_item">
                  <i class="el-icon-user"></i
                  ><input
                    type="text"
                    placeholder="请输入用户名称"
                    disabled
                    v-if="!msg.accountBook"
                    v-model="msg.username"
                  />
                  <input
                    type="text"
                    placeholder="请输入用户名称"
                    v-else
                    v-model="msg.username"
                  />
                </div>
                <div class="Login_form_item">
                  <i class="el-icon-lock"></i
                  ><input
                    type="password"
                    placeholder="请输入用户密码"
                    disabled
                    v-if="!msg.accountBook"
                    v-model="msg.password"
                  />
                  <input
                    type="password"
                    placeholder="请输入用户密码"
                    v-else
                    v-model="msg.password"
                  />
                </div>
                <div class="keepPassword">
                  <el-checkbox v-model="keepPassword" @change="keepChange"
                    >记住密码</el-checkbox
                  >
                </div>
              </div>
              <div class="Login_submit">
                <button @click="submit">登 陆</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Login_footer"></div>
  </div>
</template>

<script>
// import auth from '@/common/data/auth'
export default {
  data () {
    return {
      msg: {
        code: '',
        accountBook: '',
        username: '',
        password: ''
      },
      accountBooks: [],
      keepPassword: false
    }
  },
  created () {
    const account = JSON.parse(localStorage.getItem('account'))
    account && (this.msg = account)
    const keepFlag = JSON.parse(localStorage.getItem('keepPassword'))
    keepFlag ? (this.keepPassword = keepFlag) : (this.keepPassword = false)
  },
  methods: {
    keepChange (value) {
      localStorage.setItem('keepPassword', value)
    },
    getAccountBooks () {
      this.$api.getAccountBooks({ dh: this.msg.code }).then(res => {
        this.accountBooks = res.res
      }).catch(e => {
        this.accountBooks = []
      })
    },
    submit () {
      this.$api.sign_in(this.msg).then(({ status, qx }) => {
        if (status === 1) {
          const { password, ...account } = this.msg
          qx = qx.reduce((t, it) => {
            // eslint-disable-next-line
            t[it.mc] = { ll: it.ll == 1, xg: it.xg == 1 }
            return t
          }, {})
          const accountMsg = { ...account, qx }
          this.keepPassword ? (accountMsg.password = password) : (accountMsg.password = '')
          localStorage.setItem('account', JSON.stringify(accountMsg))
          this.$store.commit('changeAccount', { account, qx })
          this.$router.push({ name: 'home' })
        }
      }).catch(() => {
        localStorage.removeItem('account')
      })
    }
  }
}
</script>
<style lang="scss">
.ballBox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.ball {
  width: 100%;
  height: 100%;
  // background-image:linear-gradient(to left,#4b9ff5,#7fa3f9,#9ea4fa);
  background-image: linear-gradient(to left, #7f7fd5, #86a8e7, #91eae5);
  background: url("../assets/img/login_bg_1.png") no-repeat 70% 0;
  // background: url('../assets/img/login_bg_2.png') no-repeat;
  background-size: cover;
  position: relative;
  // border-radius: 50%;
  overflow: hidden;
}
.ball::after {
  position: absolute;
  content: "";
  width: 200%;
  height: 300%;
  top: 50%;
  left: 50%;
  // background-color:#7fa3f9;
  transform: translate(-50%, -100%);
  border-radius: 50%;
  animation: 5s mave infinite linear;
}
@keyframes mave {
  100% {
    transform: translate(-50%, -100%) rotate(360deg);
  }
}
.Login {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  // background: url("../assets/Login_bg_green.png");
  .el-input.is-disabled .el-input__inner {
    background: none !important;
  }
  input[type="password"]:disabled,
  input[type="text"]:disabled {
    cursor: not-allowed;
  }
}
.Login_header {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.Login_img_box {
  margin-top: 20px;
  height: 100px;
  width: 100%;
  padding: 10px 0;
}
.Login_img_box > p {
  color: #333;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 2px;
  margin: 0;
}
.Login_img_box > img {
  height: 80px;
  width: 80px;
}
.Login_main {
  width: 100%;
  height: 100%;
  padding: 100px 0;
  box-sizing: border-box;
  overflow: hidden;
}
.Login_main_content {
  height: 100%;
  width: 100%;
  background-size: cover;
  position: relative;
}
/* .Login_form_box {
  height: 440px;
  width: 740px;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  margin-left: -370px;
  top: 50%;
  margin-top: -220px;
} */
.Login_form_box {
  height: 500px;
  width: 360px;
  border-radius: 8px;
  position: absolute;
  right: 300px;
  top: 50%;
  margin-top: -250px;
}
.Login_form_content {
  height: 100%;
  width: 100%;
}
.Login_form_content::after {
  width: 100%;
  content: "";
  clear: both;
  display: block;
}
.Login_form_left {
  width: 380px;
  height: 100%;
  float: left;
  position: relative;
}
/* .Login_form_right {
  float: left;
  height: 100%;
  width: 360px;
  background-color: var(--bg-white);
  border-radius: 0 8px 8px 0;
  box-shadow: 0px 1px 15px #716d9c;
  position: relative;
} */
.Login_form_right {
  float: left;
  height: 100%;
  width: 360px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0px 1px 15px #c4bff7;
  position: relative;
}
.Login_form {
  margin-top: 20px;
}
.Login_form_item {
  width: 170px;
  position: relative;
  margin: 0 auto;
  margin-top: 18px;
  padding: 2px;
}
.Login_form_item::after {
  position: absolute;
  content: "";
  width: 100%;
  display: block;
  bottom: 0;
  left: 0;
  background-color: rgba(68, 140, 216, 1);
  height: 1px;
}
.Login_form_item > i {
  color: rgba(68, 140, 216, 1);
  font-size: 20px;
}
.Login_form_item > input,
.Login_form_item > .input {
  margin-left: 10px;
  margin-bottom: 2px;
  width: 140px;
  height: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  &::placeholder {
    color: #aaa;
    font-size: 13px !important;
  }
}
.Login_form_item > .input > .el-input {
  height: 16px;
}
.Login_form_item
  > .input
  > .el-input
  > .el-input__suffix
  > .el-input__suffix-inner
  > .el-select__caret {
  line-height: 16px;
}
.Login_form_item > .input > .el-input > .el-input__inner {
  border: none !important;
  height: 16px;
  padding: 2px;
  &::placeholder {
    color: #aaa;
    font-size: 13px;
    text-align: left;
  }
}
.Login_form_item > input::-webkit-input-placeholder {
  color: #999;
}
.keepPassword {
  height: 30px;
  display: flex;
  width: 170px;
  margin: auto;
  align-items: center;
  margin-top: 5px;
}
.Login_submit {
  margin-top: 5px;
}
.Login_submit > button:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.Login_submit > button {
  width: 180px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #ffffff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 20px;
  background-image: linear-gradient(to left, #0157c8, #3995f3) !important;
}
.Login_form_p_left {
  height: 460px;
  width: 380px;
  position: absolute;
  left: 0px;
  top: -10px;
  z-index: 2;
  border-radius: 8px;
  box-shadow: 2px 2px 10px 2px#716d9c /* rgba(7, 100, 211, 0.7) */;
  background-color: rgba(0, 0, 0, 0.4);
  background: url(http://web.yunbuye.cn//static/img/dl.jpg) no-repeat 41% 40%;
  background-size: cover;
}
.Login_footer {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
