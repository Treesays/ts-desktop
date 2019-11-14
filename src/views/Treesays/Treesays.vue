<template>
  <div class="hc-container">
    <div class="hc-posts">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="热门" name="all">
          <div v-for="post in hotPosts" :key="post.id" class="hc-post-layout">
            <div class="hc-post-item">
              <div class="user-info">
                <div class="user-avatar">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  ></el-avatar>
                </div>
                <div class="author-info">
                  <h3>{{post.authorInfo.name}}</h3>
                  <span>{{post.authorInfo.position}} @</span>
                  <span>{{post.authorInfo.company}}</span>
                </div>
              </div>
              <div class="post-content">
                <span>{{post.content}}</span>
              </div>
              <div class="post-tags">
                <el-tag
                  v-for="category in post.categories"
                  :key="category.id"
                  size="small"
                  effect="plain"
                >{{ category.name }}</el-tag>
              </div>
              <div class="post-stats">
                <span>赞</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span>评论</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span>分享</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最新" name="inAuth">
          <div v-for="post in newPosts" :key="post.id" class="hc-post-layout">
            <div class="hc-post-item">
              <div class="user-info">
                <div class="user-avatar">
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  ></el-avatar>
                </div>
                <div class="author-info">
                  <h3>{{post.authorInfo.name}}</h3>
                  <span>{{post.authorInfo.position}} @</span>
                  <span>{{post.authorInfo.company}}</span>
                </div>
              </div>
              <div class="post-content">
                <span>{{post.content}}</span>
              </div>
              <div class="post-tags">
                <el-tag
                  v-for="category in post.categories"
                  :key="category.id"
                  size="small"
                  effect="plain"
                >{{ category.name }}</el-tag>
              </div>
              <div class="post-stats">
                <span>赞</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span>评论</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span>分享</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="hc-form">
      <h3>快速发布求助信息</h3>
      <el-form
        ref="hcForm"
        :rules="rules"
        label-position="top"
        label-width="80px"
        :model="hcPostForm"
      >
        <el-form-item prop="title" label="求助标题">
          <el-input v-model="hcPostForm.title" />
        </el-form-item>
        <el-form-item prop="content" label="求助内容">
          <el-input v-model="hcPostForm.content" type="textarea" :rows="7" />
        </el-form-item>
        <el-form-item prop="region" label="所在区域">
          <el-select v-model="hcPostForm.region" placeholder="请选择所在区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item prop="detailedAddr" label="详细地址">
          <el-input v-model="hcPostForm.detailedAddr" />
        </el-form-item>
        <el-form-item prop="contactPerson" label="联系人">
          <el-input v-model="hcPostForm.contactPerson" />
        </el-form-item>
        <el-form-item prop="contactDetail" label="联系方式">
          <el-input v-model="hcPostForm.contactDetail" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('hcForm')">提交</el-button>
          <el-button @click="resetForm('hcForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "./overwrite.css";
export default {
  name: "Treesays",
  data() {
    return {
      activeName: "all",
      labelPosition1: "top",
      labelPosition2: "left",
      hcPostForm: {
        title: "",
        content: "",
        region: "",
        detailedAddr: "",
        contactPerson: "",
        contactDetail: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入求助标题",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入求助内容",
            trigger: "blur"
          },
          {
            min: 15,
            max: 2000,
            message: "长度在 15 到 2000 个字符",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请输入所在区域",
            trigger: "change"
          }
        ],
        detailedAddr: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          },
          {
            min: 8,
            max: 50,
            message: "长度在 8 到 50 个字符",
            trigger: "blur"
          }
        ],
        contactPerson: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        contactDetail: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      posts: [
        {
          id: 1,
          content:
            "缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。",
          imgAttachment: [],
          categories: [{ id: 1, name: "代码写诗" }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: "校长不读书",
                userAvatar:
                  "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                content: "自己顶",
                replies: [
                  {
                    id: 3,
                    username: "皓哥",
                    userAvatar:
                      "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                    content: "帮校长顶"
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: "校长",
            position: "前端开发工程师",
            company: "阿里蚂蚁金服体验部",
            avatar:
              "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4"
          },
          status: "hot"
        },
        {
          id: 2,
          content:
            "缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。",
          imgAttachment: [],
          categories: [{ id: 1, name: "代码写诗" }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: "校长不读书",
                userAvatar:
                  "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                content: "自己顶",
                replies: [
                  {
                    id: 3,
                    username: "皓哥",
                    userAvatar:
                      "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                    content: "帮校长顶"
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: "校长",
            position: "前端开发工程师",
            company: "阿里蚂蚁金服体验部",
            avatar:
              "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4"
          },
          status: "hot"
        },
        {
          id: 3,
          content:
            "缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。",
          imgAttachment: [],
          categories: [{ id: 1, name: "代码写诗" }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: "校长不读书",
                userAvatar:
                  "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                content: "自己顶",
                replies: [
                  {
                    id: 3,
                    username: "皓哥",
                    userAvatar:
                      "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                    content: "帮校长顶"
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: "校长",
            position: "前端开发工程师",
            company: "阿里蚂蚁金服体验部",
            avatar:
              "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4"
          },
          status: "hot"
        },
        {
          id: 4,
          content:
            "缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。",
          imgAttachment: [],
          categories: [{ id: 1, name: "代码写诗" }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: "校长不读书",
                userAvatar:
                  "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                content: "自己顶",
                replies: [
                  {
                    id: 3,
                    username: "皓哥",
                    userAvatar:
                      "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                    content: "帮校长顶"
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: "校长",
            position: "前端开发工程师",
            company: "阿里蚂蚁金服体验部",
            avatar:
              "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4"
          },
          status: "new"
        },
        {
          id: 5,
          content:
            "缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。",
          imgAttachment: [],
          categories: [{ id: 1, name: "代码写诗" }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: "校长不读书",
                userAvatar:
                  "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                content: "自己顶",
                replies: [
                  {
                    id: 3,
                    username: "皓哥",
                    userAvatar:
                      "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4",
                    content: "帮校长顶"
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: "校长",
            position: "前端开发工程师",
            company: "阿里蚂蚁金服体验部",
            avatar:
              "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4"
          },
          status: "new"
        }
      ]
    };
  },
  computed: {
    hotPosts() {
      return this.posts.filter(post => post.status === "hot");
    },
    newPosts() {
      return this.posts.filter(post => post.status === "new");
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        valid ? alert("submit!") : alert("error!");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.hc-container {
  display: flex;
  flex-direction: row;
  width: 960px;
  margin: 20px auto;
  justify-content: space-between;
  background-color: #f4f4f5;
}
.hc-posts {
  width: 66%;
  background-color: #f4f4f5;
  /* padding: 15px; */
}
.hc-form {
  width: 29%;
  background-color: #fff;
  padding: 12px;
}
.hc-post-layout {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 8px;
}
.hc-post-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.user-info {
  display: flex;
  padding: 16px 2rem 0 20px;
}
.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.author-info {
  color: #8a9aa9;
  font-size: 0.82rem;
  margin-left: 0.8rem;
}
.author-info h3 {
  color: #2e3135;
  margin: 0;
  font-size: 0.95rem;
}
.author-info span {
  display: inline-block;
  margin-top: 0.24rem;
}

.post-content {
  color: #17181a;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 5px 3.3rem 0 5rem;
}
.post-tags {
  margin: 5px 3.3rem 0.85rem 5rem;
}
.post-stats {
  display: flex;
  border-top: 1px solid #ebebeb;
  justify-content: space-evenly;
  height: 34px;
}
.post-stats-divider {
  width: 1px;
  height: 65%;
  margin: auto 8px;
  vertical-align: middle;
  position: relative;
}
.post-stats span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8a93a0;
  font-size: 0.9rem;
}
</style>
