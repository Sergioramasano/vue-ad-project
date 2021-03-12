<template>
  <v-container>
    <v-layout row>
      <v-flex xs-12>
        <v-card v-if="currentAd" class="ma-sm-5" depressed>
          <v-img height="300" :src="currentAd.imageSrc"></v-img>
          <v-card-title
            ><h1>{{ currentAd.title }}</h1></v-card-title
          >
          <v-card-text>{{ currentAd.description }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <EditAdModal />
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import EditAdModal from "./EditAdModal";

export default {
  components: {
    EditAdModal,
  },
  props: ["id"],
  data: () => ({
    title: "ad",
  }),
  computed: {
    ...mapGetters(["ads"]),
    currentAd() {
      return this.ads.find((ad) => ad.id === this.id);
    },
  },
};
</script>