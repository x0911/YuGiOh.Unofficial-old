<template>
  <v-app-bar
    ref="appbar"
    fixed
    :dark="!appbar_elevated"
    :color="appbar_elevated ? 'white' : 'transparent'"
    elevate-on-scroll
    class="contained"
  >
    <v-toolbar-title>
      YuGiOh.Unofficial
    </v-toolbar-title>
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
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar-out",
  mounted() {
    this.observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName);
        this.$nextTick(() => {
          this.onClassChange(newValue, m.oldValue);
        });
      }
    });
    this.observer.observe(this.$refs.appbar.$el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(" ");
      this.appbar_elevated = classList.includes("v-app-bar--is-scrolled");
    }
  },
  data: () => ({
    links: [
      {
        text: "About",
        url: "/about"
      },
      {
        text: "Contact Us",
        url: "/contact"
      },
      {
        text: "Help",
        url: "/help"
      }
    ],
    appbar_elevated: false
  }),
  computed: {}
};
</script>
