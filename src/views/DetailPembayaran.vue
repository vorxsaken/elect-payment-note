<template>
  <div class="fill-height">
    <v-card elevation="0" class="mt-4" v-if="detailPembayaran">
      <v-card-text class="d-flex justify-center align-center flex-column">
        <div @click="showModal(detailPembayaran[0].foto_bukti_pembayaran)"
          style="width: auto; height: auto; border-radius: 10px; overflow: hidden;">
          <v-img :src="detailPembayaran[0].foto_bukti_pembayaran" width="300" height="300">
          </v-img>
        </div>
        <div class="mt-4 d-flex flex-row" style="width: 300px">
          <v-avatar size="40" @click="showModal(detailPembayaran[0].foto)">
            <v-img :src="detailPembayaran[0].foto"></v-img>
          </v-avatar>
          <div class="d-flex flex-column ml-2">
            <span class="text-caption">Nama Pembayar</span>
            <span class="font-weight-bold mt-n1">{{ detailPembayaran[0].username }}</span>
          </div>
        </div>
        <div class="mt-2 d-flex flex-column" style="width: 300px">
          <span class="text-caption">Jumlah Bayar</span>
          <span class="font-weight-bold mt-n1">Rp. {{ harga }}</span>
        </div>
        <div class="mt-2 d-flex flex-column" style="width: 300px">
          <span class="text-caption">Tanggal Bayar</span>
          <span class="font-weight-bold mt-n1">{{ tanggal }}</span>
        </div>
      </v-card-text>
      <v-card-actions v-if="idUser == detailPembayaran[0].id_user" class="d-flex justify-center">
        <v-btn :loading="isLoading" color="blue-grey darken-2" class="white--text" @click="deletePembayaran">
          <v-icon color="white">mdi-delete</v-icon>
          hapus
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-else class="fill-height d-flex justify-center align-center pb-6" style="width: 100%">
      <img width="90" src="../assets/loading.gif" alt="">
    </div>
    <div v-if="imageModal" @click.self="imageModal = !imageModal" class="containerModal">
      <div class="imageContainer">
        <PinchScrollZoom width="350" height="400" :scale="1">
          <div style="width: 350px; height: 390px; overflow-y: auto" class="d-flex align-center">
            <img class="imageForModal" :src="modalPhoto" alt="" />
          </div>
        </PinchScrollZoom>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatesFromMilisecond, formatNumber, getDocWithId, deleteDataNoConditional, deleteFile } from '../plugins/utils'
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom'

export default {
  components: {
    PinchScrollZoom
  },
  data() {
    return {
      idUser: localStorage.getItem('id'),
      imageModal: false,
      detailPembayaran: null,
      modalPhoto: null,
      isLoading: false
    }
  },
  computed: {
    harga() {
      return formatNumber(this.detailPembayaran[0].nominal);
    },
    tanggal() {
      return getDatesFromMilisecond(this.detailPembayaran[0].tanggal_pembayaran)
    }
  },
  methods: {
    async getDetail() {
      const getDetail = await getDocWithId('pembayaran_listrik', this.$route.params.id);
      const getUser = await getDocWithId('user', this.idUser);
      this.detailPembayaran = [{ username: getUser.name, foto: getUser.foto, ...getDetail }];
    },
    get() {
      if (!this.$route.params.directFromDatabase) {
        this.detailPembayaran = this.$store.state.pembayaranListrik.filter(doc => {
          return doc.id == this.$route.params.id
        })
        return;
      }

      this.getDetail();
      return;
    },
    showModal(src) {
      this.imageModal = true;
      this.modalPhoto = src;
    },
    deletePembayaran() {
      this.isLoading = true
      deleteDataNoConditional('pembayaran_listrik', this.detailPembayaran[0].id).then(async () => {
        deleteFile(this.detailPembayaran[0].foto_bukti_pembayaran).then(() => {
          this.isLoading = false;
          this.$router.back();
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        this.isLoading = false
        console.log(err);
      })
    }
  },
  created() {
    this.get();
  }
}
</script>

<style lang="scss" scoped>
.containerModal::-webkit-scrollbar {
  display: none;
}

.imageContainer::-webkit-scrollbar {
  display: none;
}

.containerModal {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-behavior: smooth;

  .imageContainer {
    height: auto;
    width: auto;
    max-height: 400px;
    max-width: 350px;
    padding: 5px 5px 5px 5px;
    background-color: white;
    border-radius: 10px;
    z-index: 55;
    overflow: auto;
    display: flex;
    justify-content: center;

    .imageForModal {
      width: 100%;
      height: auto;
    }
  }
}
</style>