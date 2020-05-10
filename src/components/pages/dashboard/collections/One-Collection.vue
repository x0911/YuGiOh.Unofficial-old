<template>
  <div>
    <v-card>
      <v-card-title class="break-word">
        <v-row class="pa-0 ma-0">
          <v-col>
            <v-skeleton-loader
              :class="loading ? 'mb-4' : ''"
              type="heading"
              :loading="loading"
            >
              <div v-text="c.name"></div>
            </v-skeleton-loader>
            <v-skeleton-loader
              max-width="350"
              type="sentences"
              :loading="loading"
            >
              <div v-text="c.desc" class="subtitle-1 line-height-x1"></div>
            </v-skeleton-loader>
            <div>
              <v-skeleton-loader type="avatar" :loading="loading">
                <div></div>
              </v-skeleton-loader>
            </div>
          </v-col>
          <v-col cols="12" sm="auto" class="align-self-end">
            <v-row class="py-0 my-0">
              <v-col class="py-0 my-0">
                <v-text-field
                  filled
                  rounded
                  prepend-inner-icon="mdi-magnify"
                  label="Search Questions"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="auto" class="py-0 my-0 align-self-center">
                <v-btn-toggle mandatory rounded v-model="view_type">
                  <v-btn value="grid" outlined active-class="primary--text">
                    <v-icon :color="view_type == 'grid' ? 'primary' : ''"
                      >mdi-view-module</v-icon
                    >
                  </v-btn>
                  <v-btn value="table" outlined active-class="primary--text">
                    <v-icon :color="view_type == 'table' ? 'primary' : ''"
                      >mdi-table</v-icon
                    >
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="subtitle-2 mb-2">
          39 Total questions
        </div>
        <v-btn-toggle
          class="overflow-hidden"
          multiple
          rounded
          v-model="selected_types"
        >
          <v-btn
            outlined
            value="select"
            :active-class="`${type_colors.select}--text font-weight-simibold`"
            class="text-capitalize overflow-hidden"
            >12 Select</v-btn
          >
          <v-btn
            outlined
            value="truefalse"
            :active-class="
              `${type_colors.truefalse}--text font-weight-simibold`
            "
            class="text-capitalize overflow-hidden"
            >19 True or False</v-btn
          >
          <v-btn
            outlined
            value="match"
            :active-class="`${type_colors.match}--text font-weight-simibold`"
            class="text-capitalize overflow-hidden"
            >7 Match</v-btn
          >
        </v-btn-toggle>
      </v-card-text>
      <v-card-text>
        <div v-if="loadingQ">
          <!-- Questions are loading -->
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </div>
        <div v-else>
          <v-tabs-items touchless v-model="view_type">
            <v-tab-item value="grid">
              <questions-grid
                :new_question_model.sync="new_question.model"
                :type_colors="type_colors"
                :selected_types="selected_types"
                :questions="questions"
              ></questions-grid>
            </v-tab-item>
            <v-tab-item value="table">
              <questions-table
                :new_question_model.sync="new_question.model"
                :type_colors="type_colors"
                :selected_types="selected_types"
                :questions="questions"
              ></questions-table>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-card-text>
    </v-card>
    <add-question :new_question_model.sync="new_question.model"></add-question>
  </div>
</template>

<script>
const fb = require("@/firebase.config.js");
export default {
  name: "one-collection",
  props: ["id"],
  components: {
    QuestionsGrid: () =>
      import("@/components/pages/dashboard/collections/Questions-Grid.vue"),
    QuestionsTable: () =>
      import("@/components/pages/dashboard/collections/Questions-Table.vue"),
    AddQuestion: () =>
      import("@/components/pages/dashboard/collections/AddQuestion.vue")
  },
  mounted() {
    this.getCollection();
  },
  methods: {
    emptyCollection() {
      let defaults = {
        name: "",
        desc: "",
        cover: null,
        audience: "",
        _admins: [],
        _contributers: [],
        size: 0
      };
      for (let prop in this.c) {
        this.$set(this.c, prop, defaults[prop]);
      }
    },
    runLoading(q = false) {
      if (q) {
        this.loadingQ = true;
      } else {
        this.loading = true;
      }
    },
    stopLoading(q = false) {
      if (q) {
        this.loadingQ = false;
      } else {
        this.loading = false;
      }
    },
    getCollection() {
      let id = this.id;
      if (id) {
        this.runLoading();
        fb.collections.doc(id).onSnapshot(
          record => {
            this.emptyCollection();
            if (record.exists) {
              this.$set(this, "c", record.data());
              this.stopLoading();
              this.getQuestions(this.c.size);
            } else {
              this.collectionNotFound = true;
            }
          },
          error => {
            // console.log(error);
          }
        );
      }
    },
    getQuestions(size = 0) {
      if (this.c.size == size) return;
      // console.log("getQuestions ran.");
      let id = this.id;
      this.runLoading(true);
      fb.collections
        .doc(id)
        .collection("questions")
        .onSnapshot(
          records => {
            let size = records.size,
              counter = 0;
            records.forEach(q => {
              let data = q.data();
              data.id = q.id;
              this.$set(this.questions, counter, data);
            });
            this.stopLoading(true);
          },
          error => {
            // console.log(error);
          }
        );
    }
  },
  data: () => ({
    new_question: {
      model: false
    },
    type_colors: {
      select: "success",
      truefalse: "purple",
      match: "error"
    },
    selected_types: [],
    loading: false,
    loadingQ: false,
    collectionNotFound: false,
    view_type: "grid",
    // Collection Details
    c: {
      name: "Medical Questions",
      desc:
        "This is a collection created to provide several questions in the medical field, help doctors and patients get the best medical experience.",
      cover: null,
      audience: "",
      _admins: [],
      _contributers: [],
      size: 0
    },
    questions: [],
    questions_ran: false
  }),
  computed: {},
  filters: {
    subtitle_filter(v) {
      let len = 50;
      return v.length > len ? v.substr(0, len) + "..." : v;
    }
  }
};
</script>
