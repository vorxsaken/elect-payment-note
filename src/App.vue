<template>
  <v-app style="user-select: none;">
    <topBar v-if="this.$route.name != 'Login'" />
    <v-main>
      <keep-alive include="Home">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import topBar from "../src/components/TopBar.vue"

export default {
  components: {
    topBar
  },
  created() {
    if (localStorage.getItem('id')) {
      this.$store.dispatch('getUser');
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: auto;
}

.login {
  font-family: "Pacifico" !important;
}

.text-roboto {
  font-family: "Roboto Mono";
}
</style>
