<template>
  <div>
    <el-dialog
      class="login"
      width="20%"
      top="30vh"
      :modal="true"
      :visible.sync="showLoginModal"
      :close-on-click-modal="false"
    >
      <div v-if="isLoginActive" slot="title" class="title">登 录</div>
      <div v-if="!isLoginActive" slot="title" class="title">注 册</div>
      <el-form class="modal-form">
        <!-- login -->
        <div v-if="isLoginActive">
          <el-input size="small" placeholder="请输入邮箱" v-model="email" />
          <el-input size="small" placeholder="请输入密码" v-model="password" show-password />
          <el-button type="primary" size="small" class="modal-button" @click="login()">登 录</el-button>
          <div class="link-group">
            <div>
              <span>没有账号？</span>
              <a @click="toggleLogin">注册</a>
            </div>
            <div>
              <a href>找回密码</a>
            </div>
          </div>
        </div>
        <!-- end login -->

        <!-- register -->
        <div v-if="!isLoginActive">
          <el-input size="small" placeholder="用输入用户名" v-model="username" />
          <el-input size="small" placeholder="请输入邮箱" v-model="email" />
          <el-input size="small" placeholder="请输入密码 (不少于6位)" v-model="password"  show-password />
          <el-button type="primary" size="small" class="modal-button" @click="register()">注 册</el-button>
          <div class="link-group">
            <a @click="toggleLogin">已有账号登录</a>
          </div>
        </div>
        <!-- end register -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { parseErrorMsg } from "@/utils/errorHandle.js";
import { buildMessage } from "@/utils/messageBuilder.js";
import { userRegister, userLogin } from "@/services/auth.js";
export default {
  name: "LoginRegModal",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isLoginActive: true
    };
  },
  methods: {
    toggleLogin() {
      this.isLoginActive = !this.isLoginActive;
    },
    async register() {
      try {
        const response = await userRegister(this.username, this.email, this.password);
        if (response.id !== null) {
         buildMessage('success', '注册成功');
        } 
      } catch(error) {
        console.log(error);
        const { rawMessage } = parseErrorMsg(error);
        buildMessage('error', rawMessage);
      }
    },
    async login() {
       try {
        const response = await userLogin(this.email, this.password);
        if (response.id !== null) {
          this.$store.state.showLoginModal = false;
          buildMessage('success', '登录成功');
          setTimeout(() => {this.$router.go(0)}, 1000);
         
        } 
      } catch(error) {
        console.log(error);
        const { rawMessage } = parseErrorMsg(error);
        buildMessage('error', rawMessage);
      }
    }
  },
  computed: {
    showLoginModal: {
      get() {
        return this.$store.state.showLoginModal;
      },
      set(value) {
        this.$store.state.showLoginModal = value;
      }
    }
  }
};
</script>

<style scoped>
.modal-form .el-input {
  margin-bottom: 8px;
}
.title {
  font-size: 14px;
  margin-bottom: 0px;
}
.modal-button {
  width: 100%;
}
.link-group {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 1rem 0px 0px 0px;
}
.link-group a {
  text-decoration: none;
  color: #007fff;
  cursor: pointer;
}
</style>
