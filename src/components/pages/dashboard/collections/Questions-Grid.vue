<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4" xl="3">
        <v-card class="text-center" height="200" @click="showQuestionModel">
          <v-layout
            align-center
            justify-center
            align-content-center
            fill-height
          >
            <div>
              <div><v-icon size="75">mdi-plus</v-icon></div>
              <div>
                <v-card-title>New Question</v-card-title>
              </div>
            </div>
          </v-layout>
        </v-card>
      </v-col>
      <template v-for="(q, i) in questions">
        <v-col cols="12" sm="6" md="4" xl="3" :key="i">
          <v-card class="question-card" @click="() => {}">
            <v-img class="align-end" height="200" aspect-ratio="1">
              <div v-if="q.badge" class="question-badge">
                <span v-text="q.badge"></span>
              </div>
              <v-chip
                active
                :class="
                  `question-type ${
                    type_colors[q.type]
                  }--text font-weight-medium`
                "
              >
                <span v-text="q.type"></span>
              </v-chip>
              <v-list-item class="wrap">
                <v-list-item-content>
                  <v-list-item-title
                    class="grey--text"
                    v-if="q.type == 'match'"
                  >
                    <i>-- Match Question --</i>
                  </v-list-item-title>
                  <v-list-item-title class="line-height-x1" v-else>
                    {{ q.q ? q.q : "" | subtitle_filter }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="mt-2"
                    v-if="q._contributers && q._contributers.length > 0"
                  >
                    <template v-for="(con, i) in c._contributers">
                      <v-tooltip bottom :key="i" v-if="i < contributers_limit">
                        <template v-slot:activator="{ on }">
                          <v-avatar v-on="on" size="25">
                            <v-img
                              :src="require(`@/assets/landing/${con.img}.jpg`)"
                            ></v-img>
                          </v-avatar>
                        </template>
                        <span v-text="con.name"></span>
                      </v-tooltip>
                    </template>
                    <v-tooltip
                      bottom
                      v-if="
                        q._contributers &&
                          q._contributers.length > contributers_limit
                      "
                    >
                      <template v-slot:activator="{ on }">
                        <v-avatar color="white black--text" size="30" v-on="on">
                          +{{ q._contributers.length - contributers_limit }}
                        </v-avatar>
                      </template>
                      <div>
                        <template v-for="(co, i) in q._contributers">
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
  </div>
</template>

<style lang="scss" scoped>
.question-card {
  .align-end {
    position: relative;
    .question-type {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      &::before {
        opacity: 0.16;
      }
    }
    .question-badge {
      position: absolute;
      top: 12px;
      left: -20px;
      background: var(--v-error-base);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      border: 1px dashed #ffffff;
      border-radius: 50%;
      width: 90px;
      text-align: center;
    }
  }
}
</style>

<script>
export default {
  name: "questions-grid",
  props: ["type_colors", "new_question_model"],
  methods: {
    showQuestionModel() {
      this.$emit("update:new_question_model", true);
      return;
    }
  },
  data: () => ({
    contributers_limit: 4,
    questions: []
    // questions: [
    //   {
    //     id: "15asd1",
    //     type: "select",
    //     q: "Who scored the winning goal in ACoN 2006?",
    //     a: "1",
    //     selects: ["Abo Trika", "Mohamed Zidan", "Emad Motei'b", "Ahmed Hassan"],
    //     _admins: [],
    //     _contributers: []
    //   },
    //   {
    //     id: "1sadsd1",
    //     type: "truefalse",
    //     q:
    //       "Leonel Messi was the second Argintinien player to win the Baloon Doo'r.",
    //     a: false,
    //     _admins: [],
    //     _contributers: []
    //   },
    //   {
    //     id: "151asdsadsd1",
    //     type: "match",
    //     q: {
    //       line_1: ["Sun is", "Kids are born from", "Dash loves"],
    //       line_2: ["Blue", "Ass", "Yellow"]
    //     },
    //     a: {
    //       0: 2,
    //       1: 1,
    //       2: 0
    //     },
    //     _admins: [],
    //     _contributers: []
    //   }
    // ]
  }),
  filters: {
    subtitle_filter(v) {
      let len = 75;
      return v.length > len ? v.substr(0, len) + "..." : v;
    }
  }
};
</script>
