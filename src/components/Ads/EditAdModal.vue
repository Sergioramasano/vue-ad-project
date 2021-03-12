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
            <v-card-text>
              <v-text-field
                label="editTitle"
                v-model.trim="editTitle"
                required
                type="text"
              ></v-text-field>
              <v-text-field
                label="editDescription"
                v-model.trim="editDescription"
                required
                type="text"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onCancel" class="warning">Cancel</v-btn>
              <v-btn @click="onSave" class="success">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["ad"],
  data() {
    return {
      modal: false,
      editTitle: this.ad.title,
      editDescription: this.ad.description,
    };
  },
  methods: {
    ...mapActions(["updateAd"]),
    onCancel() {
      this.editTitle = this.ad.title;
      this.editDescription = this.ad.description;
      this.modal = false;
    },
    onSave() {
      if (this.editTitle !== "" && this.editDescription !== "") {
        let updateData = {
          title: this.editTitle,
          description: this.editDescription,
          id: this.ad.id,
        };
        this.updateAd(updateData);

        this.modal = false;
      }
    },
  },
};
</script>
