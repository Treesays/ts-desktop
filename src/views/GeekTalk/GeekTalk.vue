<template>
  <div class="hc-container">
    <div class="hc-posts">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="热门" name="all">
          <div v-for="(post, index) in hotPosts" :key="index" class="hc-post-layout">
            <div class="hc-post-item">
              <div class="user-info">
                <div class="user-avatar">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <div class="author-info">
                  <h3>{{post.username}}</h3>
                  <span>{{post.position}} @</span>
                  <span>{{post.workplace}}</span>
                </div>
              </div>
              <div class="post-content">
                <span>{{post.content}}</span>
              </div>
              <div class="post-tags">
                <el-tag v-for="(tag, index) in post.tags" :key="index" size="small" effect="plain" class="post-tag">{{ tag }}</el-tag>
              </div>
              <div class="post-stats">
                <span>赞</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span @click="loadComments()">评论</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span>分享</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最新" name="inAuth">
          <div v-for="(post, index) in newPosts" :key="index" class="hc-post-layout">
            <div class="hc-post-item">
              <div class="user-info">
                <div class="user-avatar">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <div class="author-info">
                  <h3>{{post.username}}</h3>
                  <span>{{post.position}} @</span>
                  <span>{{post.workplace}}</span>
                </div>
              </div>
              <div class="post-content">
                <span>{{post.content}}</span>
              </div>
              <div class="post-tags">
                <el-tag v-for="(tag, index) in post.tags" :key="index" size="small" effect="plain" class="post-tag">{{ tag }}</el-tag>
              </div>
              <div class="post-stats">
                <span>赞</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span @click="loadComments()">评论</span>
                <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                <span>分享</span>
              </div>
            </div>
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
            <el-button type="success" size="small" @click="followUnfollow()">{{ isUserFollowedThisCategory ? '已关注' : '关 注'}}</el-button>
          </div>
          <div class="topic-description">
            <div style="font-weight: bold;">话题介绍:</div>
            <span>来分享下你的开心和不开心，此话题下内容统一由官方机器人账号「树洞robot」代发，本话题只讲故事~</span>
          </div>
        </div>
        <div class="topic-stats">
          <span>
            <div class="count">{{ postsCount }}</div>
            <div class="item">沸点</div>
          </span>
          <el-divider class="post-stats-divider" direction="vertical"></el-divider>
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
import "@/resources/overwrite.css";
import "@/views/styles/views-main.css";
import {
    fetchCategoryStats,
    fetchPostsByCategory,
    followUnfollow,
    isUserFollowedCategory
} from "@/services/categoryManipulate.js";
export default {
    name: "Treesays",
    data() {
        return {
            posts: null,
            followersCount: 0,
            postsCount: 0,
            isUserFollowedThisCategory: false,
            activeName: "all",
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
        currentUserId() {
            return AV.User.current() ? AV.User.current()["id"] : null;
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        loadComments() {
            // 先检查是否登录。
            if (!this.currentUserId) {
                this.$store.dispatch("showLogin", true);
            }
        },
        async followUnfollow() {
            if (!this.currentUserId) {
                this.$store.dispatch("showLogin", true);
            } else {
                const response = await followUnfollow(
                    "GeekTalk",
                    this.currentUserId
                );
                this.isUserFollowedThisCategory = response["index"] === -1;
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
                this.posts = _posts.map(post => {
                    const {
                        _serverData: {
                            category,
                            content,
                            username,
                            position,
                            workplace,
                            avatar,
                            tags,
                            upCount,
                            shareCount
                        }
                    } = post;
                    return {
                        category,
                        content,
                        username,
                        position,
                        workplace,
                        avatar,
                        tags,
                        upCount,
                        shareCount
                    };
                });
            }
        }
    },
    async mounted() {
        this.categoryStatsInit();
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
