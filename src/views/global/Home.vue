<template>
  <div>
    <home-in v-if="currentUser()"></home-in>
    <home-out v-else></home-out>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    HomeIn: () => import("@/components/pages/home/in.vue"),
    HomeOut: () => import("@/components/pages/home/out.vue")
  },
  data: () => ({})
};
</script>
