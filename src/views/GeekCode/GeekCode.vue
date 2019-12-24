<template>
    <div class="hc-container">
        <div class="hc-posts">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="热门" name="hotPosts">
                    <div class="add-height" v-infinite-scroll="load" style="overflow-y:auto">
                      <div v-for="post in hotPosts" :key="post.id" class="hc-post-layout">
                          <Post :post="post" />
                      </div>
                      <div></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="最新" name="newPosts">
                    <div v-for="post in newPosts" :key="post.id" class="hc-post-layout">
                        <Post :post="post" />
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
                        <span>show出代码，show出自己，不计语言，不计行数。</span>
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
        
        <div></div>
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
    getListbyCategory,
    isUserFollowedCategory
} from "@/services/categoryManipulate.js";
export default {
    name: "Treesays",
    components: {
        Post
    },
    data() {
        return {
            posts: null,
            busy: false,
            followersCount: 0,
            postsCount: 0,
            isUserFollowedThisCategory: false,
            activeName: "hotPosts",
            labelPosition1: "top",
            labelPosition2: "left",
            topicInfo: {
                name: "代码秀"
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
                const response = await followUnfollow(
                    "GeekCode",
                    this.currentUserId
                );
                this.isUserFollowedThisCategory = response["index"] === -1;
            }
        },
        async categoryStatsInit() {
            const {
                attributes: { followers, posts }
            } = await fetchCategoryStats("GeekCode");
            this.followersCount = followers.length;
            this.postsCount = posts.length;
            const _posts = await fetchPostsByCategory("GeekCode",4,2);
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
                        },
                        id
                    } = post;
                    // 控制评论区域显示
                    let show = false;
                    return {
                        category,
                        content,
                        username,
                        position,
                        workplace,
                        avatar,
                        tags,
                        upCount,
                        shareCount,
                        id,
                        show
                    };
                })
            }
        },
        load() {
            let limitNum = 4,skinNum=2
            this.busy = true
            if( this.busy) {
            console.log('gunTMD')
            // this.posts = fetchPostsByCategory("GeekCode",limitNum++,skinNum++);
            }
        }
    },
    async mounted() {
        this.categoryStatsInit();
        if (this.currentUserId) {
            this.isUserFollowedThisCategory = await isUserFollowedCategory(
                "GeekCode",
                this.currentUserId
            );
        }
        // getListbyCategory('GeekCode')
    }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.topic-wallpaper .wallpaper {
    background-image: url("~@/assets/treesays_code.png");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 120%;
}
.topic-intro .topic-avatar {
    background-image: url("~@/assets/treesays_code.png");
    background-size: cover;
    background-position-x: 50%;
}
.add-height {
    height:200px;
}
</style>
