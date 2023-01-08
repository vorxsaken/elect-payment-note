<template>
    <div>
        <input type="file" class="d-none" ref="inputFile" @change="fileChange">
        <div v-if="fileImage || fileImageSrc"
            style="width: auto; height: auto; border-radius: 10px; overflow: hidden; border: 1px grey solid;"
            @click="pickPictureChoice = true">
            <v-img width="300" height="300" :src="fileImageSrc"></v-img>
        </div>
        <div v-else class="addImage d-flex justify-center align-center flex-column" @click="pickPictureChoice = true">
            <v-icon size="80" color="white">mdi-plus-box</v-icon>
            <p class="text-roboto white--text font-weight-bold mt-2">{{ deskripsi }}</p>
        </div>
        <v-bottom-sheet v-model="pickPictureChoice">
            <v-card>
                <v-card-actions class="pt-6 pl-6">
                    <div @click="fromCamera" class="d-flex justify-center align-center flex-column">
                        <v-icon size="40" color="blue-grey darken-1">mdi-camera</v-icon>
                        <p class="text-caption font-weight-bold blue-grey--text text-darken-1">Kamera</p>
                    </div>
                    <div @click="pickFromGallery" class="d-flex justify-center align-center flex-column ml-8">
                        <v-icon size="40" color="blue-grey darken-1">mdi-panorama-variant-outline</v-icon>
                        <p class="text-caption font-weight-bold blue-grey--text text-darken-1">Gallery</p>
                    </div>
                </v-card-actions>
            </v-card>
        </v-bottom-sheet>
    </div>
</template>

<script>
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default {
    props: {
        deskripsi: String,
        webSrc: String
    },
    data() {
        return {
            fileImage: null,
            fileImageSrc: this.webSrc ? this.webSrc : null,
            fileType: ['image/jpg', 'image/jpeg', 'image/webp', 'image/png'],
            pickPictureChoice: false,
        }
    },
    methods: {
        b64ToBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacter = atob(b64Data);
            var byteArrays = [];

            for(var offset = 0; offset < byteCharacter.length; offset += sliceSize) {
                var slice = byteCharacter.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for(var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        },
        fileChange(e) {
            if (this.fileType.some(type => type == e.target.files[0].type)) {
                this.fileImage = e.target.files[0];
                console.log(this.fileImage);
                this.fileImageSrc = URL.createObjectURL(this.fileImage);
                this.$emit('getFileImage', this.fileImage);
            }
        },
        pickFromGallery() {
            this.$refs.inputFile.click();
            this.pickPictureChoice = false;
        },
        async fromCamera() {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                source: CameraSource.Camera,
                resultType: CameraResultType.DataUrl
            });

            const block = image.dataUrl.split(';');
            // get content type
            const contentType = block[0].split(':')[1];
            // get base64 data example: /9j/4AAQSkZJRgAB....
            const b64Data = block[1].split(',')[1];

            // convert it to blob type
            const blob = this.b64ToBlob(b64Data, contentType);
            
            this.fileImage = blob;
            this.fileImageSrc = URL.createObjectURL(blob);
            this.$emit('getFileImage', this.fileImage);
        }
    },
    watch: {
        webSrc() {
            this.fileImageSrc = this.webSrc;
        }
    }
}
</script>

<style lang="scss" scoped>
.addImage {
    width: 300px;
    height: 300px;
    border: 3px #404752 solid;
    border-radius: 10px;
    background-color: #404752;
}
</style>