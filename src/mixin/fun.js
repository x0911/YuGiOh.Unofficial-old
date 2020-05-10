import store from "@/store";
import router from "@/router";

let vars = {
  app_title: store.state.app_title
};

let fun = {
  loadView(view) {
    return () => import(`@/views/${view}.vue`);
  },
  return_defaults() {
    document.title = vars.app_title;
    store.commit("setRouterTitle", "");
  },
  currentUser() {
    return store.state.currentUser;
  },
  setCurrentUser(user, reload = false) {
    store.commit("setCurrentUser", user);
    // store.state.app.loading = true;
    // store.state.app.loading = false;
    // if (reload) {
    //   if (router.history.current.fullPath !== "/") {
    //     router.push("/");
    //   }
    //   let href = document.location.href;
    //   document.location.href = href;
    // }
  },
  commit(to, val) {
    return store.commit(to, val);
  }
};

export { fun, vars };
