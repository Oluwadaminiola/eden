<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-sm-4">
        <div class="py-3 d-sm-none">
          <label for class="fs-16 fc-gy ff-a">Choose Subreddit:</label>
          <select v-model="tabName" v-on:change="selectTab(tabName)" class="form-control">
            <option :value="tab" v-for="(tab, index) in tabs" :key="index">
              <a
                class="nav-link"
                :href="tab.href"
                :class="{ 'active': tab.isActive }"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >{{ tab.name }}</a>
            </option>
          </select>
        </div>
        <div class="d-none d-sm-block">
          <div
            class="nav flex-column nav-pills tab"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
            v-for="(tab, index) in tabs"
            :key="index"
          >
            <a
              class="nav-link"
              :href="tab.href"
              :class="{ 'active': tab.isActive }"
              @click="selectTab(tab)"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >{{ tab.name }}</a>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-sm-8">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tabs-details">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="tabs">
      <div class="nav nav-tabs">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <a
            :href="tab.href"
            :class="{ 'active': tab.isActive }"
            class="nav-link pb-3"
            @click="selectTab(tab)"
          >{{ tab.name }}</a>
        </li>
      </div>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>-->
  </div>
</template>
<script>
export default {
  props: {
    posts: {},
  },
  data() {
    return {
      tabs: [],
      selected: [],
      tabName: ''
    };
  },
  mounted() {
    this.tabs = this.$children;
    this.$nextTick(() => {
      this.selectTab(this.tabs[0]);
    });
    this.selectTab(this.tabs[1]);
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.href == selectedTab.href;
      });
    }
  },
  computed: {
    
  },
};
</script>