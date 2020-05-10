<template>
  <div>
    <v-dialog
      @click:outside="hideModel"
      max-width="500"
      persistent
      scrollable
      v-model="dataModel"
    >
      <v-card :disabled="loading" :loading="loading" loader-height="7">
        <v-card-title>
          <v-row>
            <v-col class="py-0">
              Update your name
            </v-col>
            <v-col cols="auto" class="py-0">
              <v-btn @click="hideModel" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-6">
          <v-text-field
            autocomplete="off"
            filled
            hint="* It's prefered to use first and last names."
            persistent-hint
            rounded
            prepend-inner-icon="mdi-face"
            label="Name"
            @keypress.enter="update"
            v-model="data"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pt-4">
          <v-spacer></v-spacer>
          <v-btn
            class="text-capitalize px-6"
            color="primary"
            outlined
            large
            @click="hideModel"
            >Cancel</v-btn
          >
          <v-btn
            class="text-capitalize px-6"
            large
            color="primary"
            depressed
            @click="update"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const fb = require("@/firebase.config.js");
export default {
  name: "updateUname",
  props: ["dataModel"],
  data: () => ({
    data: "",
    loading: false
  }),
  computed: {
    current_user() {
      return this.$store.state.currentUserPublic;
    }
  },
  watch: {
    dataModel(a, b) {
      if (a) {
        this.setDefault();
      }
    }
  },
  methods: {
    setDefault() {
      this.data =
        this.current_user && this.current_user.displayName
          ? this.current_user.displayName.trim()
          : "";
    },
    update() {
      this.loading = true;
      let $this = this,
        current_user = $this.current_user,
        uid = $this.$store.state.currentUser.uid,
        displayName = $this.data;
      if (displayName.trim().length >= 4) {
        fb.users
          .doc(uid)
          .set(
            {
              displayName
            },
            { merge: true }
          )
          .then(record => {
            $this.loading = false;
            $this.hideModel();
          })
          .catch(error => {
            $this.loading = false;
            $this.showError(error.code);
          });
        if (!this.appConnection()) {
          $this.loading = false;
          $this.hideModel();
        }
      } else {
        $this.loading = false;
        $this.showError("displayName-empty");
      }
    },
    hideModel() {
      return this.$emit("hideModel");
    }
  }
};
</script>
