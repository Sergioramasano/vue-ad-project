<template>
  <v-container>
    <v-layout>
      <v-flex xs-12 sm6 offset-sm3>
        <h1 class="primary--text mb-3">{{ title }}</h1>
        <v-card v-for="ad in myAds" :key="ad.id" class="elevation-10 mb-5">
          <v-flex>
            <v-img height="250" :src="ad.imageSrc"></v-img>
            <v-card-title>{{ ad.title }}</v-card-title>
            <v-card-text>{{ ad.description }}</v-card-text>
          </v-flex>
          <v-flex>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :to="'/ad/' + ad.id" class="info">Open</v-btn>
            </v-card-actions>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    title: "My ads",
  }),
  computed: {
    ...mapGetters(["myAds"]),
  },
};
</script>