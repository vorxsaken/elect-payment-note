<template>
  <v-text-field
    type="text"
    single-line
    outlined
    flat
    :placeholder="placeholder"
    color="grey darken-3"
    hide-details=""
    v-model="text"
    clearable
    clear-icon="mdi-close-circle"
    @click:clear="text = ''"
  >
  </v-text-field>
</template>

<script>
export default {
    props: ['placeholder'],
    data() {
        return {
            text: ''
        }
    },
    watch: {
        text() {
            this.$emit('change', this.text);
        }
    }
}
</script>

<style>

</style>