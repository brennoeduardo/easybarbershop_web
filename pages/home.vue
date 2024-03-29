<template>
  <h1>Bem-vindo ao EasyBarberShop</h1>
  <v-divider vertical></v-divider>

  <div class="d-flex justify-space-between align-center mx-8">
    <h1>Meus agendamentos</h1>
    <v-btn prepend-icon="mdi-plus" color="primary" @click="showModals.scheduler = true">Agendar</v-btn>
  </div>
  <v-divider></v-divider>


  <LazyModalScheduler v-model:enable="showModals.scheduler"/>

</template>
<script setup>

const showModals = reactive({
  scheduler: false
})


definePageMeta({
  layout: 'default'
});

</script>
<style scoped>
</style>