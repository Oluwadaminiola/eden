<template>
  <div v-show="isActive">
    <slot></slot>
    <div class="row">
      <div class="col-lg-4 mb-3" v-for="(post, index) in posts" :key="index">
        <!-- dcsdcsd -->
        {{post}}
        <!-- <div class="post">
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
                  <p class="m-0">{{post.data.created_utc | dateFormat}}</p>
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: { required: true },
    selected: { default: false },
    post: {},
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    href() {
      return "#" + this.name.toLowerCase().replace(/ /g, "-");
    },
    posts() {
      return this.post.posts.map((item) => item.posts);
    },
  },
  methods: {
    getPosts() {
      //   let posts = this.post.map((item) => item.posts);
      //   return posts;
      console.log("eda", this.post);
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>