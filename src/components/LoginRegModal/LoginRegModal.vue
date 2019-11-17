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
          <el-input size="small" placeholder="请输入密码" v-model="password" />
          <el-button type="primary" size="small" class="modal-button">登 录</el-button>
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
          <el-input size="small" placeholder="请输入密码 (不少于6位)" v-model="password" />
          <el-button type="primary" size="small" class="modal-button">注 册</el-button>
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
  props: ["showLoginModal"],
  methods: {
    toggleLogin() {
      this.isLoginActive = !this.isLoginActive;
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
