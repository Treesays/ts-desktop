import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    showLoginModal: false
}
const actions = {
    showLogin({ commit }, shouldShowLogin) {
        commit('toggleLoginModal', shouldShowLogin);
    }
}
// 更新状态
const mutations = {
    toggleLoginModal(state, shouldShowLogin) {
        state.showLoginModal = shouldShowLogin;
    }
}
// 获取状态信息
const getter = {
    loginFormStatus: state => {
        return state.showLoginModal
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getter
});
