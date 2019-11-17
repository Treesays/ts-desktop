<template>
    <div class="hc-container">
        <div class="hc-posts">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="热门" name="all">
                    <div v-for="post in hotPosts" :key="post.id" class="hc-post-layout">
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
                                <el-tag v-for="category in post.categories" :key="category.id" size="small" effect="plain">{{ category.name }}</el-tag>
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
                    <div v-for="post in newPosts" :key="post.id" class="hc-post-layout">
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
                                <el-tag v-for="category in post.categories" :key="category.id" size="small" effect="plain">{{ category.name }}</el-tag>
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
                    <el-avatar class="topic-avatar" shape="square" :size="50">
                    </el-avatar>
                    <div class="topic-intro-main">
                        <span class="topic-title">{{ topicInfo.name }}</span>
                        <el-button type="success" size="small" plain>关 注</el-button>
                    </div>
                    <div class="topic-description">
                        <div style="font-weight: bold;">话题介绍:</div>
                        <span>
                            来分享下你的开心和不开心，此话题下内容统一由官方机器人账号「树洞robot」代发，本话题只讲故事~
                        </span>
                    </div>
                </div>
                <div class="topic-stats">
                    <span>
                        <div class="count">1000</div>
                        <div class="item">沸点</div>
                    </span>
                    <el-divider class="post-stats-divider" direction="vertical"></el-divider>
                    <span>
                        <div class="count">1200</div>
                        <div class="item">关注</div>
                    </span>
                </div>
            </el-card>
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
            topicInfo: {
                name: "树洞一下"
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
            ],
            squareUrl:
                "https://mirror-gold-cdn.xitu.io/168e08de7600547699f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1",
            author: {
                name: "树洞一下",
                remark: "话题简介这里是阿萨德不看的",
                hot: "1485",
                notice: "1822",
                readers: "3891"
            },
            reader: [
                {
                    id: 0,
                    name: "校长",
                    url:
                        "https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                },
                {
                    id: 1,
                    name: "皓",
                    url:
                        "https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                },
                {
                    id: 2,
                    name: "周周",
                    url:
                        "https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
                },
                {
                    id: 3,
                    name: "无名人士灭绝师太",
                    url:
                        "https://leancloud-gold-cdn.xitu.io/pui5ANRQcNkH6EAaPTAIPuA?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
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
        loadComments() {
          // 先检查是否登录。
          this.$store.dispatch('showLogin', true);
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
    width: 31.5%;
    background-color: #f4f4f5;
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
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    min-height: 320px;
}
.topic-wallpaper {
    display: flex;
    height: 109px;
}
.topic-wallpaper .wallpaper {
    background: url("~@/assets/treesays_wallpaper.png");
    display: inline-block;
    width: 100%;
    height: 100%;
    background-position: 50%;
    background-size: 120%;
    background-repeat: no-repeat;
    filter: blur(6.3px);
    transform: scale(1.1);
}
.topic-intro {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-bottom: 1px solid rgba(92, 96, 102, 0.1);
}
.topic-intro .topic-avatar {
    position: absolute;
    top: -1.5rem;
    background: url("~@/assets/treesays_wallpaper.png");
    background-size: cover;
    background-position-x: 50%;
}
.topic-intro .topic-intro-main {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
}
.topic-title {
    margin: 8px 0;
    font-size: 0.95rem;
    font-weight: bold;
}
.topic-description {
    font-size: 0.85rem;
    margin: 0 14px;
    margin-bottom: 12px;
}
.topic-stats {
    height: 58px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.topic-stats span {
    padding: 12px 0;
}
.topic-stats .item {
    padding-top: 6px;
    font-size: 0.85rem;
    text-align: center;
    color: #8a9aa9;
}
.topic-stats .count {
    font-weight: bold;
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
.el-form div {
    margin-bottom: 5px;
}


.align-center {
    justify-content: center;
}
</style>
