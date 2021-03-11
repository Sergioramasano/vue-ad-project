<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm8 md6 elevation-6>
        <v-toolbar class="pb-5 blue darken-4">
          <v-toolbar-title class="white--text">
            <h4>Registration form</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form
                @submit.prevent="submit"
                v-model="valid"
                ref="form"
                validation
              >
                <v-text-field
                  label="Email"
                  v-model.trim="email"
                  :rules="emailRules"
                  prepend-icon="mdi-account"
                  required
                  type="email"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model.trim="password"
                  :counter="password.length <= 6 ? 6 : null"
                  min="6"
                  prepend-icon="mdi-account-lock"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="'password'"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  v-model.trim="confirmPassword"
                  :counter="confirmPassword.length <= 6 ? 6 : null"
                  min="6"
                  prepend-icon="mdi-account-lock"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="'password'"
                  :rules="confirmPasswordRules"
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    :loading="loading"
                    :class="{
                      'blue darken-4 white--text': valid,
                      disabled: !valid || loading,
                    }"
                    :disabled="!valid"
                    >Create account</v-btn
                  >
                  <!-- <a href="">Forgot Password</a> -->
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: false,
      e1: false,
      password: "",
      confirmPassword: "",
      confirmPasswordRules: [
        (v) => !!v || "Repeate password!",
        (v) =>
          v == this.password || "Password must be equal with confirm password!",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          v.length >= 6 || "Password must be equal or more than 6 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    ...mapActions(["registerUser", "setLoading"]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.registerUser(user)
          .then(() => {
            this.$router.push("/");
          })
          .catch((error) => {
            this.setError(error.message).then(() => {
              this.setLoading(false);
            });
          });
        this.email = this.password = this.confirmPassword = "";
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
