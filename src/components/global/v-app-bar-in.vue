<template>
  <v-app-bar
    :clipped-right="$vuetify.lang.current == 'en'"
    :clipped-left="$vuetify.lang.current == 'ar'"
    app
    fixed
    color="white"
    :class="
      `${$vuetify.lang.current}-${$vuetify.breakpoint.lgAndUp}-${
        currentUser() ? 'true' : 'false'
      }-${$route.fullPath == '/my-cardset'}`
    "
  >
    <v-app-bar-nav-icon
      @click="$store.state.options.drawer = !$store.state.options.drawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-for="(link, i) in links">
        <v-btn
          :key="i"
          depressed
          color="transparent"
          class="text-capitalize"
          v-text="link.text"
          :to="link.url"
        ></v-btn>
      </template>
      <v-btn
        color="transparent"
        @click.stop="
          $store.state.noti_options['drawer'] = !$store.state.noti_options[
            'drawer'
          ]
        "
        depressed
      >
        <v-badge v-model="counter" color="error" overlap>
          <template v-slot:badge>{{ counter }}</template>
          <v-avatar size="25" tile>
            <lot-anim
              :autoplay="counter > 0 ? true : false"
              renderer="svg"
              :animationData="getAnim('bell')"
            ></lot-anim>
          </v-avatar>
        </v-badge>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar-in",
  methods: {},
  data: () => ({
    links: []
  }),
  computed: {
    counter: {
      get() {
        return this.$store.state.noti_options.counter;
      },
      set: v => v
    }
  }
};
</script>
