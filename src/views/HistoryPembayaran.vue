<template>
  <v-container>
    <v-row>
        <v-col cols="12" sm="12" md="6" lg="3">
            <PaymentListVue />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentListVue from '../components/PaymentList.vue';
export default {
    components: {
        PaymentListVue
    }
}
</script>

<style>

</style>