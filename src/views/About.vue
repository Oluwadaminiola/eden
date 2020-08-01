<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <tabs class="mt-5">
            <tab
              v-for="(post, index) in groupedPosts"
              :key="index"
              v-bind:name="post.subreddit"
              :post="post"
              :selected="index===0"
            ></tab>
          </tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tab from "@/components/tab.vue";
import tabs from "@/components/tabs.vue";
export default {
  mounted() {
    this.$store.dispatch("fetchPosts");
  },
  components: {
    tab,
    tabs,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    groupedPosts() {
      let group = this.posts
        .map((item) => item.data.subreddit)
        .filter((item, i, arr) => arr.indexOf(item) === i)
        .sort((a, b) => a - b)
        .map((item) => {
          let post = this.posts
            .filter((itm) => itm.data.subreddit == item)
            .map((itm) => itm);
          return { subreddit: item, posts: post };
        });
      return group;
    },
  },
};
</script>