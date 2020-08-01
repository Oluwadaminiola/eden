import Vue from 'vue'
import Vuex from 'vuex'

import { PostService } from "../services/data/posts";
const postService = new PostService();
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    isLoading: false
  },
  mutations: {
    updatePost(state, posts) {
      state.posts = posts;
    },
    loading(state, isLoading) {
      // console.log({isLoading})
      if (isLoading) {
        state.isLoading = true;
      } else{
        state.isLoading = false;
      }
    }
  },
  actions: {
    fetchPosts({ commit }) {
      try {

        postService.getPosts().then(data => {
          let posts = data.data.data.children;
          commit('updatePost', posts);
        })
      } catch (e) {
        console.error(e);

        commit('updatePost', []);
      }
    },
  },
  modules: {
  },
  getters: {
    posts: (state) => state.posts
  }
})
