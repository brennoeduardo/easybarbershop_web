<template>
  <v-card flat height="100%" width="100%" rounded="lg" class="d-flex flex-column align-center justify-center pa-10" :color="color">
    <!-- <v-progress-circular width="10" size="100" indeterminate color="primary" /> -->
    <!-- Speed 10 -->
    <v-icon size="100" color="primary" class="mb-5">mdi-loading mdi-spin</v-icon>
  </v-card>
</template>

<script setup>
const props = defineProps({
  color: { type: String, default: 'transparent' }
})
</script>