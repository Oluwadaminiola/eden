<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <Tabs :posts="groupedPosts">
            <Tab
              v-for="(post, index) in groupedPosts"
              :key="index"
              :name="post.subreddit"
              :post="post"
              :selected="index===0"
            ></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tab from "@/components/tab.vue";
import Tabs from "@/components/tabs.vue";
import moment from "moment";
export default {
  mounted() {
    this.$store.dispatch("fetchPosts");
  },
  components: {
    Tab,
    Tabs,
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
          return {
            subreddit: item,
            posts: post,
            href: `#${item}`,
            isActive: false,
          };
        });
      console.log(group)
      return group;
    },
  },
  filters: {
    dateFormat(value) {
      var d = new Date(0);
      let dated = d.setUTCSeconds(String(value));
      return moment.utc(dated).format("hh:mm");
    },
  },
};
</script>