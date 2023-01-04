<template>
  <v-card elevation="4">
    <div>
        <v-list>
            <v-list-item>
                <v-list-item-avatar rounded="" size="80" color="grey darken-2">
                  <v-img :src="src"></v-img>
                </v-list-item-avatar>

                <v-list-item-content class="pt-0 mt-n6">
                    <v-list-item-title class="text-subtitle-1 font-weight-bold grey--text text--darken-2">{{ date }}</v-list-item-title>
                    <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
  </v-card>
</template>

<script>
import { getDatesFromMilisecond } from '../plugins/utils'

export default {
  props: ['tanggal', 'src', 'username'],
  computed: {
    date() {
      let tanggal = this.tanggal;
      return getDatesFromMilisecond(tanggal);
    },
  },
  watch: {
    tanggal(){
      this.date();
    }
  }
}
</script>

<style>

</style>