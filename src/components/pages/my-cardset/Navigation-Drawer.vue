<template>
  <div>
    <v-navigation-drawer
      :right="$vuetify.lang.current == 'ar'"
      v-model="drawer"
      :temporary="false"
      app
      :mini-variant="false"
      mini-variant-width="80"
      width="320"
      class="pb-8"
    >
      <v-card
        height="100%"
        class="pb-2"
        flat
        tile
        loader-height="8"
        :loading="$store.state.currentCard_loading"
      >
        <div v-if="card">
          <div class="text-center">
            <v-img
              class="d-inline-block"
              width="320"
              height="466.698"
              :src="require(`@/cards/pics/${card.id}.jpg`)"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </div>
          <v-card-text class="py-0">
            <v-list-item class="pa-0 ma-0 wrap" :three-line="card.level > 0">
              <v-list-item-content>
                <v-list-item-title v-text="card.name"></v-list-item-title>
                <v-list-item-subtitle v-text="card.type"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="card.level > 0">
                  <v-rating
                    readonly
                    :value="card.level"
                    :length="card.level"
                    dense
                    small
                    color="yellow darken-4"
                    full-icon="mdi-star-circle"
                  >
                  </v-rating>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <div
              class="mt-2"
              v-html="
                card.desc.replace(
                  '----------------------------------------',
                  '<br><hr class=my-1>'
                )
              "
            ></div>
          </v-card-text>
        </div>
        <div v-else class="text-center">
          <div>
            <v-img
              class="d-inline-block"
              width="320"
              height="466.698"
              :src="require('@/cards/backface.png')"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </div>
          <v-card-text>
            <v-skeleton-loader type="heading" loading></v-skeleton-loader>
            <v-divider class="my-4"></v-divider>
            <v-skeleton-loader type="paragraph" loading></v-skeleton-loader>
          </v-card-text>
        </div>
      </v-card>
      <v-footer class="d-block" v-if="card && card.atk && card.def" absolute>
        <v-layout>
          <v-row>
            <v-col class="py-0">
              <span> <v-icon>mdi-sword</v-icon> / </span>
              <span v-text="card.atk"></span>
            </v-col>
            <v-col cols="auto" class="py-0">
              <span v-text="card.def"></span>
              <span> \ <v-icon>mdi-shield-half-full</v-icon> </span>
            </v-col>
          </v-row>
        </v-layout>
      </v-footer>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "cardset-navication-drawer",
  data: () => ({
    drawer: true
  }),
  computed: {
    card: {
      get() {
        return this.$store.state.currentCard;
      },
      set(v) {
        return v;
      }
    }
  }
};
</script>
