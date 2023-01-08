<template>
  <v-container class="fill-height d-flex align-start">
    <v-row v-if="stateStatus == 'fulfilled'" style="max-height: 89vh; height: auto;" class="overflow-y-auto">
      <v-col v-for="item in history" :key="item.id" cols="12" sm="12" md="6" lg="3" @click="detailPembayaran(item.id)">
        <PaymentListVue :tanggal="item.tanggal_pembayaran" :username="item.username"
          :src="item.foto_bukti_pembayaran" />
      </v-col>
    </v-row>
    <div v-else-if="stateStatus == 'loading'" class="fill-height d-flex justify-center align-center pb-6" style="width: 100%">
      <img width="90" src="../assets/loading.gif" alt="">
    </div>
    <div v-else-if="stateStatus == 'empty'" class="fill-height d-flex justify-center align-center flex-column pb-6" style="width: 100%">
      <v-icon color="blue-grey darken-3" size="80">
        mdi-delete-empty
      </v-icon>
      <p class="font-weight-bold text-subtitle-1 blue-grey--text text--darken-3">
        History Kosong
      </p>
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
      history: [],
      stateStatus: 'loading'
    }
  },
  methods: {
    detailPembayaran(id) {
      this.$router.push({ name: 'Detail Pembayaran', params: { id: id, directFromDatabase: true } })
    },
    async getHistory() {
      const getHistory = await getDocCon('pembayaran_listrik', 'id_user', localStorage.getItem('id'));
      const user = await getDocWithId('user', localStorage.getItem('id'));
      const history = getHistory.map(doc => { return { username: user.nama, ...doc } }).sort((a, b) => {
        return b.tanggal_pembayaran - a.tanggal_pembayaran;
      });

      if (history.length == 0) {
        this.stateStatus = 'empty'
      } else {
        this.history = history;
        this.stateStatus = 'fulfilled'
      }
    }
  },
  created() {
    this.getHistory();
  }
}
</script>

<style>

</style>