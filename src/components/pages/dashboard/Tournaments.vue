<template>
  <div>
    <v-card>
      <v-card-title class="break-word">
        <v-row class="pa-0 ma-0">
          <v-col>
            <div>Collections</div>
            <div class="subtitle-1">
              Create a new collection or explore a demo.
            </div>
          </v-col>
          <v-col cols="12" sm="auto">
            <v-text-field
              filled
              rounded
              prepend-inner-icon="mdi-magnify"
              label="Search Collections"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card
              class="text-center"
              height="300"
              @click="new_collection.model = true"
            >
              <v-layout
                align-center
                justify-center
                align-content-center
                fill-height
              >
                <div>
                  <div><v-icon size="100">mdi-plus</v-icon></div>
                  <div>
                    <v-card-title>New Collection</v-card-title>
                  </div>
                </div>
              </v-layout>
            </v-card>
          </v-col>
          <template v-for="(c, i) in collections">
            <v-col cols="12" sm="6" md="4" lg="3" :key="i">
              <v-card
                class="collection-card"
                dark
                :to="`/dashboard/tournaments/${c.id}`"
              >
                <v-img
                  :src="c.cover ? c.cover : require(`@/assets/landing/1.jpg`)"
                  class="align-end"
                  height="300"
                  aspect-ratio="1"
                  gradient="0deg, rgba(0,0,0,0.75), rgba(0,0,0,0)"
                >
                  <div v-if="c.badge" class="collection-badge">
                    <span v-text="c.badge"></span>
                  </div>
                  <v-chip class="collection-size" color="white" light>
                    <!-- <v-avatar><v-icon>mdi-help-circle-outline</v-icon></v-avatar> -->
                    <span v-text="c.size"></span>
                  </v-chip>
                  <v-list-item class="wrap">
                    <v-list-item-content>
                      <v-list-item-title
                        class="title"
                        v-text="c.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle style="line-height: 1.4em;">
                        {{ c.desc ? c.desc : "" | subtitle_filter }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        class="mt-2"
                        v-if="c._contributers && c._contributers.length > 0"
                      >
                        <template v-for="(con, i) in c._contributers">
                          <v-tooltip
                            bottom
                            :key="i"
                            v-if="i < contributers_limit"
                          >
                            <template v-slot:activator="{ on }">
                              <v-avatar v-on="on" size="25">
                                <v-img
                                  :src="
                                    require(`@/assets/landing/${con.img}.jpg`)
                                  "
                                ></v-img>
                              </v-avatar>
                            </template>
                            <span v-text="con.name"></span>
                          </v-tooltip>
                        </template>
                        <v-tooltip
                          bottom
                          v-if="
                            c._contributers &&
                              c._contributers.length > contributers_limit
                          "
                        >
                          <template v-slot:activator="{ on }">
                            <v-avatar
                              color="white black--text"
                              size="30"
                              v-on="on"
                            >
                              +{{ c._contributers.length - contributers_limit }}
                            </v-avatar>
                          </template>
                          <div>
                            <template v-for="(co, i) in c._contributers">
                              <div
                                :key="i"
                                v-text="co.name"
                                v-if="i > contributers_limit - 1"
                              ></div>
                            </template>
                          </div>
                        </v-tooltip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-img>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog scrollable max-width="450" v-model="new_collection.model">
      <v-card
        :loading="new_collection.loading ? 'white' : false"
        :disabled="new_collection.loading"
        loader-height="7"
      >
        <v-card-title class="primary white--text">
          <v-row>
            <v-col class="py-0">
              New Collection
            </v-col>
            <v-col cols="auto" class="py-0">
              <v-btn @click="new_collection.model = false" icon dark>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <v-text-field
            label="Collection Name"
            filled
            rounded
            hint="* It's prefered to use a keyword(s) describes the type of questions in your collection."
            persistent-hint
            v-model="new_collection.name"
            counter="30"
            class="mb-2"
            maxlength="30"
            :error-messages="
              new_collection.name_error
                ? '* Collections need to have a valid name'
                : ''
            "
          ></v-text-field>
          <div v-show="new_collection.show_advanced">
            <v-textarea
              rounded
              filled
              label="Describe your collection"
              hint="* What is your collection about? You can press '<span class='font-weight-simibold'>Enter</span>' to go to a new line"
              persistent-hint
              counter="100"
              row-height="20"
              rows="1"
              auto-grow
              v-model="new_collection.desc"
              class="mb-2"
              maxlength="100"
            >
              <template v-slot:message="{ message, key }">
                <div :key="key" v-html="message"></div>
              </template>
            </v-textarea>
            <v-file-input
              rounded
              filled
              show-size
              label="Collection Cover"
              hint="* Upload a background cover image for your collection. Only accepts JPEG and PNG formats."
              persistent-hint
              prepend-icon=""
              v-model="new_collection.cover"
              counter="1"
            ></v-file-input>
          </div>
          <div class="mt-4">
            <v-btn-toggle
              color="primary"
              v-model="new_collection.show_advanced"
            >
              <v-btn
                color="primary"
                :value="true"
                small
                text
                class="text-capitalize"
              >
                Optional Fields
                <span class="mx-1"></span>
                <v-icon small
                  >mdi-chevron-{{
                    new_collection.show_advanced ? "up" : "down"
                  }}</v-icon
                >
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-menu offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn large class="text-none" text v-on="on">
                <v-icon
                  v-text="
                    new_collection.audiences[new_collection.audience].icon
                  "
                ></v-icon>
                <span class="mx-1"></span>
                <span
                  v-text="
                    new_collection.audiences[new_collection.audience].text
                  "
                ></span>
                <span></span>
              </v-btn>
            </template>
            <v-list max-width="350" three-line>
              <v-subheader v-text="'Share with'"></v-subheader>
              <v-list-item-group
                mandatory
                color="primary"
                v-model="new_collection.audience"
              >
                <template v-for="(val, key, i) in new_collection.audiences">
                  <v-list-item :key="i" :value="key">
                    <v-list-item-icon>
                      <v-icon v-text="val.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="val.text"></v-list-item-title>
                      <v-list-item-subtitle v-text="val.desc">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn
            large
            class="text-capitalize px-6"
            text
            v-text="'Cancel'"
            @click="new_collection.model = false"
          ></v-btn>
          <v-btn
            large
            v-text="'Create'"
            class="text-capitalize px-6"
            color="primary"
            @click="addCollection"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.collection-card {
  .align-end {
    position: relative;
    // overflow: visible;
    .collection-size {
      position: absolute;
      top: 1rem;
      right: 1rem;
      border: 2px solid black !important;
      // padding: 5px 10px 5px 0;
      // .v-icon {
      //   margin-inline-end: 5px;
      // }
    }
    .collection-badge {
      position: absolute;
      top: 12px;
      left: -20px;
      background: var(--v-error-base);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      border-radius: 50%;
      width: 90px;
      text-align: center;
    }
  }
}
</style>

<script>
const fb = require("@/firebase.config.js");
export default {
  name: "dashboard-tournaments",
  mounted() {
    this.getCollections();
  },
  methods: {
    getCollections() {
      let user = this.currentUser();
      fb.collections.where("_admins", "array-contains", user.uid).onSnapshot(
        records => {
          this.$set(this, "collections", []);
          let size = records.size,
            counter = 0;
          if (size > 0) {
            records.forEach(c => {
              let data = c.data();
              data["id"] = c.id;
              data["_isAdmin"] = !data._contributers.includes(user.uid);
              this.$set(this.collections, counter, data);
              counter++;
            });
          }
        },
        error => {
          // console.log(error);
        }
      );
    },
    hideAddModel() {
      this.new_collection.model = false;
    },
    addCollection() {
      let user = this.currentUser(),
        {
          name: name,
          desc: desc,
          cover: cover,
          audience: audience
        } = this.new_collection;
      if (name.trim().length > 0) {
        this.new_collection.name_error = false;
        fb.collections
          .add({
            _admins: [user.uid],
            _contributers: [],
            name,
            desc,
            cover,
            audience,
            size: 0
          })
          .then(uid => {
            this.hideAddModel();
            // console.log(uid);
          })
          .catch(error => {
            // console.log(error);
          });
        if (!this.appConnection()) {
          this.hideAddModel();
        }
      } else {
        this.new_collection.name_error = true;
      }
    }
  },
  data: () => ({
    new_collection: {
      show_advanced: false,
      loading: false,
      model: false,
      name: "",
      name_error: false,
      desc: "",
      cover: null,
      audience: "friends",
      audiences: {
        only_me: {
          icon: "mdi-face",
          text: "Only me",
          desc: "Only you can see and modify this collection."
        },
        friends: {
          icon: "mdi-account-group",
          text: "Friends",
          desc:
            "Your friends can see this collection, but only you can modify it."
        },
        public: {
          icon: "mdi-earth",
          text: "Public",
          desc: "Everybody can see this collection, but only you can modify it."
        }
      }
    },
    contributers_limit: 4,
    collections: []
    // collections: [
    //   {
    //     id: "12354",
    //     name: "Medical Questions",
    //     desc:
    //       "I created this collection to have a great number of medical questions in one place.",
    //     size: 45,
    //     cover: "1",
    //     contributers: [
    //       {
    //         name: "Hamdi Mohamed",
    //         img: "1"
    //       }
    //     ],
    //     badge: "Demo"
    //   },
    //   {
    //     id: "19556",
    //     name: "Football Questions",
    //     desc: "",
    //     size: 16,
    //     cover: "2",
    //     contributers: [
    //       {
    //         name: "Hamdi Mohamed",
    //         img: "1"
    //       },
    //       {
    //         name: "Fatma Abdelrahman",
    //         img: "2"
    //       },
    //       {
    //         name: "Mariam Mohamed",
    //         img: "3"
    //       },
    //       {
    //         name: "Ahmed Dahi",
    //         img: "4"
    //       },
    //       {
    //         name: "Abdelrahman Makled",
    //         img: "1"
    //       },
    //       {
    //         name: "Mohamed Yassen",
    //         img: "2"
    //       },
    //       {
    //         name: "Noor Essayed",
    //         img: "3"
    //       }
    //     ],
    //     badge: "Demo"
    //   }
    // ]
  }),
  filters: {
    subtitle_filter(v) {
      let len = 65;
      return v.length > len ? v.substr(0, len) + "..." : v;
    }
  }
};
</script>
