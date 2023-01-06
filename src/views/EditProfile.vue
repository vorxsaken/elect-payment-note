<template>
    <v-card elevation="0">
        <v-card-text class="d-flex justify-center align-center flex-column">
            <PickImageVue deskripsi="Upload Foto Profil" :webSrc="this.$store.state.profilePicture"
                @getFileImage="getFileImage" />
            <div style="width: 280px" class="mt-4">
                <TextInputVue placeholder="Name" :value="$store.state.username" @change="e => nama = e" />
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
            <v-btn :loading="isLoading" color="grey darken-2" class="white--text px-4 py-4" @click="submitData">
                submit
            </v-btn>
        </v-card-actions>

        <!-- dialog -->
        <DialogMessage :text="text" :dialog="dialog" :icon="icon" @changeValue="e => dialog = e"></DialogMessage>
    </v-card>
</template>

<script>
import PickImageVue from '../components/PickImage.vue';
import TextInputVue from '../components/TextInput.vue';
import Compressor from 'compressorjs';
import { updateData, uploadAFile } from '../plugins/utils';
import DialogMessage from '../components/DialogMessage.vue';

export default {
    components: {
        PickImageVue,
        TextInputVue,
        DialogMessage
    },
    data() {
        return {
            image: null,
            nama: this.$store.state.username,
            isLoading: false,
            text: '',
            icon: '',
            dialog: false
        }
    },
    methods: {
        getFileImage(file) {
            var data = this;
            new Compressor(file, {
                quality: 0.8,
                width: 800,
                success(result) {
                    data.image = result;
                },
                error(err) {
                    console.log(err)
                }
            })
        },
        showDialog(text, icon) {
            this.dialog = true;
            this.text = text;
            this.icon = icon
        },
        async submitData() {
            this.isLoading = true;
            await updateData('user', localStorage.getItem('id'), {
                name: this.nama
            }).then(() => {
                this.$store.state.username = this.nama;
            }).catch((err) => {
                console.log(err);
                this.isLoading = false;
                this.showDialog('Ooops ada error', 'mdi-alert-decagram');
                return;
            })

            if (this.image) {
                await uploadAFile(this.image, 'foto').then((url) => {
                    updateData('user', localStorage.getItem('id'), {
                        foto: url
                    }).then(() => {
                        this.$store.state.profilePicture = url;
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.showDialog('Ooops ada error', 'mdi-alert-decagram');
                    return;
                })
            }

            this.isLoading = false;
            this.showDialog('Horee sukses update', 'mdi-check-decagram');
        }
    }
}
</script>