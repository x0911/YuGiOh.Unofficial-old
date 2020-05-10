<template>
  <div>
    <v-window v-model="window">
      <v-window-item>
        <!-- No Card Selected -->
        <v-card>
          <v-card-title>Create new card</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field label="Name" filled rounded></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Attribute" filled rounded></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-4">
            <v-btn outlined color="primary" class="px-6">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item>
        <!-- Card Selected -->
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  name: "cards",
  data: () => ({}),
  computed: {
    card_id() {
      return this.$route.params.id;
    },
    window: {
      get() {
        return this.card_id;
      },
      set(v) {
        if (v) return 1;
        return 0;
      }
    }
  }
};
</script>
