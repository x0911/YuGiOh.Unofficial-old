<template>
  <div>
    <v-navigation-drawer
      :right="$vuetify.lang.current == 'ar'"
      v-model="$store.state.options['drawer']"
      :temporary="
        $route.fullPath == '/my-cardset'
          ? true
          : !$store.state.options['fixed_sidenav']
      "
      app
      :mini-variant="$store.state.options['mini_variant']"
      mini-variant-width="80"
    >
      <v-card tile color="transparent" flat height="230px">
        <v-img
          width="100%"
          height="140px"
          aspect-ratio="1"
          class="align-end"
          style="overflow: visible; position: relative;"
          src=""
          gradient="to bottom, rgba(0,0,0,.05), rgba(0,0,0,.7)"
        >
          <!-- https://www.pond5.com/images/images_db/vlp/image-hero-poster.jpg -->
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-skeleton-loader
                height="100%"
                width="100%"
                type="image"
                loading
              ></v-skeleton-loader>
            </v-layout>
          </template>
          <div style="position: absolute; top: 5px; left: 5px;">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" large icon>
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
              </template>
              <span>Edit Cover Photo</span>
            </v-tooltip>
          </div>
          <div class="text-center" style="transform: translate(0, 80px)">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-avatar size="80" color="white">
                  <v-img
                    src=""
                    ref="profile_photo"
                    style="border: 4px solid white"
                  >
                    <!-- https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQToA9s3Y6-r1AO4iK79QL6hpW_6mlFDevRGvbg7Y7nc_UG2coM&s -->
                    <v-scale-transition>
                      <v-row
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out v-card--reveal"
                        style="border-radius: inherit; background: rgba(0,0,0,.6)"
                        align="center"
                        justify="center"
                      >
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn v-on="on" large icon dark>
                              <v-icon>mdi-image-edit</v-icon>
                            </v-btn>
                          </template>
                          <span>Edit Profile Photo</span>
                        </v-tooltip>
                      </v-row>
                    </v-scale-transition>
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-skeleton-loader
                          type="avatar"
                          loading
                        ></v-skeleton-loader>
                      </v-layout>
                    </template>
                  </v-img>
                </v-avatar>
              </template>
            </v-hover>
            <v-list dense rounded class="py-0">
              <v-list-item
                color="primary"
                :to="
                  getUdata('displayName', '.') == '.'
                    ? ''
                    : `/u/${$store.state.currentUser.uid}`
                "
                @click="
                  getUdata('displayName', '.') == '.'
                    ? (updateUdata.name = true)
                    : () => {}
                "
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="getUdata('displayName', 'Add your name')"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="overflow-visible"
                    v-text="`#${getUdata('degree', 'beginner')}`"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-img>
      </v-card>
      <!-- <v-divider></v-divider> -->
      <v-list rounded dense class="pt-0">
        <template v-for="(item, i) in single_items">
          <!-- <v-divider v-if="item.divider" :key="i + '_d'"></v-divider> -->
          <v-list-item
            @click="item.method ? runFun(item.method) : () => {}"
            :class="item.background"
            v-if="!item.divider"
            color="primary"
            :to="item.url"
            :key="i"
          >
            <v-list-item-avatar v-if="item.avatar.icon">
              <lot-anim
                renderer="svg"
                className="svg-grey darken-1"
                v-if="item.avatar.svg"
                style="height: 25px"
                :autoplay="item.avatar.autoplay"
                :animationData="getAnim(item.avatar.icon)"
              ></lot-anim>
              <v-icon v-text="item.avatar.icon" v-else></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <update-u-name
      :dataModel="updateUdata.name"
      @hideModel="hideUpdateUdata('name')"
    ></update-u-name>
  </div>
</template>

<script>
export default {
  name: "navigation-drawer",
  components: {
    UpdateUName: () => import("@/components/items/updateUname.vue")
  },
  data: () => ({
    updateUdata: {
      name: false,
      profile_photo: false,
      cover_photo: false
    },
    single_items: [
      {
        avatar: {
          svg: true,
          icon: "globe",
          autoplay: false
        },
        title: "Home",
        subtitle: "",
        url: "/"
      },
      {
        avatar: {
          svg: false,
          icon: "mdi-account-circle"
        },
        title: "Profile",
        subtitle: "",
        url: "/profile"
      },
      {
        divider: true
      },
      {
        avatar: {
          svg: false,
          icon: "mdi-view-dashboard"
        },
        title: "Dashboard",
        subtitle: "",
        url: "/dashboard"
      },
      {
        avatar: {
          svg: false,
          icon: "mdi-trophy"
        },
        title: "Tournaments",
        subtitle: "",
        url: "/tournaments"
      },
      {
        avatar: {
          svg: false,
          icon: "mdi-cards-outline"
        },
        title: "My Cardset",
        subtitle: "",
        url: "/my-cardset"
      },
      {
        divider: true
      },
      {
        avatar: {
          svg: false,
          icon: "mdi-cog"
        },
        title: "Settings",
        subtitle: "",
        url: "/settings"
      },
      // {
      //   divider: true
      // },
      // {
      //   avatar: {
      //     svg: false,
      //     icon: "mdi-information"
      //   },
      //   title: "About",
      //   subtitle: "",
      //   url: "/about"
      // },
      // {
      //   avatar: {
      //     svg: false,
      //     icon: "mdi-message"
      //   },
      //   title: "Contact",
      //   subtitle: "",
      //   url: "/contact"
      // },
      // {
      //   avatar: {
      //     svg: false,
      //     icon: "mdi-help-circle"
      //   },
      //   title: "Help Center",
      //   subtitle: "",
      //   url: "/help"
      // },
      {
        avatar: {
          svg: false,
          icon: "mdi-logout"
        },
        title: "Logout",
        subtitle: ""
      }
    ]
  }),
  methods: {
    runFun(fun) {
      return this[fun]();
    },
    hideUpdateUdata(toHide) {
      return (this.updateUdata[toHide] = false);
    }
  }
};
</script>
