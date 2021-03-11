<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex xs-12>
          <v-carousel :value="ads">
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
            >
              <div class="car-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex v-for="ad in ads" :key="ad.id" xs12 sm6 md4>
          <v-card class="mx-auto" max-width="344">
            <v-img :src="ad.imageSrc" height="200px"></v-img>

            <v-card-title> {{ ad.title }} </v-card-title>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>

              <v-spacer></v-spacer>

              <v-btn :to="'/ad/' + ad.id"> Open </v-btn>
              <v-btn class="primary"> Buy </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div>
                <v-divider></v-divider>

                <v-card-text>
                  {{ ad.description }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["ads", "promoAds", "myAds"]),
  },
};
</script>
<style scoped lang='scss'>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
