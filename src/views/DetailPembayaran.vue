<template>
  <div>
    <v-card elevation="0" class="mt-4">
      <v-card-text class="d-flex justify-center align-center flex-column">
        <div @click="imageModal = true" style="width: auto; height: auto; border-radius: 10px; overflow: hidden;">
          <v-img :src="detailPembayaran[0].foto_bukti_pembayaran" width="300" height="300">
          </v-img>
        </div>
        <div class="mt-4 d-flex flex-column" style="width: 300px">
          <span class="text-caption">Nama Pembayar</span>
          <span class="font-weight-bold mt-n1">{{ detailPembayaran[0].username }}</span>
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
      <v-card-actions class="d-flex justify-center">
        <v-btn color="blue-grey darken-2" class="white--text">
          <v-icon color="white">mdi-delete</v-icon>
          hapus
        </v-btn>
      </v-card-actions>
    </v-card>
    <div v-if="imageModal" @click.self="imageModal = false" class="containerModal">
      <div class="imageContainer">
        <PinchScrollZoom width="350" height="400" :scale="1">
          <div style="width: 350px; height: 390px; overflow-y: auto" class="d-flex align-center">
            <img class="imageForModal" :src="detailPembayaran[0].foto_bukti_pembayaran" alt="" />
          </div>
        </PinchScrollZoom>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatesFromMilisecond, formatNumber } from '../plugins/utils'
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom'

export default {
  components: {
    PinchScrollZoom
  },
  data() {
    return {
      imageModal: false,
      detailPembayaran: null
    }
  },
  computed: {
    harga(){
      return formatNumber(this.detailPembayaran[0].nominal);
    },
    tanggal() {
      return getDatesFromMilisecond(this.detailPembayaran[0].tanggal_pembayaran)
    }
  },
  created() {
    this.detailPembayaran = this.$store.state.pembayaranListrik.filter(doc => {
      return doc.id == this.$route.params.id
    })
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