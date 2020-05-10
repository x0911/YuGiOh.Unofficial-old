<template>
  <div>
    <v-card>
      <v-card-title>Download Yu-Gi-Oh images</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-progress-linear
          :value="perc"
          height="10"
          rounded
        ></v-progress-linear>
        <div>Downloaded {{ progress }} of {{ card_num }} images.</div>
        <div>Total Downloaded: {{ imgs_progress }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="px-4">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          outlined
          :disabled="card_num > 0"
          @click="getFullNumber"
          >Get Full Number</v-btn
        >
        <v-btn
          @click="startDownload"
          :disabled="started"
          color="primary"
          class="px-6"
          >Start Downloading</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "home-logged-in",
  data: () => ({
    started: false,
    progress: 0,
    imgs_progress: 0,
    card_num: 10616,
    perc: 0
  }),
  sockets: {
    progress_updated(data) {
      this.$set(this, "progress", data);
    },
    imgs_progress_updated(data) {
      this.$set(this, "imgs_progress", data);
    },
    imgs_error(err) {
      console.log(err);
    }
  },
  watch: {
    progress(v) {
      let perc = (v / this.card_num) * 100;
      this.$set(this, "perc", perc);
    }
  },
  methods: {
    startDownload() {
      // this.$socket.client.emit("startDownload", true);
      this.$socket.client.emit("resizeImages", true);
    },
    getFullNumber() {}
  }
};
</script>
