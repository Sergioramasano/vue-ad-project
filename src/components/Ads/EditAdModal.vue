<template>
  <v-dialog width="300px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="warning" v-on="on" text>Edit</v-btn></template
    >

    <v-card depressed>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card-text> Lorem ipsum dolor sit. </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="warning">Cancel</v-btn>
              <v-btn class="success">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    modal: false,
  }),
};
</script>
