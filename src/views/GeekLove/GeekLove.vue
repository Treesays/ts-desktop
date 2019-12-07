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
                            必须的信息：<br> - 个人信息: 性别，坐标，工作 - 对另一半的期待
                        </span>
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
import { fetchCategoryStats } from "@/services/categoryManipulate.js";
export default {
    name: "GeekLove",
    data() {
        return {
            followersCount: 0,
            postsCount: 0,
            activeName: "all",
            labelPosition1: "top",
            labelPosition2: "left",
            topicInfo: {
                name: "相爱相杀"
            },
            posts: [
                {
                    id: 1,
                    content:
                        "本人上海土著，外滩soho小2厅一间，虹桥机场附近单身loft公寓一间。欲寻前端佳人共赴云雨(误),共赴幸福...",
                    imgAttachment: [],
                    categories: [{ id: 1, name: "相爱相杀" }],
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
                    content: "男，遇寻道友共论佛道",
                    imgAttachment: [],
                    categories: [{ id: 1, name: "相爱相杀" }],
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
                        name: "周周",
                        position: "前端开发工程师",
                        company: "网易教育产品部",
                        avatar:
                            "https://avatars2.githubusercontent.com/u/13238103?s=460&v=4"
                    },
                    status: "hot"
                },
                {
                    id: 3,
                    content:
                        "微信号: XXXXXXXX, 高大帅气又钱多，优点：持久(专情方面)，地点: 广州",
                    imgAttachment: [],
                    categories: [{ id: 1, name: "相爱相杀" }],
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
                        position: "在线教育主程",
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
                    categories: [{ id: 1, name: "相爱相杀" }],
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
                    categories: [{ id: 1, name: "相爱相杀" }],
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
            this.$store.dispatch("showLogin", true);
        },
        async categoryStatsInit() {
            const {
                attributes: { followers, posts }
            } = await fetchCategoryStats("GeekCode");
            this.followersCount = followers.length;
            this.postsCount = posts.length;
        }
    },
    mounted() {
        this.categoryStatsInit();
    }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.topic-wallpaper .wallpaper {
    background-image: url("~@/assets/treesays_love.png");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 120%;
}
.topic-intro .topic-avatar {
    background-image: url("~@/assets/treesays_love.png");
    background-size: cover;
    background-position-x: 50%;
}
</style>
