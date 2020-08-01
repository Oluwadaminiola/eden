<template>
  <div>
    <!-- <div class="row">
      <div class="col-3">
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            v-for="tab in tabs"
            v-bind:key="tab"
            :class="{ 'active': tab.isActive }"
            :href="tab.href"
            @click="selectTab(tab)"
            class="nav-link"
            id="v-pills-home-tab"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >{{ tab.name }}</a>  
        </div>
      </div>
      <div class="col-9">
        <div class="tabs-details">
          <slot></slot>
        </div>
      </div>
    </div>-->
    <div class="tabs">
      <ul class="nav nav-tabs ad_tabs">
        <li class="nav-item pr-3" v-for="(tab, index) in tabs" :key="index">
          <a
            class="nav-link pb-3"
            :class="{ 'active': tab.isActive }"
            :href="tab.href"
            @click="selectTab(tab.post)"
          >{{ tab.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabs",

  data() {
    return { tabs: [] };
  },

  mounted() {
    this.tabs = this.$children;

    // add this :
    this.$nextTick(() => {
      this.selectTab(this.tabs[0]);
    });
    this.selectTab(this.tabs[1]);
  },

  created() {},

  methods: {
    selectTab(selectedTab) {
      console.log(selectedTab)
      // let pp = this.tabs.forEach((tab) => {
      //   tab.isActive = tab.href == selectedTab.subreddit;
      // });
      // console.log(pp)
      // console.log('sdafv ',selectedTab)
      // console.log('sda fv ',this.tabs)
    },
  },
};
</script>