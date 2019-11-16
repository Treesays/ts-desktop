<template>
    <div class="navbar flex">
        <!-- <el-menu :default-active="$route.name" class="el-menu-nav" mode="horizontal" @select="handleSelect" background-color="#fff" active-text-color="#1989fa">
            <div class="navWrapper">
                <div class="flex">
                    <span class="logo">树 说</span>
                </div>
                <div class="navMain flex">
                    <el-menu-item index="home" @click="toRouter('/home')">首页</el-menu-item>
                    <el-menu-item index="expose" @click="toRouter('/expose/home')">我要揭发</el-menu-item>
                    <el-menu-item index="hc" @click="toRouter('/hc/list')">求助中心</el-menu-item>
                    <el-menu-item index="4" @click="toRouter()">社区论坛</el-menu-item>
                    <el-menu-item index="5" @click="toRouter()">相关资讯</el-menu-item>
                    <el-menu-item index="6" @click="toRouter()">万人墙</el-menu-item>
                </div>
            </div>
        </el-menu> -->
        <el-menu :default-active="$route.name" mode="horizontal" @select="handleSelect">

            <div class="navWrapper">
                <div class="left-part">
                    <span class="logo"><img height="38" src="~@/assets/treesays.png" alt="logo"></span>
                    <el-menu-item index="Treesays" @click="toRouter('/home')">树洞一下</el-menu-item>
                    <el-menu-item index="Smzdm" @click="toRouter('/smzdm')">什么值得买</el-menu-item>
                    <el-menu-item index="3" @click="toRouter('')">代码秀</el-menu-item>
                    <el-menu-item index="4" @click="toRouter('')">相爱相杀</el-menu-item>
                </div>
                <div class="right-part">
                    <el-button type="primary" size="small" @click="drawer = true">发动态</el-button>
                </div>
            </div>
            <el-drawer title="发动态测试" :visible.sync="drawer" direction="rtl">
                <el-form :label-position="labelPosition" label-width="80px" style="margin: 16px;" :model="mockCreation">
                    <el-form-item label="用户名">
                        <el-input v-model="mockCreation.username"></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位">
                        <el-input v-model="mockCreation.workplace"></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="mockCreation.position"></el-input>
                    </el-form-item>
                    <el-form-item label="帖子内容">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 200}" placeholder="请输入内容" v-model="mockCreation.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

        </el-menu>
    </div>
</template>

<script>
import "./overwrite.css";
export default {
    name: "Navbar",
    data() {
        return {
            activeIndex: "1",
            drawer: false,
            labelPosition: 'top',
            mockCreation: {
                username: '',
                workplace: '',
                position: '',
                content: '',
            }
        };
    },
    methods: {
        onSubmit() {
        console.log('submit!');
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        toRouter(path) {
            !path ? alert("敬请期待") : this.$router.push({ path });
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
