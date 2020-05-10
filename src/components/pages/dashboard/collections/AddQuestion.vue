<template>
  <div>
    <v-dialog
      v-model="new_question_model"
      persistent
      max-width="500"
      scrollable
      @click:outside="hideModel"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col class="py-0">
              New Question
            </v-col>
            <v-col cols="auto" class="py-0">
              <v-btn @click="hideModel" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0">
          <v-stepper vertical class="elevation-0" v-model="step">
            <!-- [1] Type of question -->
            <v-stepper-step :complete="step > 1" step="1">
              Select Type
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-select
                filled
                rounded
                label="Type"
                hint="* Select type of question"
                persistent-hint
                :items="question_types"
                v-model="new_question.type"
              ></v-select>
            </v-stepper-content>
            <!-- [2] Question -->
            <v-stepper-step :complete="step > 2" step="2">
              Write Question
            </v-stepper-step>
            <v-stepper-content step="2">
              <v-textarea
                filled
                rounded
                label="Question"
                hint="* You can press '<span class='font-weight-simibold'>Enter</span>' to go to a new line."
                persistent-hint
                v-model="new_question.q"
                rows="1"
                auto-grow
                counter="150"
              >
                <template v-slot:message="{ message, key }">
                  <div :key="key" v-html="message"></div>
                </template>
              </v-textarea>
              <div class="mt-3" v-if="new_question.type == 'select'">
                <!-- <v-chip-group class="mb-3"> -->
                <!-- <template v-for="(s, i) in new_question.selects">
                    <div :key="i"></div>
                    <v-text-field
                      class="two-outers"
                      :prepend-inner-icon="`mdi-numeric-${i + 1}-box`"
                      autocomplete="off"
                      :key="i"
                      label="Write option"
                      single-line
                      filled
                      rounded
                      dense
                      v-model="new_question.selects[i]"
                      append-icon="mdi-close-circle-outline error--text"
                      @click:append="new_question.selects.splice(i, 1)"
                    >
                      <template v-slot:append-outer>
                        <div>
                          <div>
                            <v-btn
                              @click="levelUp(i)"
                              :disabled="i == 0"
                              icon
                              small
                              color="success"
                            >
                              <v-icon>mdi-arrow-up-bold-outline</v-icon>
                            </v-btn>
                          </div>
                          <div>
                            <v-btn
                              @click="levelDown(i)"
                              :disabled="new_question.selects.length == i + 1"
                              icon
                              small
                              color="error"
                            >
                              <v-icon>mdi-arrow-down-bold-outline</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </template>
                    </v-text-field>
                  </template> -->
                <div class="mb-4" v-show="new_question.selects.length > 0">
                  <v-menu
                    v-for="(s, i) in new_question.selects"
                    :key="i"
                    bottom
                    right
                    transition="scale-transition"
                    origin="top left"
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on }">
                      <v-chip v-on="on" v-text="s" outlined></v-chip>
                    </template>
                    <v-card>
                      <v-card-title class="break-word">
                        <v-row class="py-0 my-0">
                          <v-col class="py-0 my-0">
                            <div>Edit Option</div>
                          </v-col>
                          <v-col cols="auto" class="py-0 my-0">
                            <v-btn
                              color="error"
                              icon
                              @click="new_question.selects.splice(i, 1)"
                            >
                              <v-icon>mdi-trash-can-outline</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="pt-5">
                        <v-text-field
                          label="Write option"
                          single-line
                          filled
                          rounded
                          dense
                          v-model="new_question.selects[i]"
                          hint="* You can press '<span class='font-weight-simibold'>Enter</span>' to save."
                          persistent-hint
                        >
                          <template v-slot:message="{ message, key }">
                            <div :key="key" v-html="message"></div>
                          </template>
                        </v-text-field>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </div>
                <!-- </v-chip-group> -->
                <!-- Add New Option -->
                <v-text-field
                  v-if="new_question.selects.length < 10"
                  autocomplete="off"
                  label="Write option"
                  single-line
                  filled
                  persistent-hint
                  hint="* You can press '<span class='font-weight-simibold'>Enter</span>' to add options."
                  rounded
                  dense
                  v-model="new_question.new_select"
                  @keypress.enter="
                    new_question.selects.push(new_question.new_select),
                      (new_question.new_select = '')
                  "
                  @click:append="
                    new_question.selects.push(new_question.new_select),
                      (new_question.new_select = '')
                  "
                  append-icon="mdi-plus-circle-outline"
                >
                  <template v-slot:message="{ message, key }">
                    <div :key="key" v-html="message"></div>
                  </template>
                </v-text-field>
                <div class="text-center grey--text" v-else>
                  -- <i>Maximum number of options is 10</i> --
                </div>
              </div>
              <div v-else-if="new_question.type == 'match'"></div>
            </v-stepper-content>
            <!-- [3] Correct Answer -->
            <!-- [2] Question -->
            <v-stepper-step :complete="step > 3" step="3">
              Answer it
            </v-stepper-step>
            <v-stepper-content step="3">
              <div v-if="new_question.type == 'select'"></div>
              <div v-else-if="new_question.type == 'truefalse'"></div>
              <div v-else-if="new_question.type == 'match'"></div>
              <div class="text-center px-4" v-else>
                <span class="grey--text">
                  -- Please select a question type --
                </span>
              </div>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="px-4">
          <v-btn
            class="px-6 text-capitalize"
            text
            large
            @click="hideModel"
            v-text="'Cancel'"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="px-6 text-capitalize"
            large
            outlined
            color="primary"
            @click="step > 1 ? step-- : () => {}"
            :disabled="step == 1"
          >
            Back
          </v-btn>
          <v-btn
            class="px-6 text-capitalize"
            large
            color="primary"
            v-text="step > 2 ? 'Finish' : 'Next'"
            @click="step > 2 ? addQuestion() : step++"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "add-question",
  props: ["new_question_model"],
  data: () => ({
    steps: 4,
    step: 2,
    new_question: {
      q: "", // String
      a: null, // String | Boolean | Object
      type: "select", // String
      selects: [], // Array - Object
      matches: {},
      _admins: [], // Array
      _contributers: [], // Array
      // Not for databse
      model: false,
      new_select: "",
      tmp_select: ""
    },
    question_types: [
      {
        text: "Select",
        value: "select"
      },
      {
        text: "True or False",
        value: "truefalse"
      },
      {
        text: "Match",
        value: "match"
      }
    ]
  }),
  methods: {
    addQuestion() {
      return false;
    },
    levelUp(index) {
      let options = this.new_question.selects;
      this.$set(this.new_question, "tmp_select", options[index - 1]);
      this.$set(this.new_question.selects, index - 1, options[index]);
      this.$set(this.new_question.selects, index, this.new_question.tmp_select);
    },
    levelDown(index) {
      let options = this.new_question.selects;
      this.$set(this.new_question, "tmp_select", options[index + 1]);
      this.$set(this.new_question.selects, index + 1, options[index]);
      this.$set(this.new_question.selects, index, this.new_question.tmp_select);
    },
    hideModel() {
      this.$emit("update:new_question_model", false);
      return;
    }
  }
};
</script>
