<template>
  <div class="hc-container">
    <div class="hc-posts">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="热门" name="hotPosts">
          <div
            class="infiniteScrollWrapper"
            v-infinite-scroll="loadPosts"
            infinite-scroll-disabled="scrollDisabled"
          >
            <div v-for="post in hotPosts" :key="post.id" class="hc-post-layout">
              <Post :post="post" />
            </div>
            <p v-if="loading" style="margin-top:10px;" class="loading">
              <span></span>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最新" name="newPosts">
          <div
            class="infiniteScrollWrapper"
            v-infinite-scroll="loadPosts"
            infinite-scroll-disabled="scrollDisabled"
          >
            <div v-for="post in newPosts" :key="post.id" class="hc-post-layout">
              <Post :post="post" />
            </div>
            <p v-if="loading" style="margin-top:10px;" class="loading">
              <span></span>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="hc-form">
      <el-card class="box-card" shadow="never">
        <div class="topic-wallpaper">
          <span class="wallpaper"></span>
        </div>
        <div class="topic-intro">
          <el-avatar class="topic-avatar" shape="square" :size="50"></el-avatar>
          <div class="topic-intro-main">
            <span class="topic-title">{{ topicInfo.name }}</span>
            <el-button type="success" size="small" @click="followUnfollow()">{{
              isUserFollowedThisCategory ? "已关注" : "关 注"
            }}</el-button>
          </div>
          <div class="topic-description">
            <div style="font-weight: bold;">话题介绍:</div>
            <span
              >来分享下你的开心和不开心，此话题下内容统一由官方机器人账号「树洞robot」代发，本话题只讲故事~</span
            >
          </div>
        </div>
        <div class="topic-stats">
          <span>
            <div class="count">{{ postsCount }}</div>
            <div class="item">沸点</div>
          </span>
          <el-divider
            class="post-stats-divider"
            direction="vertical"
          ></el-divider>
          <span>
            <div class="count">{{ followersCount }}</div>
            <div class="item">关注</div>
          </span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post/Post";
import "@/resources/overwrite.css";
import "@/views/styles/views-main.css";
import {
  fetchCategoryStats,
  fetchPostsByCategory,
  followUnfollow,
  isUserFollowedCategory,
  fromPostsAPIResponse
} from "@/services/categoryManipulate.js";

export default {
  name: "Treesays",
  components: {
    Post
  },
  data() {
    return {
      loading: false,
      pageCount: 0,
      noMore: false,
      posts: [],
      followersCount: 0,
      postsCount: 0,
      isUserFollowedThisCategory: false,
      activeName: "hotPosts",
      labelPosition1: "top",
      labelPosition2: "left",
      topicInfo: {
        name: "树洞一下"
      },
      squareUrl:
        "https://mirror-gold-cdn.xitu.io/168e08de7600547699f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
    };
  },
  computed: {
    hotPosts() {
      return this.posts
        ? this.posts.filter(post => post.tags.length === 1)
        : []; //后续更改
    },
    newPosts() {
      return this.posts
        ? this.posts.filter(post => post.tags.length !== 1)
        : []; //后续更改
    },
    scrollDisabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async followUnfollow() {
      if (!this.currentUserId) {
        this.$store.dispatch("showLogin", true);
      } else {
        const response = await followUnfollow("GeekTalk", this.currentUserId);
        this.isUserFollowedThisCategory = response["index"] === -1;
      }
    },
    loadPosts() {
      if (this.noMore) {
        return;
      }
      this.loading = true;
      setTimeout(async () => {
        this.pageCount += 1;
        await this.fetchPosts(this.pageCount);
        this.loading = false;
      }, 2000);
    },
    async fetchPosts(pageSize) {
      const _posts = await fetchPostsByCategory("GeekTalk", pageSize);
      this.noMore = !(_posts && _posts.length) ? true : false;
      if (_posts) {
        this.posts = this.posts.concat(_posts.map(fromPostsAPIResponse));
      }
    },
    async categoryStatsInit() {
      const {
        attributes: { followers, posts }
      } = await fetchCategoryStats("GeekTalk");
      this.followersCount = followers.length;
      this.postsCount = posts.length;
      const _posts = await fetchPostsByCategory("GeekTalk");
      if (_posts) {
        this.posts = _posts.map(fromPostsAPIResponse);
      }
    }
  },
  async mounted() {
    await this.categoryStatsInit();
    if (this.currentUserId) {
      this.isUserFollowedThisCategory = await isUserFollowedCategory(
        "GeekTalk",
        this.currentUserId
      );
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.topic-wallpaper .wallpaper {
  background-image: url("~@/assets/treesays_talk.png");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 120%;
}
.topic-intro .topic-avatar {
  background-image: url("~@/assets/treesays_talk.png");
  background-size: cover;
  background-position-x: 50%;
}
</style>
