<template>
  <div>
    <s1></s1>
    <s2></s2>
    <s3></s3>
  </div>
</template>

<script>
let getV = v => {
  return () => import(`@/components/pages/home/out/${v}.vue`);
};
export default {
  name: "langing-page",
  components: {
    S1: getV("s1"),
    S2: getV("s2"),
    S3: getV("s3")
  },
  data: () => ({})
};
</script>
