<template>
  <div v-show="isActive">
    <slot></slot>
    <div class="row py-4">
      <div class="col-lg-12">
        <p class="fs-20 ff-a fw-6 mb-1 fc-gy">{{selectedName.toString()}}</p>
        <hr />
      </div>
      <div class="col-lg-3">
        <label for class="fs-14 fc-gy ff-a">Filter by time</label>
        <select v-model="filterDate" class="form-control">
          <option value="Morning">Morning Posts</option>
          <option value="Afternoon">Afternoon Posts</option>
          <option value="Evening">Evening Posts</option>
        </select>
      </div>
      <div class="col-lg-3">
        <label for class="fs-14 fc-gy ff-a">Filter by Upvotes</label>
        <select v-model="filterVotes" class="form-control">
          <option value="1to10">1000 - 10000 Upvotes</option>
          <option value="10to50">10000 - 50000 Upvotes</option>
          <option value="50to100">50000 - 100000 Upvotes</option>
          <option value="gt100">> 100000 Upvotes</option>
        </select>
      </div>
      <div class="col-lg-3 col-sm-6 mb-3">
        <label for class="fs-14 fc-gy ff-a">Sort by:</label>

        <select class="form-control" v-model="sortPosts">
          <option value="A2Z">Highest to Lowest Upvotes</option>
          <option value="Z2A">Lowest to Highest Upvotes</option>
        </select>
      </div>
      <div class="col-lg-3 col-sm-6 mb-3">
        <label for class="fs-14 fc-gy ff-a">Search for posts</label>

        <div class="input-group lightform mb-3">
          <div class="input-group-append pl-2">
            <img src="../../public/img/search.svg" alt />
          </div>
          <input type="text" placeholder="Search posts" v-model="search" class="form-control" />
        </div>
      </div>
      <div class="col-lg-12" v-if="filteredPosts.length == 0">
        <div class="emptystate d-flex justify-content-center align-items-center flex-column">
          <img src="../../public/img/box.svg" class="img-fluid" alt />
          <p class="text-center fs-24 ff-a fc-gy">There are currently no posts in this category!</p>
        </div>
      </div>
      <div
        class="col-lg-4 col-sm-6 mb-3"
        v-else
        v-for="(post, index) in filteredPosts"
        :key="index"
      >
        <div class="post">
          <div class="header_post">
            <a
              :href="post.data.url"
              target="_blank"
              v-if="post.data.thumbnail == 'default' || post.data.thumbnail == 'self' || post.data.thumbnail == 'image' || post.data.thumbnail == 'nsfw' || post.data.thumbnail == 'spoiler' "
            >
              <img
                src="https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png"
                alt="images"  
              />
            </a>
            <a :href="post.data.url" target="_blank" v-else>
              <img :src="post.data.thumbnail" alt="images" />
            </a>
          </div>

          <div class="body_post">
            <div class="post_content">
              <h1>{{post.data.title.substring(0, 110)}}</h1>
              <p></p>

              <div class="bottom">
                <div class="postedBy">
                  <span>Created</span>
                  <p class="m-0 fs-12 ff-r">{{post.data.created | dateFormat}}</p>
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
                        <span class="fs-12 ff-a">{{post.data.ups}}</span>
                      </li>
                      <li>
                        <span>
                          <i class="far fa-thumbs-down"></i>
                        </span>
                        <span class="fs-12 ff-a">{{post.data.downs}}</span>
                      </li>
                    </ul>
                  </div>
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
import moment from "moment";
export default {
  props: {
    name: { required: true },
    selected: { default: false },
    post: {},
  },
  data() {
    return {
      isActive: false,
      search: "",
      sortPosts: "A2Z",
      filterVotes: "",
      filterDate: "",
      // posts: []
    };
  },
  computed: {
    href() {
      return "#" + this.name.toLowerCase().replace(/ /g, "-");
    },
    posts() {
      let p = this.post.posts.map((item) => item);
      let pp = p.sort((a, b) => {
        return parseFloat(b.data.ups) - parseFloat(a.data.ups);
      });
      return pp;
    },
    selectedName() {
      let group = this.posts
        .map((item) => item.data.subreddit)
        .filter((item, i, ar) => ar.indexOf(item) === i)
        .sort((a, b) => a - b)
        .map((item) => item);
      return group;
    },
    filteredPosts() {
      var category = this.sortPosts;
      var postVote = this.filterVotes;
      var postTime = this.filterDate;
      if (category === "A2Z") {
        if (this.search) {
          return this.posts.filter((item) => {
            return item.data.title
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
        } else if (postVote === "1to10") {
          return this.posts.filter((item) => {
            return item.data.ups >= 1000 && item.data.ups <= 10000;
          });
        } else if (postVote === "10to50") {
          return this.posts.filter((item) => {
            return item.data.ups > 10000 && item.data.ups <= 50000;
          });
        } else if (postVote === "50to100") {
          return this.posts.filter((item) => {
            return item.data.ups > 50000 && item.data.ups <= 100000;
          });
        } else if (postVote === "gt100") {
          return this.posts.filter((item) => {
            return item.data.ups > 100000;
          });
        } else if (postTime === "Morning") {
          return this.posts.filter((item) => {
            let time = this.timeFormat(item.data.created);
            return time >= 1 && time < 12;
          });
        } else if (postTime === "Afternoon") {
          return this.posts.filter((item) => {
            let time = this.timeFormat(item.data.created);
            return time >= 12 && time < 16;
          });
        } else if (postTime === "Evening") {
          return this.posts.filter((item) => {
            let time = this.timeFormat(item.data.created);
            return time >= 16 && time < 23;
          });
        } else {
          let asc = this.posts.sort((a, b) => {
            return parseFloat(b.data.ups) - parseFloat(a.data.ups);
          });
          return asc;
        }
      } else {
        let des = this.posts.sort((a, b) => {
          return parseFloat(a.data.ups) - parseFloat(b.data.ups);
        });
        return des;
      }
    },
  },
  mounted() {
    this.isActive = this.selected;
    $(document).ready(function () {
      $(".input-group.lightform  > input")
        .focus(function (e) {
          $(this).parent().addClass("nav-input-group-focus");
        })
        .blur(function (e) {
          $(this).parent().removeClass("nav-input-group-focus");
        });
    });
  },
  methods: {
    checkVotes() {},
    timeFormat(value) {
      var d = new Date(0);
      let dated = d.setUTCSeconds(String(value));
      return moment.utc(dated).format("HH");
    },
  },
  filters: {
    dateFormat(value) {
      var d = new Date(0);
      let dated = d.setUTCSeconds(String(value));
      return moment.utc(dated).format("lll");
    },
  },
};
</script>