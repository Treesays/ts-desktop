<template>
  <div class="navbar flex">
    <LoginRegModal />
    <el-menu :default-active="$route.name" mode="horizontal" @select="handleSelect">
      <div class="navWrapper">
        <div class="left-part">
          <span class="logo">
            <img height="38" src="~@/assets/treesays.png" alt="logo" />
          </span>
          <el-menu-item index="GeekTalk" @click="toRouter('/home')">树洞一下</el-menu-item>
          <el-menu-item index="GeekToBuy" @click="toRouter('/GeekToBuy')">什么值得买</el-menu-item>
          <el-menu-item index="GeekCode" @click="toRouter('/GeekCode')">代码秀</el-menu-item>
          <el-menu-item index="GeekLove" @click="toRouter('/GeekLove')">相爱相杀</el-menu-item>
        </div>
        <div class="right-part">
          <div class="user-status">
            <span v-if="currentUser">{{currentUser}}</span>
            <el-button v-if="currentUser" type="primary" size="small" @click="drawer = true">发动态</el-button>
            <el-button v-if="currentUser" type="primary" size="small" @click="logout()">登 出</el-button>
            <el-button v-if="!currentUser" type="primary" size="small" @click="triggerLogin()" plain>登 录</el-button>
          </div>
        </div>
      </div>
      <el-drawer title="发布动态" :visible.sync="drawer" direction="rtl">
        <el-form :label-position="labelPosition" label-width="80px" style="margin: 16px;" :model="mockCreation">
          <el-form-item label="工作单位">
            <el-input v-model="mockCreation.workplace"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="mockCreation.position"></el-input>
          </el-form-item>
          <el-form-item label="分类">
          <el-select v-model="mockCreation.category" placeholder="请选择...">
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="帖子内容">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 200}" placeholder="请输入内容" v-model="mockCreation.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_onSubmit">立即创建</el-button>
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </el-menu>
  </div>
</template>

<script>
import "./overwrite.css";
import LoginRegModal from "@/components/LoginRegModal/LoginRegModal";
import { buildMessage } from "@/utils/messageBuilder.js";
export default {
    name: "Navbar",
    components: { LoginRegModal },
    data() {
        return {
            activeIndex: "1",
            drawer: false,
            labelPosition: "top",
            mockCreation: {
                workplace: "蚂蚁金服",
                position: "前端开发工程师",
                category: "GeekTalk",
                content: ""
            },
            categories: [
                {
                    value: "GeekTalk",
                    label: "树洞一下"
                },
                {
                    value: "GeekToBuy",
                    label: "什么值得买"
                },
                {
                    value: "GeekCode",
                    label: "代码秀"
                },
                {
                    value: "GeekLove",
                    label: "相爱相杀"
                }
            ]
        };
    },
    methods: {
        _onSubmit() {
          const Posts = AV.Object.extend('Posts');
          // 构建对象
          const post = new Posts();
          // 为属性赋值
          post.set('username', this.currentUser);
          post.set('workplace', this.mockCreation.workplace);
          post.set('position', this.mockCreation.position);
          post.set('category', this.mockCreation.category);
          post.set('content', this.mockCreation.content);
          post.set('avatar', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
          post.set('tags', ['内部测试']);
          post.set('shareCount', 0);
          post.set('upCount', 0);

          // 将对象保存到云端
          post.save().then(function (postContent) {
            // 成功保存之后，执行其他逻辑
            buildMessage('success', `保存成功。objectId ${postContent.id}`);
            this.drawer = false
          }, function (error) {
            // 异常处理
          });
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        toRouter(path) {
            !path ? alert("敬请期待") : this.$router.push({ path });
        },
        triggerLogin() {
            this.$store.dispatch("showLogin", true);
        },
        logout() {
            AV.User.logOut();
            this.$router.go(0);
        }
    },
    computed: {
        currentUser() {
            return AV.User.current()
                ? AV.User.current()["attributes"]["username"]
                : null;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
    display: flex;
}
.navbar {
    height: 60px;
    align-items: center;
}
.navbar ul {
    width: 100%;
}
.navWrapper {
    display: flex;
    justify-content: space-between;
    width: 960px;
    margin: 0 auto;
}
.logo {
    display: flex;
    font-size: 32px;
    font-weight: 400;
    color: #1989fa;
    align-items: center;
    margin-right: 65px;
}
.left-part {
    display: flex;
}
.right-part {
    display: flex;
    justify-content: center;
    align-items: center;
}
.navWrapper .el-menu-item.is-active {
    background: none;
    color: #1989fa;
    border-bottom: 3px solid #1989fa;
}
.el-menu-nav {
    height: 60px;
    display: flex;
    flex: 1;
}
</style>
