<template>
  <div>
    <v-card class="s1-container" flat tile>
      <div class="bg-container">
        <v-img
          height="100%"
          width="100%"
          aspect-ratio="1"
          :src="require('@/assets/landing/yugioh/2.jpg')"
          style="transform: flipX(180)"
        ></v-img>
        <div
          class="inner-linear"
          :style="
            `background: linear-gradient(30deg, rgba(185, 0, 255, 0.8), rgba(13, 0, 255, 0.5)) center center no-repeat;`
          "
        ></div>
      </div>
      <v-layout fill-height align-center align-content-center justify-center>
        <v-container class="content-container">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="6" xl="4">
              <v-card tile flat dark color="transparent">
                <v-card-title class="display-1 break-word line-height-3">
                  Login or signup to put your first steps on the path of glory.
                </v-card-title>
                <v-card-text>
                  <div id="recaptcha-container"></div>
                  <v-tabs-items
                    dark
                    touchless
                    class="transparent"
                    v-model="$store.state.login.step"
                  >
                    <v-tab-item class="transparent" :value="0">
                      <v-text-field
                        filled
                        label="Phone Number"
                        :disabled="$store.state.login.loading"
                        rounded
                        class="append-with-button"
                        prepend-inner-icon="mdi-phone"
                        v-model="$store.state.login.phone.value"
                        persistent-hint
                        v-mask="$store.state.login.phone.mask"
                        @keypress.enter="setCaptcha()"
                        hint=" "
                      >
                        <template v-slot:append>
                          <v-btn
                            width="100"
                            :light="!$store.state.login.loading"
                            color="white"
                            rounded
                            :disabled="$store.state.login.loading"
                            :loading="$store.state.login.loading"
                            @click="setCaptcha()"
                            class="text-capitalize"
                          >
                            Next
                            <span class="mx-1"></span>
                            <v-icon class="rotateOnLangNigative" small
                              >mdi-keyboard-backspace</v-icon
                            >
                          </v-btn>
                        </template>
                        <template v-slot:message="{ message, key }">
                          <div :key="key">
                            <v-btn
                              rounded
                              to="/trouble"
                              class="text-capitalize"
                              text
                            >
                              <v-avatar size="22" tile>
                                <lot-anim
                                  className="svg-white"
                                  renderer="svg"
                                  :animationData="getAnim('warning-blink')"
                                ></lot-anim>
                              </v-avatar>
                              <span class="mx-1"></span>
                              Lost Phone?</v-btn
                            >
                          </div>
                        </template>
                      </v-text-field>
                    </v-tab-item>
                    <v-tab-item class="transparent" :value="1">
                      <v-text-field
                        filled
                        label="Code"
                        rounded
                        v-model="$store.state.login.code.value"
                        :disabled="$store.state.login.loading"
                        class="append-with-button"
                        prepend-inner-icon="mdi-lock"
                        @keypress.enter="verifyCode()"
                        persistent-hint
                        v-mask="$store.state.login.code.mask"
                        hint=" "
                      >
                        <template v-slot:append>
                          <v-btn
                            width="120"
                            :light="!$store.state.login.loading"
                            color="white"
                            rounded
                            :disabled="$store.state.login.loading"
                            :loading="$store.state.login.loading"
                            @click="verifyCode()"
                            class="text-capitalize"
                          >
                            Finish
                            <span class="mx-1"></span>
                            <v-icon class="rotateOnLangNigative" small
                              >mdi-keyboard-backspace</v-icon
                            >
                          </v-btn>
                        </template>
                        <template v-slot:message="{ message, key }">
                          <div :key="key">
                            <v-btn
                              rounded
                              class="text-capitalize"
                              :disabled="$store.state.login.code.resendTime > 0"
                              @click="getCode()"
                              text
                            >
                              <v-avatar size="22" tile>
                                <lot-anim
                                  className="svg-white"
                                  renderer="svg"
                                  :animationData="getAnim('refresh')"
                                ></lot-anim>
                              </v-avatar>
                              <span class="mx-1"></span>
                              Resend Code
                              <span
                                v-if="$store.state.login.code.resendTime > 0"
                                >in
                                {{ $store.state.login.code.resendTime }}</span
                              >
                            </v-btn>
                          </div>
                        </template>
                      </v-text-field>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card-text>
                <v-card-text class="pt-0">
                  * By pressing "Next", you accept our
                  <router-link class="white--text" to="/terms"
                    >Terms of use</router-link
                  >
                  and
                  <router-link class="white--text" to="/privacy"
                    >Privacy policy</router-link
                  >.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
    </v-card>
  </div>
</template>

<style lang="scss">
.s1-container {
  height: 100vh;
  position: relative;
  .svg-container,
  .bg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    .inner-linear {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
}
</style>

<script>
const fb = require("@/firebase.config.js");
export default {
  name: "langing-page-s1",
  mounted() {},
  data: () => ({})
};
</script>
