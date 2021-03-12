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
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn
              @click="triggerUpload"
              color="warning lighten-2"
              class="mb-3 white--text"
            >
              Upload
              <v-icon right dark> mdi-cloud-upload </v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <img v-if="imageSrc" :src="imageSrc" height="150" alt="preview" />
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
            <v-btn
              :disabled="(!valid && !image) || loading"
              :loading="loading"
              class="success"
              @click="createAd"
              >Create ad</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    title: "",
    description: "",
    valid: false,
    promo: false,
    image: null,
    imageSrc: "",
  }),
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    ...mapActions(["createNewAd"]),
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageSrc = reader.result;
        console.log(event);
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          promo: this.promo,
          description: this.description,
          image: this.image,
        };
        this.createNewAd(ad).then(() => {
          this.$router.push("/list");
        });
        this.title = this.promo = this.description = this.imageSrc = "";
      }
    },
  },
};
</script>