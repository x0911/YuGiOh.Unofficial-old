<template>
  <div>
    <v-card>
      <v-card-title class="wrap break-word">
        Use Deck:
        <span class="mx-2"></span>
        <v-autocomplete
          item-value="id"
          item-text="name"
          :loading="decks_loading"
          return-object
          :items="decks"
          label="Select Deck"
          single-line
          v-model="selected_deck"
          @change="selected_deck_changed"
          no-data-text="You didn't create any decks yet, Click 'Create' to do."
        ></v-autocomplete>
        <span class="mx-2"></span>
        <v-dialog v-model="new_deck.model" scrollable max-width="400">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" outlined color="primary">
              <v-icon>mdi-plus</v-icon>
              <span class="mx-1"></span>
              Create
            </v-btn>
          </template>
          <v-card :disabled="new_deck.loading" :loading="new_deck.loading">
            <v-card-title>Deck Name</v-card-title>
            <v-card-text>
              <v-text-field
                placeholder="eg: Dark Magician Superim Deck"
                v-model="new_deck.name"
                @keypress.enter="createDeck"
                persistent-hint
                hint="You can create multiple decks with the same name."
                filled
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="px-4">
              <v-spacer></v-spacer>
              <v-btn
                class="px-6"
                color="primary"
                @click="new_deck.model = false"
                outlined
                >Cancel</v-btn
              >
              <v-btn class="px-6" color="primary" @click="createDeck"
                >Create Deck</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider></v-divider>
      <v-tabs v-model="cardset_tab">
        <v-tab class="text-capitalize">
          Main Deck
          <span class="mx-1" v-if="selected_deck">
            [ {{ current_deck.length }} ]
          </span>
        </v-tab>
        <v-tab class="text-capitalize">
          Side Deck
          <span class="mx-1" v-if="selected_deck">
            [ {{ current_side.length }} ]
          </span>
        </v-tab>
        <v-tab class="text-capitalize">
          All Cards
          <span class="mx-1"> [ {{ cards.length }} ] </span>
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-card-text v-if="cards">
        <v-tabs-items v-model="cardset_tab">
          <v-tab-item>
            <div v-if="cardset_tab == 0">
              <div v-if="selected_deck">
                <div v-if="current_deck.length > 0">
                  <template v-for="(card, i) in current_deck">
                    <yugioh-card
                      @card_updated="selected_deck_changed"
                      :deck_id="selected_deck ? selected_deck.id : null"
                      :where_iam="'main'"
                      :card="card"
                      :key="i"
                    ></yugioh-card>
                  </template>
                </div>
                <div class="text-center pt-6" v-else>
                  <div class="mb-4">
                    <v-img
                      class="d-inline-block"
                      width="150"
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
                  <div class="subtitle-1">
                    No Cards in your main deck
                  </div>
                </div>
              </div>
              <div class="text-center pt-6" v-else>
                <div class="mb-4">
                  <v-img
                    class="d-inline-block"
                    width="300"
                    :src="require('@/assets/inapp/select_option.svg')"
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
                <div class="subtitle-1">
                  Please select a deck to view
                </div>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div v-if="cardset_tab == 1">
              <div v-if="selected_deck">
                <div v-if="current_side.length > 0">
                  <template v-for="(card, i) in current_side">
                    <yugioh-card
                      @card_updated="selected_deck_changed"
                      :deck_id="selected_deck ? selected_deck.id : null"
                      :where_iam="'side'"
                      :card="card"
                      :key="i"
                    ></yugioh-card>
                  </template>
                </div>
                <div class="text-center pt-6" v-else>
                  <div class="mb-4">
                    <v-img
                      class="d-inline-block"
                      width="150"
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
                  <div class="subtitle-1">
                    No Cards in your side deck
                  </div>
                </div>
              </div>
              <div class="text-center pt-6" v-else>
                <div class="mb-4">
                  <v-img
                    class="d-inline-block"
                    width="300"
                    :src="require('@/assets/inapp/select_option.svg')"
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
                <div class="subtitle-1">
                  Please select a deck to view
                </div>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div v-if="cardset_tab == 2">
              <yugioh-collection
                :cards="cards"
                :deck_id="selected_deck ? selected_deck.id : null"
                :where_iam="'all_cards'"
              ></yugioh-collection>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
    YugiohCollection: () => import("@/components/global/yugioh-collection.vue")
  },
  name: "my-cardset",
  mounted() {
    this.fetchCards();
    this.fetchDecks();
  },
  data: () => ({
    limit: 1000,
    decks: [],
    cards: [],
    current_deck: [],
    current_side: [],
    decks_loading: false,
    selected_deck: null,
    cardset_tab: 0,
    new_deck: {
      model: false,
      loading: false,
      name: ""
    }
  }),
  watch: {},
  methods: {
    testalert() {
      this.selected_deck_changed();
    },
    fetchCards() {
      const cards = require("@/cards/json/cards.json")["data"];
      this.$set(this, "cards", cards);
    },
    selected_deck_changed() {
      let { main, side } = this.selected_deck;
      this.$set(this, "current_deck", []);
      this.$set(this, "current_side", []);
      if (main) {
        let counter = 0;
        main.forEach(card_id => {
          let card = this.cards.find(obj => {
            return obj.id === card_id;
          });
          this.$set(this.current_deck, counter, card);
          counter++;
        });
      }
      if (side) {
        let _counter = 0;
        side.forEach(card_id => {
          let card = this.cards.find(obj => {
            return obj.id === card_id;
          });
          this.$set(this.current_side, _counter, card);
          _counter++;
        });
      }
    },
    fetchDecks() {
      let id = this.$store.state.currentUser.uid;
      if (id) {
        this.$set(this, "decks_loading", true);
        this.fb.decks.where("owners", "array-contains", id).onSnapshot(
          records => {
            let counter = 0;
            this.$set(this, "decks", []);
            records.forEach(record => {
              let deck = record.data();
              deck.id = record.id;
              this.$set(this.decks, counter, deck);
              counter++;
            });
            this.$set(this, "decks_loading", false);
          },
          error => {
            console.log(error);
            this.$set(this, "decks_loading", false);
          }
        );
      }
    },
    createDeck() {
      this.$set(this.new_deck, "loading", true);
      let { name } = this.new_deck,
        id = this.$store.state.currentUser.uid;
      this.fb.decks
        .add({
          name,
          owners: [id]
        })
        .then(deck => {
          this.$set(this.new_deck, "model", false);
          this.$set(this.new_deck, "name", "");
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$set(this.new_deck, "loading", false);
        });
    }
  }
};
</script>
