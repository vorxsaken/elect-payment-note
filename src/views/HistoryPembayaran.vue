<template>
  <v-container class="fill-height d-flex align-start">
    <v-row v-if="history.length != 0" style="max-height: 89vh; height: auto;" class="overflow-y-auto">
      <v-col v-for="item in history" :key="item.id" cols="12" sm="12" md="6" lg="3" @click="detailPembayaran(item.id)">
        <PaymentListVue :tanggal="item.tanggal_pembayaran" :username="item.username" :src="item.foto_bukti_pembayaran" />
      </v-col>
    </v-row>
    <div v-else class="fill-height d-flex justify-center align-center pb-6" style="width: 100%">
      <img width="90" src="../assets/loading.gif" alt="">
    </div>
  </v-container>
</template>

<script>
import PaymentListVue from '../components/PaymentList.vue';
import { getDocCon, getDocWithId } from '../plugins/utils'

export default {
  name: 'History',
  components: {
    PaymentListVue
  },
  data() {
    return {
      history: []
    }
  },
  methods: {
    detailPembayaran(id) {
      this.$router.push({name: 'Detail Pembayaran', params: { id: id, directFromDatabase: true }})
    },
    async getHistory() {
      const getHistory = await getDocCon('pembayaran_listrik', 'id_user', localStorage.getItem('id'));
      const user = await getDocWithId('user', localStorage.getItem('id'));
      const history = getHistory.map(doc => { return { username: user.name, ...doc}}).sort((a, b) => {
        return b.tanggal_pembayaran - a.tanggal_pembayaran;
      });
      this.history = history;
    }
  },
  created() {
    this.getHistory();
  }
}
</script>

<style>

</style>