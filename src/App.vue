<template>
  <div>
    <v-app>
      <!-- v-navigation-drawer -->
      <check-connection
        @detected-condition="handleConnectivityChange"
      ></check-connection>
      <div v-if="currentUser()">
        <!-- <ads-drawer></ads-drawer> -->
        <cardset-drawer
          v-if="$route.fullPath == '/my-cardset'"
        ></cardset-drawer>
        <notification-drawer></notification-drawer>
        <navigation-drawer></navigation-drawer>
        <app-bar-in></app-bar-in>
      </div>
      <app-bar-out v-else></app-bar-out>
      <v-content
        :class="
          `${$vuetify.lang.current}-${$vuetify.breakpoint.lgAndUp}-${
            currentUser() ? 'true' : 'false'
          }- ${$vuetify.lang.current}-${$vuetify.breakpoint.lgAndUp}-${
            currentUser() ? 'true' : 'false'
          }-${$route.fullPath == '/my-cardset'}`
        "
      >
        <!-- Just remove the above - to work -->
        <v-container fluid v-if="currentUser()">
          <router-view></router-view>
        </v-container>
        <router-view v-else></router-view>
      </v-content>
    </v-app>
    <!-- <v-app>
      <app-bar></app-bar>
      <v-content>
        <landing-page></landing-page>
      </v-content>
    </v-app> -->
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // LandingPage: () => import("@/views/out/landing-page.vue"),
    CheckConnection: () => import("v-offline"),
    AppBarIn: () => import("@/components/global/v-app-bar-in.vue"),
    AppBarOut: () => import("@/components/global/v-app-bar-out.vue"),
    NotificationDrawer: () =>
      import("@/components/global/v-notification-drawer.vue"),
    NavigationDrawer: () =>
      import("@/components/global/v-navigation-drawer.vue"),
    AdsDrawer: () => import("@/components/ads/Main.vue"),
    CardsetDrawer: () =>
      import("@/components/pages/my-cardset/Navigation-Drawer.vue")
  },
  mounted() {
    this.$store.state.isOnline = navigator.onLine ? true : false;
  },
  data: () => ({}),
  methods: {
    handleConnectivityChange(status) {
      this.$store.state.isOnline = status;
    }
  }
};
</script>
