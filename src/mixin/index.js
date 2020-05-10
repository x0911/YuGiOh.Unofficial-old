import Vue from "vue";
const mix = require("@/mixin/fun.js");
const fb = require("@/firebase.config.js");

// Mixins
Vue.mixin({
  data: () => ({
    fb: require("@/firebase.config.js")
  }),
  methods: {
    appConnection() {
      return this.$store.state.isOnline;
    },
    loadView(view) {
      return () => import(`@/views/${view}.vue`);
    },
    fixDate(date) {
      let fixed = new Date(date);
      return `${fixed.getFullYear()}-${
        Number(fixed.getMonth() + 1).toString().length > 1
          ? Number(fixed.getMonth() + 1)
          : "0" + Number(fixed.getMonth() + 1)
      }-${
        fixed.getDate().toString().length > 1
          ? fixed.getDate()
          : "0" + fixed.getDate()
      }`;
    },
    fixDates(array = [], dates = []) {
      array.forEach(el => {
        dates.forEach(date => {
          el[date] = this.fixDate(el[date]);
        });
      });
      return array;
    },
    getAppDefaults(refresh = false) {
      // Fetch Current Theme and Language
      let langs = ["ar", "en"],
        lang = this.$ls.get("tournament_lang", "en"),
        dark_theme = this.$ls.get("tournament_dark_theme", "false");
      this.$vuetify.theme.dark = dark_theme == "false" ? false : true;
      if (langs.includes(lang)) this.changeLang(lang);
      // Fetch Theme Options and colors
      let lights = this.$vuetify.theme.themes.light,
        darks = this.$vuetify.theme.themes.dark;
      for (let l in lights) {
        let v = this.$ls.get("tournament_theme_light" + "_" + l, null);
        if (v) {
          this.$vuetify.theme.themes.light[l] = v;
        }
      }
      for (let d in darks) {
        let v = this.$ls.get("tournament_theme_dark" + "_" + d, null);
        if (v) {
          this.$vuetify.theme.themes.dark[d] = v;
        }
      }
      if (refresh) {
        let href = document.location.href;
        document.location.href = href;
      }
    },
    changeLang: function(lang) {
      let langs = ["ar", "en"];
      lang = langs.includes(lang) ? lang : "en";
      this.$vuetify.lang.current = lang;
      this.$ls.set("tournament_lang", lang);
      this.$vuetify.rtl = lang == "ar" ? true : false;
      return;
    },
    getUdata(data, alt) {
      return this.$store.state.currentUserPublic &&
        this.$store.state.currentUserPublic[data] &&
        this.$store.state.currentUserPublic[data].trim() !== ""
        ? this.$store.state.currentUserPublic[data]
        : alt
        ? alt
        : "--";
    },
    getLang: function(...expression) {
      let returner = "";
      for (let t of expression) {
        returner += `${this.$vuetify.lang.t("$vuetify." + t)} `;
      }
      return returner.substring(0, returner.length - 1);
    },
    defaultUserAvatar: function() {
      // return require("@/assets/media/imgs/user-placeholder.jpg");
    },
    setCaptcha() {
      let $this = this;
      $this.$store.state.login.loading = true;
      window.recaptchaVerifier = "";
      document.getElementById("recaptcha-container").innerHTML = "";
      window.recaptchaVerifier = new fb.firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function(response) {
            // window.recaptchaToken = response;
            $this.getCode();
          },
          "expired-callback": function() {
            // Response expired.
            let error = {
              code: "recaptcha_expired"
            };
            $this.$store.state.login.loading = false;
            return $this.showError(error);
          }
        }
      );
      window.recaptchaVerifier.render().then(widgetId => {
        window.recaptchaWidgetId = widgetId;
        window.recaptchaVerifier.g.ready(() => {
          window.recaptchaVerifier.g.execute();
        });
      });
      // console.log(window.recaptchaVerifier.a.sitekey);
    },
    getCode() {
      this.$store.state.login.loading = true;
      let $this = this,
        phoneNumber = $this.$store.state.login.phone.value.replace(/-/g, "");
      let appVerifier = window.recaptchaVerifier;
      fb.auth
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
          // SMS sent.
          window.confirmationResult = confirmationResult;
          $this.$store.state.login.step = 1;
          $this.$store.state.login.loading = false;
          $this.resendCodeTimer();
        })
        .catch(function(error) {
          $this.showError(error.code);
          $this.$store.state.login.loading = false;
        });
    },
    verifyCode() {
      let $this = this;
      if ($this.$store.state.login.step == 1 && window.confirmationResult) {
        $this.$store.state.login.loading = true;
        let code = $this.$store.state.login.code.value;
        window.confirmationResult
          .confirm(code)
          .then(function(result) {
            // User signed in successfully.
            let user = result.user;
            mix.fun.setCurrentUser(user, true);
          })
          .catch(function(error) {
            // User couldn't sign in (bad verification code?)
            $this.showError(error.code);
            $this.$store.state.login.loading = false;
          });
      }
    },
    resendCodeTimer() {
      this.$store.state.login.code.resendTime = 60;
      this.$store.state.login.code.timer = setInterval(() => {
        this.$store.state.login.code.resendTime--;
        if (this.$store.state.login.code.resendTime == 0) {
          clearInterval(this.$store.state.login.code.timer);
        }
      }, 1000);
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    isServer() {
      if (
        this.$store.state.currentUser &&
        this.$store.state.servers &&
        this.$store.state.servers.length > 0
      ) {
        return true;
      }
      return false;
    },
    isApproved() {
      if (
        this.$store.state.currentUser &&
        this.$store.state.servers &&
        this.$store.state.servers.length > 0 &&
        this.$store.state.currentUserApproved
      ) {
        return true;
      }
      return false;
    },
    showError(code) {
      if (code) {
        if (typeof code == "object") {
          this.$set(
            this.$store.state.appError,
            "name",
            code.name ? code.name : "Error Occured"
          );
          this.$set(
            this.$store.state.appError,
            "server",
            code.server ? code.server : "Undefined Server"
          );
          this.$set(
            this.$store.state.appError,
            "msg",
            code.msg ? code.msg : "Undefined Message"
          );
        } else {
          this.$set(this.$store.state.appError, "msg", code);
        }
        this.$set(this.$store.state.appError, "model", true);
      }
    },
    logout() {
      this.$ls.remove("currentUser");
      this.$set(this.$store.state, "currentUser", null);
    },
    ucFirst($text) {
      let ucfirst = $text
        .replace("_", " ")
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      return ucfirst;
    },
    arr_obj_unique(arr, comp) {
      let unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);
      return unique;
    },
    getAnim(name) {
      let data = require("@/assets/animation/" + name + ".json");
      return data;
    },
    changeTheme(c) {
      this.$ls.set("tournament_dark_theme", c);
      this.$vuetify.theme.dark = c;
    },
    changeWidth() {
      let w = this.$store.state.app.width;
      if (w < 3) {
        this.$store.state.app.width = w + 1;
      } else {
        this.$store.state.app.width = 1;
      }
    },
    // Side-Functions used to calculate demobilization date for each soldier
    dateDiff($to, $from, $fullDetails = false) {
      let $n = 86400000,
        ms = new Date($to) - new Date($from) + $n,
        days = ms / $n,
        months = days / 30,
        years = months / 12;
      if (!$fullDetails) {
        return Math.ceil(days);
      } else {
        if (days > 30) {
          if (months > 12) {
            let new_years = Math.floor(years),
              new_months = (years - new_years) * 12,
              other_new_months = Math.floor(new_months),
              new_days = (new_months - other_new_months) * 30;
            return {
              days: Math.ceil(new_days),
              months: Math.ceil(other_new_months),
              years: Math.ceil(new_years)
            };
          } else {
            let new_months = Math.floor(months),
              new_days = (months - new_months) * 30;
            return {
              days: Math.ceil(new_days),
              months: Math.ceil(new_months),
              years: 0
            };
          }
        } else {
          return {
            days: Math.ceil(days),
            months: 0,
            years: 0
          };
        }
      }
    }
  }
});
