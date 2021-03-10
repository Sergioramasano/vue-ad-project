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
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    selectedItem: 1,
    items: [
      { text: "Login", icon: "mdi-clock", url: "/login" },
      { text: "Registration", icon: "mdi-account", url: "/registration" },
      { text: "Orders", icon: "mdi-flag", url: "/orders" },
      { text: "New ad", icon: "mdi-flag", url: "/new" },
      { text: "My ads", icon: "mdi-flag", url: "/list" },
    ],
  }),
};
</script>
<style scoped lang="scss">
</style>
