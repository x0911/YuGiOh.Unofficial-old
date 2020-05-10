<template>
  <div>
    Error 404 ==>
    {{ url }}
  </div>
</template>

<script>
export default {
  name: "error-404",
  data: () => ({
    url: ""
  }),
  mounted() {
    this.url = this.$route.fullPath;
    // console.log(this.$route);
  }
};
</script>
