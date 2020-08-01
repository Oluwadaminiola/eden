<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-lg-6"></div>
            <div class="col-lg-3">
              <div class="input-group lightform mb-3">
                <div class="input-group-append pl-2">
                  <img src="../../public/img/search.svg" alt />
                </div>
                <input type="text" placeholder="Search here" v-model="search" class="form-control" />
              </div>
            </div>
            <div class="col-lg-3">
              <select name id v-model="selectedCategory" class="form-control">
                <option value="all">All</option>
                <option v-for="sub in subreddits" :key="sub" :value="sub">{{sub}}</option>
              </select>
            </div>
            <div class="col-lg-12">
              <p>{{selectedCategory}}</p>
            </div>
            <div class="col-lg-4 mb-3" v-for="(post, index) in filteredPosts" :key="index">
              <div class="post">
                <div class="header_post">
                  <a
                    :href="post.data.url"
                    target="_blank"
                    v-if="post.data.thumbnail == 'default' || post.data.thumbnail == 'self' "
                  >
                    <img
                      src="https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      alt="images"
                    />
                  </a>
                  <a :href="post.data.url" target="_blank" v-else>
                    <img :src="post.data.thumbnail" alt="images" />
                  </a>
                </div>

                <div class="body_post">
                  <div class="post_content">
                    <h1>{{post.data.title.substring(0, 100)}}</h1>
                    <p></p>

                    <div class="bottom">
                      <div class="postedBy">
                        <span>Created</span>
                        <p class="m-0">{{post.data.created_utc}}</p>
                      </div>
                      <div class="container_tags">
                        <div class="tags">
                          <p class="text-right m-0">
                            <span>VOTES</span>
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i class="far fa-thumbs-up"></i>
                              </span>
                              <span>{{post.data.ups}}</span>
                            </li>
                            <li>
                              <span>
                                <i class="far fa-thumbs-down"></i>
                              </span>
                              <span>{{post.data.downs}}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-4">
              <div class="d-flex justify-content-end">
                <div class="btn-group ml-auto mt-5">
                  <button
                    type="button"
                    v-if="page != 1"
                    @click="page--"
                    class="btn btn-sm btn-p fs-12 ff-a"
                  >PREV</button>
                  <button
                    type="button"
                    class="btn btn-sm btn-p fs-12 ff-a"
                    v-for="pageNumber in pages.slice(page-1, page+5)"
                    v-bind:key="pageNumber"
                    @click="page = pageNumber"
                  >{{pageNumber}}</button>
                  <button
                    type="button"
                    @click="page++"
                    v-if="page < pages.length"
                    class="btn btn-sm btn-p fs-12 ff-a"
                  >NEXT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tab from "@/components/tab.vue";
import tabs from "@/components/tabs.vue";

export default {
  name: "Home",
  data() {
    return {
      search: "",
      selectedCategory: "all",
      postsfiltered: [],
      index: Number,
      page: 1,
      perPage: 6,
      pages: [],
    };
  },
  components: {
    tab,
    tabs,
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.postsCount / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  mounted() {
    this.$store.dispatch("fetchPosts");
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    postsCount() {
      return this.posts.length;
    },
    subreddits() {
      let subs = this.posts
        .map((item) => item.data.subreddit)
        .filter((item, i, arr) => arr.indexOf(item) === i)
        .sort((a, b) => a - b)
        .map((item) => item);
      return subs;
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
    filteredPosts() {
      var category = this.selectedCategory;

      if (category === "all") {
        if (this.search) {
          return this.posts.filter((item) => {
            return item.data.title
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
        } else {
          return this.paginate(this.posts);
        }
      } else {
        return this.posts.filter((item) => {
          return item.data.subreddit === category;
        });
      }
    },
  },
};
</script>
