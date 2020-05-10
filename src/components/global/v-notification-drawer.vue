<template>
  <div>
    <v-navigation-drawer
      :right="$vuetify.lang.current == 'en'"
      v-model="$store.state.noti_options['drawer']"
      :temporary="!$store.state.noti_options['fixed_sidenav']"
      app
      width="450"
      class="notis-sidebar"
    >
      <v-card tile flat>
        <v-card-title class="break-word pb-0">
          <v-row>
            <v-col>
              Notifications
            </v-col>
            <v-col cols="auto">
              <v-btn @click="$store.state.noti_options['drawer'] = false" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <v-divider></v-divider>
      <v-list v-if="counter > 0" class="pt-0">
        <template v-for="(item, i) in notifications">
          <v-skeleton-loader
            v-if="item.loader"
            loading
            :key="i + '_l'"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <v-list-item
            v-else
            :class="[!item.done ? colors[item.color].avatar + '5' : '', 'wrap']"
            color="primary"
            :to="item.url"
            exact
            :key="i"
          >
            <v-list-item-avatar
              :color="
                colors[item.color]
                  ? !item.done
                    ? colors[item.color].avatar + '4'
                    : colors[item.color].avatar + '5'
                  : 'grey lighten-3'
              "
              size="45"
              v-if="item.avatar.icon"
            >
              <lot-anim
                :autoplay="!item.done"
                renderer="svg"
                :class="[
                  `svg-${colors[item.color] ? colors[item.color].icon : ''}`,
                  item.avatar.stroke ? `stroke-${item.avatar.stroke}` : ''
                ]"
                style="height: 25px"
                v-if="item.avatar.svg"
                :animationData="getAnim(item.avatar.icon)"
              >
              </lot-anim>
              <v-icon
                v-text="item.avatar.icon"
                :color="colors[item.color] ? colors[item.color].icon : ''"
                v-else
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <v-row class="pa-0 ma-0">
                  <v-col class="pa-0 ma-0">
                    <span v-text="item.title"></span>
                  </v-col>
                  <v-col cols="auto" class="pa-0 ma-0">
                    <span class="caption" v-text="item.time"></span>
                  </v-col>
                </v-row>
              </v-list-item-title>
              <v-list-item-subtitle>{{
                item.subtitle | subtitle_filter(item.system)
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="i + '_d'"></v-divider>
        </template>
      </v-list>
      <div v-else class="px-4 py-4">
        <v-card class="text-center" flat>
          <v-card-text>
            <div class="mb-4">
              <v-icon size="100" color="grey lighten-1">mdi-bell</v-icon>
            </div>
            <div class="black--text subtitle-1">
              Your notifications live here
            </div>
            <div>
              While challenging your friends, you will get notified about your
              tournaments, achievements and badges.
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
const fb = require("@/firebase.config.js");
export default {
  name: "notification-drawer",
  mounted() {
    this.fetchNotifications();
  },
  methods: {
    fetchNotifications() {
      let user = this.currentUser(),
        counter = 0;
      fb.users
        .doc(user.uid)
        .collection("notifications")
        .orderBy("time", "desc")
        .limit(7)
        .onSnapshot(
          records => {
            this.$set(this, "notifications", []);
            let size = records.size;
            this.$set(this.$store.state.noti_options, "counter", size);
            records.forEach(el => {
              this.$set(this.notifications, counter, el.data());
              counter++;
            });
          },
          error => {
            // console.log(error);
          }
        );
    }
  },
  computed: {
    counter: {
      get() {
        return this.$store.state.noti_options.counter;
      },
      set: v => v
    }
  },
  data: () => ({
    colors: {
      primary: {
        avatar: "blue lighten-",
        icon: "primary"
      },
      error: {
        avatar: "error lighten-",
        icon: "error"
      },
      success: {
        avatar: "success lighten-",
        icon: "success"
      },
      warning: {
        avatar: "warning lighten-",
        icon: "warning darken-1"
      },
      purple: {
        avatar: "purple lighten-",
        icon: "purple"
      }
    },
    notifications: [
      {
        avatar: {
          svg: true,
          icon: "heart",
          stroke: "4"
        },
        title: "Friend Request",
        subtitle: "Jory Elmasry sent you a friend request.",
        color: "primary",
        time: "9m",
        done: true
      },
      {
        avatar: {
          svg: true,
          icon: "upload",
          stroke: "4"
        },
        title: "Video Uploaded",
        subtitle: `Shimaa Mohamed uploaded a new video "How to deal with protons?".`,
        color: "purple",
        time: "3h",
        done: true
      },
      {
        loader: true
      },
      {
        loader: true
      },
      {
        avatar: {
          svg: true,
          icon: "warning-blink",
          stroke: "4"
        },
        title: "Subscription Renewal Needed",
        subtitle: `We wish you don't miss any expreience. You still can access and complete your running tournaments.`,
        color: "error",
        time: "17h",
        system: true,
        done: true
      },
      {
        loader: true
      },
      {
        avatar: {
          svg: true,
          icon: "hand-peace",
          stroke: "4"
        },
        title: "Path Complete!",
        subtitle: `Congratulations. You have managed to complete the "Pharmacology Path".`,
        color: "success",
        time: "23h",
        done: true
      },
      {
        avatar: {
          svg: true,
          icon: "gift",
          stroke: "4"
        },
        title: "Won a Gift!",
        subtitle: `It's your lucky day. Dr. Ahmed Hassan gifted you a 4.6 ranked video.`,
        color: "warning",
        time: "13d",
        done: true
      }
    ]
  }),
  filters: {
    subtitle_filter(v, system) {
      let len = 75;
      return v.length > len && !system ? v.substr(0, len) + " ..." : v;
    }
  }
};
</script>
