<template>
  <v-card elevation="0">
    <v-card-title class="d-flex justify-center">
        <v-avatar size="190" color="grey darken-2">
            <v-img :src="this.$store.state.profilePicture">
            </v-img>
        </v-avatar>
    </v-card-title>
    <v-card-subtitle class="d-flex justify-center pt-3 text-subtitle-1 grey--text text--darken-2 font-weight-bold">
        {{ this.$store.state.username }}
    </v-card-subtitle>
    <v-card-text>
        <v-list class="pl-10">
            <v-list-item link :to="{name: 'Edit Profile'}">
                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold grey--text text--darken-2">Edit Profile</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'History Pembayaran'}">
                <v-list-item-icon>
                    <v-icon>mdi-history</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold grey--text text--darken-2">History Pembayaran</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'Tambah Anggota'}">
                <v-list-item-icon>
                    <v-icon>mdi-account-multiple-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold grey--text text--darken-2">Tambah Anggota</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold grey--text text--darken-2">Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>