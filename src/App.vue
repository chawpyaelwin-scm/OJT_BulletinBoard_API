<template>
  <div id="app">
    <div>
      <TheHeader v-if="role"/>
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/component/TheHeader.vue";

export default {
   components: {
    TheHeader,
  },
  data() {
      return {
        role: localStorage.getItem("role")
      }
    },
};
</script>
<style>
#app {
  height: 100%;
}
</style>