<template>
  <v-container>
    <v-layout>
      <v-flex xs-12 sm6 offset-sm3>
        <h1>Create new Ad</h1>
        <v-form
          @submit.prevent="submit"
          v-model="valid"
          class="mb-3"
          ref="form"
          validation
        >
          <v-text-field
            name="title"
            label="Ad title"
            v-model.trim="title"
            :rules="[(v) => !!v || 'Title is required']"
            required
            type="text"
          ></v-text-field>
          <v-textarea
            name="description"
            multi-line
            label="Ad description"
            v-model.trim="description"
            type="text"
            :rules="[(v) => !!v || 'Description is required']"
            required
          ></v-textarea>
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
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn color="warning lighten-2" class="ma-2 white--text">
              Upload
              <v-icon right dark> mdi-cloud-upload </v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <img
              src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
              height="150"
              alt="preview"
            />
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-switch
              v-model="promo"
              label="Add to promo?"
              hide-details
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" class="success" @click="createAd"
              >Create ad</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    title: "",
    description: "",
    valid: false,
    promo: false,
  }),
  methods: {
    createAd() {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          promo: this.promo,
          description: this.description,
        };
        console.log(ad);
      }
    },
  },
};
</script>