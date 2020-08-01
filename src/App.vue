<template>
  <div>
    <!-- <Loader /> -->
    <div v-if="isLoading">
      <Loader />
    </div>
    <router-view />
  </div>
</template>

<style>
</style>
<script>
import { mapState } from "vuex";
import axios from 'axios'
import Loader from "@/components/loader";
export default {
  components: {
    Loader,
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  created() {
    axios.interceptors.request.use(
      (config) => {
        this.$store.commit("loading", true);
        return config;
      },
      (error) => {
        this.$store.commit("loading", false);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        this.$store.commit("loading", false);
        return response;
      },
      (error) => {
        this.$store.commit("loading", false);
        return Promise.reject(error);
      }
    );
  },
};
</script>