<template>
  <v-menu
    v-model="menu_model"
    transition="slide-y-transition"
    bottom
    :close-on-content-click="true"
    :open-on-click="false"
    :open-on-hover="false"
  >
    <template v-slot:activator="{ on }">
      <v-card
        @contextmenu.prevent="menu_model = true"
        v-on="on"
        @mouseover="getCardInfo"
        @mouseleave="resetCardHover"
        class="d-inline-block mx-1 yu-card"
        :width="card_size.w"
        :height="card_size.h"
      >
        <v-img
          :src="require(`@/cards/pics_small/${card.id}.jpg`)"
          contain
          aspect-ratio="1"
          :width="card_size.w"
          :height="card_size.h"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular
                indeterminate
                color="primary"
                size="25"
              ></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-card>
    </template>
    <v-card min-width="220">
      <v-card-title>Move To</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-0 pt-0">
        <v-list class="px-0 py-0">
          <template v-for="(item, i) in move_places">
            <v-list-item
              :disabled="where_iam == item.to"
              :key="i"
              @click="moveCard(item.to)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "yugioh-card",
  props: ["card", "deck_id", "where_iam"],
  data: () => ({
    card_size: {
      w: (168 / 7) * 3,
      h: (246 / 7) * 3
    },
    menu_model: false,
    move_places: [
      {
        to: "main",
        text: "Main deck"
      },
      {
        to: "side",
        text: "Side deck"
      },
      {
        to: "all_cards",
        text: "All cards"
      }
    ]
  }),
  methods: {
    getCardInfo() {
      let card = this.card;
      this.$set(this.$store.state.currentCard_doHover, card.id, true);
      setTimeout(() => {
        if (this.$store.state.currentCard_doHover[card.id]) {
          this.$set(this.$store.state, "currentCard", card);
        }
      }, 100);
    },
    resetCardHover() {
      let { id } = this.card;
      this.$set(this.$store.state.currentCard_doHover, id, false);
    },
    moveCard(to) {
      let { id } = this.card,
        deck_id = this.deck_id,
        where_iam = this.where_iam,
        places = ["main", "side"];
      if (deck_id) {
        if (places.includes(to)) {
          this.fb.decks.doc(deck_id).update({
            [to]: this.fb.firebase.firestore.FieldValue.arrayUnion(id),
            [where_iam]: this.fb.firebase.firestore.FieldValue.arrayRemove(id)
          });
          this.$emit("card_updated");
        } else {
          this.fb.decks.doc(deck_id).update({
            [where_iam]: this.fb.firebase.firestore.FieldValue.arrayRemove(id)
          });
          this.$emit("card_updated");
        }
      } else {
        console.log("Please select a deck first");
      }
    }
  }
};
</script>
