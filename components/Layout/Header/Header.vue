<template>
  <v-layout>
    <v-app-bar color="secondary" class="d-flex justify-space-between">
      <v-app-bar-title class="mt-2">
        <img src="/logo_barber_dark.png" alt="" height="145px" />
      </v-app-bar-title>

      <template v-slot:append>
        <v-col
          v-for="(action, index) in actions"
          :key="`${action}-${index}`"
          cols="auto"
        >
          <v-btn variant="plain" color="primary" @click="action.click">
            {{ action.title }}
          </v-btn>
        </v-col>
      </template>
    </v-app-bar>
  </v-layout>
</template>
<script setup>

const { $toast } = useNuxtApp()

const actions = computed(() => [
  {
    title: "Home",
    click: () => console.log("Home"),
  },
  {
    title: "Meus agendamentos",
    click: () => console.log("Meus agendamentos"),
  },
  {
    title: "Agendar",
    click: () => console.log("Agendar"),
  },
  {
    title: "Sair",
    click: () => {
      localStorage.removeItem("token");
      setTimeout(() => {
        // windo.location.href = "/login";
      }, 500);
      $toast.info("Volte sempre!")
    },
  },
]);
</script>
