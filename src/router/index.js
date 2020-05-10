import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const mix = require("@/mixin/fun.js");
const fb = require("@/firebase.config.js");

const routes = [
  {
    path: "*",
    name: "error_404",
    component: mix.fun.loadView("errors/e404"),
    meta: {
      title: "Not Found"
    }
  },
  {
    path: "/eauth",
    name: "eauth",
    component: mix.fun.loadView("errors/eauth"),
    meta: {
      title: "No Permission"
    }
  },
  // Global Routes
  {
    path: "/",
    name: "home",
    component: mix.fun.loadView("global/Home"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "/privacy_policy",
    name: "privacy_policy",
    component: mix.fun.loadView("global/PrivacyPolicy"),
    meta: {
      title: "Privacy Policy"
    }
  },
  {
    path: "/terms_of_use",
    name: "terms_of_use",
    component: mix.fun.loadView("global/TermsOfUse"),
    meta: {
      title: "Terms of use"
    }
  },
  // Logged Out Routes
  // {
  //   path: "/login_trouble",
  //   name: "login_trouble",
  //   component: mix.fun.loadView("out/LoginTrouble"),
  //   meta: {
  //     title: "Login Trouble",
  //     requiresNoAuth: true
  //   }
  // },
  // Logged In Routes
  {
    path: "/dashboard/:type?/:id?",
    name: "dashboard",
    component: mix.fun.loadView("in/Dashboard"),
    meta: {
      title: "Dashboard",
      requiresAuth: true
    }
  },
  {
    path: "/my-cardset/:id?",
    name: "my-cardset",
    component: mix.fun.loadView("in/Cardset"),
    meta: {
      title: "My Cardset",
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
});

router.beforeEach((to, from, next) => {
  let toNext,
    noAuthPath = "/eauth",
    authPath = "/dashboard",
    indexPath = "/index.html";
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const requiresNoAuth = to.matched.some(x => x.meta.requiresNoAuth);
  const currentUser = fb.auth.currentUser;
  if (currentUser) {
    if (!mix.fun.currentUser()) {
      mix.fun.setCurrentUser(currentUser);
    }
  } else {
    mix.fun.setCurrentUser(null);
    // let preloader = document.querySelector(".app-preloader");
    // if (preloader) {
    //   preloader.parentNode.removeChild(preloader);
    // }
  }
  if (from.path == noAuthPath && to.meta.requiresAuth) {
    // Do nothing
  } else if (from.path == authPath && to.meta.requiresNoAuth) {
    // Do nothing
  } else {
    if (requiresAuth && !currentUser) {
      toNext = noAuthPath;
    } else if (requiresNoAuth && currentUser) {
      toNext = authPath;
    } else {
      // Do nothing
    }

    if (to.name) {
      NProgress.start();
      if (to.meta.title) {
        document.title = to.meta.title + " - " + mix.vars.app_title;
      } else {
        mix.fun.return_defaults();
      }
    } else {
      mix.fun.return_defaults();
    }
    if (to.fullPath == indexPath) {
      toNext = "/";
    }
    next(toNext);
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
