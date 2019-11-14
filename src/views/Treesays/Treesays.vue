<template>
  <div class="hc-container">
    <div class="hc-posts">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="热门"
          name="all"
        >
          <div
            v-for="post in hotPosts"
            :key="post.id"
            class="hc-post-layout"
          >
            <div class="hc-post-item">
              <div class="user-info">
                <div class="user-avatar">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
                <el-divider
                  class="post-stats-divider"
                  direction="vertical"
                ></el-divider>
                <span>评论</span>
                <el-divider
                  class="post-stats-divider"
                  direction="vertical"
                ></el-divider>
                <span>分享</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="最新"
          name="inAuth"
        >
          <div
            v-for="post in newPosts"
            :key="post.id"
            class="hc-post-layout"
          >
            <div class="hc-post-item">
              <div class="user-info">
                <div class="user-avatar">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
                <el-divider
                  class="post-stats-divider"
                  direction="vertical"
                ></el-divider>
                <span>评论</span>
                <el-divider
                  class="post-stats-divider"
                  direction="vertical"
                ></el-divider>
                <span>分享</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="hc-form">
      <el-card class="box-card">
        <el-card class="add-mt">
          <div class="author-wrap">
            <el-avatar
              shape="square"
              :size="50"
              :src="squareUrl"
            >
            </el-avatar>
            <h5>{{ author.name }}</h5>
            <el-button
              type="success"
              plain
            >关注</el-button>
          </div>
          <h5>话题介绍</h5>
          <p class="remark fs-s">{{author.remark}}</p>
          <el-row :gutter="20">
            <el-col
              class="text-center"
              :span="12"
            >
              <div class="grid-content bg-purple">
                <p>{{author.hot}}</p>
                <small>沸点</small>
              </div>
            </el-col>
            <el-col
              class="text-center"
              :span="12"
            >
              <div class="grid-content bg-purple">
                <p>{{author.notice}}</p>
                <small>关注</small>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-card>
      <el-card>
        <div
          slot="header"
          class="clearfix"
        >
          <span class="fs-m">共有{{author.readers}}人参加</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >全部 ></el-button>
        </div>
        <div class="readers-wrap">
          <div
            class="text-center avatar"
            v-for="item in reader"
            :key="item.id"
          >
            <el-avatar
              :size="50"
              :src="item.url"
            >
            </el-avatar>
            <small class="limit-width text-hidden">{{item.name}}</small>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import './overwrite.css'
export default {
  name: 'Treesays',
  data() {
    return {
      activeName: 'all',
      labelPosition1: 'top',
      labelPosition2: 'left',
      rules: {
        title: [
          {
            required: true,
            message: '请输入求助标题',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入求助内容',
            trigger: 'blur'
          },
          {
            min: 15,
            max: 2000,
            message: '长度在 15 到 2000 个字符',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '请输入所在区域',
            trigger: 'change'
          }
        ],
        detailedAddr: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 50,
            message: '长度在 8 到 50 个字符',
            trigger: 'blur'
          }
        ],
        contactPerson: [
          {
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        contactDetail: [
          {
            required: true,
            message: '请输入联系方式',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      posts: [
        {
          id: 1,
          content:
            '缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。',
          imgAttachment: [],
          categories: [{ id: 1, name: '代码写诗' }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: '校长不读书',
                userAvatar:
                  'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                content: '自己顶',
                replies: [
                  {
                    id: 3,
                    username: '皓哥',
                    userAvatar:
                      'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                    content: '帮校长顶'
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: '校长',
            position: '前端开发工程师',
            company: '阿里蚂蚁金服体验部',
            avatar:
              'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4'
          },
          status: 'hot'
        },
        {
          id: 2,
          content:
            '缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。',
          imgAttachment: [],
          categories: [{ id: 1, name: '代码写诗' }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: '校长不读书',
                userAvatar:
                  'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                content: '自己顶',
                replies: [
                  {
                    id: 3,
                    username: '皓哥',
                    userAvatar:
                      'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                    content: '帮校长顶'
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: '校长',
            position: '前端开发工程师',
            company: '阿里蚂蚁金服体验部',
            avatar:
              'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4'
          },
          status: 'hot'
        },
        {
          id: 3,
          content:
            '缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。',
          imgAttachment: [],
          categories: [{ id: 1, name: '代码写诗' }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: '校长不读书',
                userAvatar:
                  'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                content: '自己顶',
                replies: [
                  {
                    id: 3,
                    username: '皓哥',
                    userAvatar:
                      'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                    content: '帮校长顶'
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: '校长',
            position: '前端开发工程师',
            company: '阿里蚂蚁金服体验部',
            avatar:
              'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4'
          },
          status: 'hot'
        },
        {
          id: 4,
          content:
            '缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。',
          imgAttachment: [],
          categories: [{ id: 1, name: '代码写诗' }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: '校长不读书',
                userAvatar:
                  'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                content: '自己顶',
                replies: [
                  {
                    id: 3,
                    username: '皓哥',
                    userAvatar:
                      'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                    content: '帮校长顶'
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: '校长',
            position: '前端开发工程师',
            company: '阿里蚂蚁金服体验部',
            avatar:
              'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4'
          },
          status: 'new'
        },
        {
          id: 5,
          content:
            '缩略图到大图无缝切换，可以显示大长图、gif图片。功能完善、性能良好、扩展方便、使用简单。',
          imgAttachment: [],
          categories: [{ id: 1, name: '代码写诗' }],
          upCount: 0,
          shareCount: 0,
          comments: {
            count: 10,
            details: [
              {
                id: 1,
                username: '校长不读书',
                userAvatar:
                  'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                content: '自己顶',
                replies: [
                  {
                    id: 3,
                    username: '皓哥',
                    userAvatar:
                      'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4',
                    content: '帮校长顶'
                  }
                ]
              }
            ]
          },
          authorInfo: {
            name: '校长',
            position: '前端开发工程师',
            company: '阿里蚂蚁金服体验部',
            avatar:
              'https://avatars2.githubusercontent.com/u/13238103?s=460&v=4'
          },
          status: 'new'
        }
      ],
      squareUrl:
        'https://mirror-gold-cdn.xitu.io/168e08de7600547699f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
      author: {
        name: '树洞一下',
        remark: '话题简介这里是阿萨德不看的',
        hot: '1485',
        notice: '1822',
        readers: '3891'
      },
      reader: [
        {
          id: 0,
          name: '校长',
          url:
            'https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
        },
        {
          id: 1,
          name: '皓',
          url:
            'https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
        },
        {
          id: 2,
          name: '周周',
          url:
            'https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
        },
        {
          id: 3,
          name: '无名人士灭绝师太',
          url:
            'https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
        }
      ]
    }
  },
  computed: {
    hotPosts() {
      return this.posts.filter(post => post.status === 'hot')
    },
    newPosts() {
      return this.posts.filter(post => post.status === 'new')
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
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
  background-color: #f4f4f5;
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
.add-mt {
  margin-top: 100px;
  min-height: 200px;
}
h5 {
  margin: 5px 0;
}
.author-wrap {
  text-align: center;
  z-index: 1;
}
.fs-s {
  font-size: 12px;
}
.fs-m {
  font-size: 16px;
}
.text-center {
  text-align: center;
}
.box-card {
  margin-bottom: 10px;
}
.avatar {
  display: inline-block;
  width: 25%;
}
.flex-row {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
}
.flex-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.limit-width {
  display: block;
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: #909090;
}
.text-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
