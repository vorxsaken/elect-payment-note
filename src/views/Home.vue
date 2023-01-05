<template>
  <v-container class="fill-height">
    <v-row @scroll="onScroll" id="container" v-show="this.$store.state.pembayaranListrik.length > 0"
      style="height: 89vh;" class="overflow-y-auto">
      <v-col v-for="item in this.$store.state.pembayaranListrik" :key="item.id" @click="detailPembayaran(item.id)"
        cols="12" sm="12" md="6">
        <PaymentList :tanggal="item.tanggal_pembayaran" :username="item.username" :src="item.foto_bukti_pembayaran" />
      </v-col>
      <v-col v-if="showIntersect" v-intersect="onIntersect" class="d-flex justify-center">
        <img width="60" src="../assets/loading.gif" alt="">
      </v-col>
    </v-row>
    <div v-if="this.$store.state.pembayaranListrik.length == 0" class="fill-height d-flex justify-center align-center pb-6"
      style="width: 100%">
      <img width="90" src="../assets/loading.gif" alt="">
    </div>
    <v-btn link large :to="{ name: 'Tambah Pembayaran' }" fab bottom fixed right color="grey darken-2"><v-icon
        color="white">mdi-plus</v-icon></v-btn>
  </v-container>
</template>

<script>
import PaymentList from "../components/PaymentList.vue"
import { getRealtimeUpdatePembayaran } from '../plugins/utils'

export default {
  name: 'Home',
  components: {
    PaymentList
  },
  data() {
    return {
      showIntersect: true,
    }
  },
  methods: {
    detailPembayaran(id) {
      this.$router.push({ name: 'Detail Pembayaran', params: { id: id, directFromDatabase: false } })
    },
    onIntersect(entries) {
      if (entries[0].isIntersecting) {
        if (this.$store.state.pembayaranListrik.length != this.$store.state.totalPembayaranListrik) {
          this.$store.dispatch('getNextPembayaranListrik');
        } else {
          this.showIntersect = false
        }
      }
    },
    onScroll() {
      this.$store.commit('updateHomeScrollPosition', document.getElementById('container').scrollTop);
    },
  },
  activated() {
    document.getElementById('container').scrollTop = this.$store.state.homeScrollPosition;
  },
  async created() {
    if (this.$store.state.pembayaranListrik.length == 0) {
      await this.$store.dispatch('getPembayaranListrik');
    }
    getRealtimeUpdatePembayaran('pembayaran_listrik');
  }
}
</script>