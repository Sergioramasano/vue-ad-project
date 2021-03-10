<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm8 md6 elevation-6>
        <v-toolbar class="pb-5 blue darken-4">
          <v-toolbar-title class="white--text">
            <h4>Login form</h4>
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
                <v-layout justify-space-between>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    :class="{
                      'blue darken-4 white--text': valid,
                      disabled: !valid,
                    }"
                    :disabled="!valid"
                    >Login</v-btn
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
export default {
  data() {
    return {
      valid: false,
      e1: false,
      password: "",
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
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        console.log(user);
        this.email = this.password = "";
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
