<template>
  <div>
    <v-navigation-drawer
      :right="$vuetify.lang.current == 'en'"
      v-model="$store.state.ads_options['drawer']"
      :temporary="!$store.state.ads_options['fixed_sidenav']"
      clipped
      touchless
      app
      class="py-4"
    >
      <v-subheader>Premiere Sponsors</v-subheader>
      <v-divider></v-divider>
      <v-list>
        <template v-for="(s, i) in sponsors">
          <v-list-item three-line :key="i">
            <v-list-item-avatar>
              <v-img
                :src="require(`@/assets/sponsors/${s.icon}`)"
                contain
                aspect-ratio="1"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                :class="s.color ? `font-weight-bold` : ''"
                :style="`color: ${s.color}`"
                v-text="s.title"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="s.desc"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="sponsors.length > i + 1" :key="i + 'd'"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "advertising",
  data: () => ({
    sponsors: [
      {
        title: "Vodafone",
        color: "#e70000",
        desc: "The future is exiting. Ready?",
        icon: "vodafone.png"
      },
      {
        title: "National Bank",
        color: "#006643",
        desc: "A bank of Egyptian people.",
        icon: "bank.png"
      },
      {
        title: "Coca Cola",
        color: "#e61d2b",
        desc: "Things go better with Coke.",
        icon: "cocacola.png"
      },
      {
        title: "Doctor Alpha",
        color: "#1277d3",
        desc: "All you need, all you deserve.",
        icon: "dr-alpha.png"
      },
      {
        title: "Diabetes Clinic",
        color: "#3375bc",
        desc: "A health record for everybody.",
        icon: "diabetes-clinic.png"
      }
    ]
  })
};
</script>
