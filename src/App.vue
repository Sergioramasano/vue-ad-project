<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isUserLoggedIn" @click="onLogout">
            <v-list-item-icon>
              <v-icon color=" darken-2"> mdi-logout-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card app flat height="50px" tile>
      <v-toolbar color="primary" dense>
        <v-app-bar-nav-icon
          color="white"
          class="d-flex d-sm-none"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-btn to="/" text color="white">ad-app</v-btn>

        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-sm-flex">
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            text
            color="white"
            :to="item.url"
          >
            {{ item.text }}
          </v-btn>

          <v-btn v-if="isUserLoggedIn" color="white" text @click="onLogout">
            <v-icon color=" darken-2"> mdi-logout-variant </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-snackbar
      v-if="error"
      color="error"
      :timeout="5000"
      :multi-line="true"
      @input="closeError"
      :value="true"
    >
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn color="dark" text v-bind="attrs" @click="closeError">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    selectedItem: 1,
  }),
  computed: {
    ...mapGetters(["error", "isUserLoggedIn"]),
    items() {
      if (this.isUserLoggedIn) {
        return [
          { text: "Orders", icon: "mdi-flag", url: "/orders" },
          { text: "New ad", icon: "mdi-flag", url: "/new" },
          { text: "My ads", icon: "mdi-flag", url: "/list" },
        ];
      }
      return [
        { text: "Login", icon: "mdi-clock", url: "/login" },
        { text: "Registration", icon: "mdi-account", url: "/registration" },
      ];
    },
  },
  methods: {
    ...mapActions(["clearError", "autoLoginUser", "logoutUser"]),
    closeError() {
      this.clearError();
    },
    onLogout() {
      this.logoutUser();
      this.$router.push("/");
    },
  },
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCftDr7a00SwQWEyrJK7duEehVaSRZp13k",
      authDomain: "ads-proj-3000.firebaseapp.com",
      projectId: "ads-proj-3000",
      storageBucket: "ads-proj-3000.appspot.com",
      messagingSenderId: "381752557466",
      appId: "1:381752557466:web:e87f36920ac53587100423",
      measurementId: "G-RVBJ5RZKN5",
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.autoLoginUser(user);
      }
    });
  },
};
</script>
<style scoped lang="scss">
</style>
