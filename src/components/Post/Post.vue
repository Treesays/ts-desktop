<template>
  <div>
    <div class="hc-post-item">
      <div class="user-info">
        <div class="user-avatar">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div class="author-info">
          <h3>{{ post.username }}</h3>
          <span>{{
            `${post.position} @${post.workplace} ${post.createdAt}`
          }}</span>
        </div>
      </div>
      <div class="post-content">
        <span v-html="post.content" />
      </div>
      <div class="post-tags">
        <el-tag
          v-for="(tag, index) in post.tags"
          :key="index"
          size="small"
          effect="plain"
          class="post-tag"
          >{{ tag }}
        </el-tag>
      </div>
      <div class="post-stats">
        <span>赞</span>
        <el-divider class="post-stats-divider" direction="vertical" />
        <span @click="loadComments(post)">评论</span>
        <el-divider class="post-stats-divider" direction="vertical" />
        <span>分享</span>
      </div>
    </div>
    <transition name="comment-animation">
      <div class="post-comment-box" v-show="post.show">
        <div :id="`comments${post.id}`"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["post", "anonymous"],
  data() {
    return {
      valineConfig: {
        appId: "E0zOYOk1h0wBAkNHwFeaS63z",
        appKey: "fdFmkUavVqNrbP2PC6NRsRUj",
        notify: false,
        verify: false,
        avatar: "robohash",
        placeholder: this.anonymous ? "本版块留言将全部匿名" : "欢迎留言",
        meta: ["nick"],
        pageSize: 5
      }
    };
  },
  computed: {
    currentUserId() {
      return AV.User.current() ? AV.User.current()["id"] : null;
    },
    currentUser() {
      return AV.User.current()
        ? AV.User.current()["attributes"]["username"]
        : null;
    }
  },
  methods: {
    applyValineSettings(post) {
      const toolbarElement = document.querySelector(`#comments${post.id}`);
      const nickNameInput = toolbarElement
        .querySelector(".vheader")
        .querySelector("input[name='nick']");
      if (this.anonymous && toolbarElement) {
        // 匿名版块隐藏信息输入条
        if (nickNameInput) {
          nickNameInput.value = "";
          toolbarElement.querySelector(".vheader").style.display = "none";
        }
        return;
      }
      nickNameInput.value = this.currentUser;
    },
    updateNickName(nickname) {
      const ValineCache = JSON.parse(localStorage.getItem("ValineCache"));
      if (nickname === ValineCache.nick) {
        return;
      } else {
        ValineCache.nick = nickname;
      }

      localStorage.setItem("ValineCache", JSON.stringify(ValineCache));
    },
    loadComments(post) {
      // 先检查是否登录。
      // 控制评论区域显示
      if (!this.currentUserId) {
        this.$store.dispatch("showLogin", true);
      } else {
        post["show"] = post["show"] !== true;
        // 启动valine
        this.anonymous
          ? this.updateNickName("")
          : this.updateNickName(this.currentUser);
        const VALINE_CONFIG = {
          ...this.valineConfig,
          el: `#comments${post.id}`,
          path: post.id
        };
        new this.$Valine(VALINE_CONFIG);
        this.applyValineSettings(post);
      }
    }
  },
  mounted() {
    if (window.onStorage === undefined) {
      window.onStorage = () => {
        this.loadComments(post);
      };
    } else {
      return;
    }
  },
  destroyed() {
    window.onStorage = undefined;
  }
};
</script>

<style scoped></style>
