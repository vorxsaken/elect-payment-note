<template>
    <v-card elevation="0">
        <v-card-text class="d-flex justify-center align-center flex-column">
            <PickImage :key="key" deskripsi="Tambahkan bukti pembayaran" @getFileImage="getFileImage" />
            <div class="nominalContainer">
                <TextInputVue :key="key" placeholder="Nominal" @change="e => nominal = e" />
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
            <v-btn @click="addBuktiPembayaran" :loading="isLoading" color="grey darken-2" large class="white--text px-4">Submit</v-btn>
        </v-card-actions>
        
        <!-- dialog -->
        <DialogMessage :dialog="messageDialog" :icon="messageIcon" :text="message" @changeValue="e => messageDialog = e"></DialogMessage>
    </v-card>
</template>

<script>
import PickImage from '../components/PickImage.vue';
import TextInputVue from '../components/TextInput.vue';
import { addData, setData, uploadAFile} from '../plugins/utils'
import Compressor from 'compressorjs'
import DialogMessage from '../components/DialogMessage.vue';

export default {
    components: {
        PickImage,
        TextInputVue,
        DialogMessage
    },
    data() {
        return {
            Image: null,
            nominal: '',
            isLoading: false,
            key: 0,
            messageDialog: false,
            message: '',
            messageIcon: ''
        }
    },
    methods: {
        getFileImage(file) {
            var data = this;
            new Compressor(file, {
                quality: 0.6,
                width: 800,
                success(result) {
                    data.Image = result;
                    console.log(new Intl.NumberFormat('de-De').format(result.size));
                },
                error(err) {
                    console.log(err);
                }
            })
        },
        resetField() {
            this.key++;
        },
        showMessageDialog(message, icon) {
            this.message = message;
            this.messageIcon = icon;
            this.messageDialog = true;
        },
        addBuktiPembayaran() {
            if(this.nominal == '' && this.Image == null) {
                this.showMessageDialog('Field tidak boleh kosong', 'mdi-alert-decagram');
                return;
            }

            this.isLoading = true;
            addData('pembayaran_listrik', {
                tanggal_pembayaran: Date.now(),
                id_user: localStorage.getItem('id'),
                nominal: this.nominal
            }).then((doc) => {
                uploadAFile(this.Image, 'foto').then((url) => {
                    setData('pembayaran_listrik', {
                        foto_bukti_pembayaran: url
                    }, doc.id).then(() => {
                        console.log('berhasil tambah data');
                        this.resetField();
                        this.showMessageDialog('Sukses Menambahkan', 'mdi-check-decagram');
                        this.isLoading = false;
                    }).catch((err) => {
                        this.isLoading = false;
                        console.log(err);
                    })
                }).catch((err) => {
                    this.isLoading = false;
                    console.log(err);
                })
            }).catch((err) => {
                this.isLoading = false;
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.nominalContainer {
    width: 280px;
    margin-top: 16px;
}
</style>