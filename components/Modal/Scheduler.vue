<template>
  <Modal v-model:enable="enableValue" title="Agendar Serviço" width="1000px">
    <template #content>
      <v-row no-gutters class="row-inputs">
        <v-col cols="3">
          <v-text-field
            color="primary"
            type="date"
            label="Selecione o dia"
            variant="solo-filled"
          />
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            v-model="selectedProfessional"
            color="primary"
            :items="professionais"
            item-value="id"
            item-title="name"
            label="Selecione o profissional"
            variant="solo-filled"
          />
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            color="primary"
            v-model="selectedService"
            label="Selecione o serviço"
            variant="solo-filled"
            item-value="id"
            item-title="name"
            :disabled="!selectedProfessional"
          />
        </v-col>

        <v-btn
          append-icon="mdi-magnify"
          color="primary"
          size="53"
          class="mt-1"
          @click="loading = true"
        />
      </v-row>
      <v-row>
        <LayoutLoading v-if="loading" />
      </v-row>
      <v-divider color="primary"></v-divider>
    </template>
  </Modal>
</template>
<script setup>
const { $toast } = useNuxtApp();

const emit = defineEmits(["save", "close", "update:enable"]);
const props = defineProps({
  enable: { type: Boolean, default: false },
});

const enableValue = computed({
  get: () => props.enable,
  set: (value) => emit("update:enable", value),
});

const services = ref([]);
const selectedService = ref(null);
const loading = ref(false);
const professionais = ref([]);
const selectedProfessional = ref(null);

const getProfessionais = async () => {
  try {
    const { success, message, data } = await useApi("/barber");

    if (!success) throw new Error(message);

    professionais.value = data;
  } catch (error) {
    console.log(error);
    $toast.error(error.message);
  }
};

const getServices = async () => {
  try {
    const { success, message, data } = await useApi(`/service/${selectedProfessional.value.id}`);

    if (!success) throw new Error(message);

    services.value = data;

  } catch (error) {
    console.log(error);
    $toast.error(error.message);
  }
};

await getProfessionais();
await getServices()
</script>
<style scoped>
.row-inputs {
  gap: 9px;
}
</style>