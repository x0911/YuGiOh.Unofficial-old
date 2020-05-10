import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let app_title = "YuGiOh.Unofficial";

export default new Vuex.Store({
  state: {
    app_version: window.app_version ? window.app_version : "0.0.0",
    currentUser: null,
    currentUserPublic: null,
    app_title,
    router_title: "",
    isLocalhost: false,
    isOnline: false,
    update: {
      found: false,
      installed: false
    },
    appError: {
      name: "",
      server: "",
      msg: "",
      model: false
    },
    options: {
      drawer: null,
      about_drawer: null,
      fixed_sidenav: true,
      about_fixed_sidenav: true,
      mini_variant: false,
      currentTheme: "primary"
    },
    noti_options: {
      counter: 0,
      drawer: null,
      rtl_sidenav: false,
      fixed_sidenav: false,
      mini_variant: false
    },
    ads_options: {
      drawer: null,
      fixed_sidenav: true
    },
    login: {
      step: 0,
      loading: false,
      phone: {
        mask: "+20-###-###-####",
        value: ""
      },
      code: {
        mask: "######",
        value: "",
        resendTime: 60,
        timer: ""
      },
      city: {
        value: ""
      }
    },
    currentCard: null,
    currentCard_doHover: {},
    currentCard_loading: false
  },
  mutations: {
    setRouterTitle(state, val) {
      state.router_title = val;
    },
    setCurrentUser(state, val) {
      state.currentUser = val;
      // state.app.loading = false;
    }
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null);
    }
  },
  modules: {}
});
