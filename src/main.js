import "whatwg-fetch";
import Vue from "vue";
import App from "./App.vue";

// import VueSocketIO from "vue-socket.io";
// import SocketIO from "socket.io-client";

import VueFuse from "vue-fuse";
Vue.use(VueFuse);

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

const fb = require("./firebase.config");
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueLocalStorage from "vue-localstorage";

// let socket_io = new VueSocketIO({
//   debug: true,
//   connection: "http://localhost:8080",
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_"
//   }
// });
// Vue.use(socket_io);
let socket = io("http://localhost:8080");
Vue.use(VueSocketIOExt, socket);

Vue.use(VueLocalStorage, {
  name: "ls",
  bind: true
});
import LotAnim from "vue-lottie-web";
Vue.component("LotAnim", LotAnim);
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@openfonts/cairo_arabic";
import "@mdi/font/css/materialdesignicons.css";

import { mask } from "vue-the-mask"; // Note: I have modified this module core in 'node_modules' folder.
Vue.directive("mask", mask);

// a like-timeago plugin
Vue.use(require("vue-moment"));

// Charts
import VueApexCharts from "vue-apexcharts";
Vue.component("apexChart", VueApexCharts);

// Global Yu-Gi-Oh Card Design and Functions
Vue.component("yugioh-card", () =>
  import("@/components/global/yugioh-card.vue")
);

// App fab for each page
// Vue.component("app-fab", () => import("@/components/global/app-fab.vue"));

// Import Custom CSS and JS
import "@/scss/main.scss";

// Mixins
import "@/mixin/index.js";

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      created() {
        this.fetchUserPublicInfo();
        let preloader = document.querySelector("#app-preloader");
        if (preloader) {
          preloader.parentNode.removeChild(preloader);
        }
      },
      methods: {
        fetchUserPublicInfo() {
          if (user) {
            // this.$store.state.currentUserId = user.uid;
            fb.users.doc(user.uid).onSnapshot(
              record => {
                if (record.exists) {
                  let data = record.data();
                  this.$store.state.currentUserPublic = data;
                } else {
                  this.$store.state.currentUserPublic = null;
                }
              },
              error => {
                // console.log(error);
              }
            );
          } else {
            this.$store.state.currentUserPublic = null;
          }
        }
      },
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
