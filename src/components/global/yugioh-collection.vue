<template>
  <div>
    <div>
      <!-- Cards container -->
      <template v-for="(card, i) in rendered_cards">
        <yugioh-card
          :deck_id="deck_id"
          :where_iam="where_iam"
          :card="card"
          :key="i"
        ></yugioh-card>
      </template>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="text-center">
      <v-pagination
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        v-model="current_page"
        :length="pages"
        total-visible="10"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "yugioh-collection",
  props: ["cards", "deck_id", "where_iam"],
  data: () => ({
    limit_per_page: 50,
    // pages: 1,
    current_page: 1
  }),
  computed: {
    pages() {
      let v = this.cards ? this.cards.length : 0;
      return Math.ceil(v / this.limit_per_page);
    },
    rendered_cards() {
      let start = (this.current_page - 1) * this.limit_per_page,
        end = this.limit_per_page * this.current_page;
      return this.cards.slice(start, end);
    }
  },
  watch: {
    current_page(v) {
      //
    }
  }
};
</script>
