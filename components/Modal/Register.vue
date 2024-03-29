<template>
  <Modal
    v-model:enable="enableValue"
    :actions="modalActions"
    title="Cadastrar-se"
    width="500px"
  >
    <template #content>
      <v-col align="center">
        <v-form ref="formValidation">
          <v-text-field
            v-model="form.name"
            :rules="[(v) => !!v || 'Nome é obrigatório']"
            label="Nome"
            variant="solo-filled"
            clearable
            class="card-input"
            color="primary"
            required
          />
          <v-text-field
            v-model="form.lastName"
            :rules="[(v) => !!v || 'Sobrenome é obrigatório']"
            label="Sobrenome"
            variant="solo-filled"
            clearable
            class="card-input"
            color="primary"
            required
          />
          <v-text-field
            v-model="form.phone"
            :rules="[validPhone]"
            label="Telefone"
            variant="solo-filled"
            clearable
            class="card-input"
            color="primary"
            required
          />
          <v-text-field
            v-model="form.mail"
            :rules="[validMail]"
            label="E-mail"
            variant="solo-filled"
            clearable
            class="card-input"
            color="primary"
            required
          />
          <v-text-field
            v-model="form.password"
            :rules="[validPassword]"
            label="Senha"
            hint="Mínimo de 8 caracteres"
            variant="solo-filled"
            color="primary"
            clearable
            class="card-input"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
          />
          <v-text-field
            v-model="form.confirmPassword"
            :rules="[validConfirmPassword]"
            label="Confirme sua senha"
            variant="solo-filled"
            color="primary"
            clearable
            class="card-input"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
          />
        </v-form>
        <v-btn width="80%" color="success" @click="enableValue = false">Já possui uma conta?</v-btn>
      </v-col>
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

// * DATA
const loading = ref(false)
const showPassword = ref(false);
const formValidation = ref(null);
const form = reactive({
  name: null,
  lastName: null,
  phone: null,
  mail: null,
  password: null,
  confirmPassword: null,
});

const validMail = (value) => {
  if (!value) return "E-mail é obrigatório";
  if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

  return "Preencha o e-mail corretamente";
};

const validPhone = (value) => {
    if(!value) return "Telefone é obrigatório"
    if(value?.length > 10 && /[0-9-]+/.test(value)) return true

    return "Telefone precisa ter 10 digitos "
}

const validPassword = (value) => {
    if (!value) return "Senha é obrigatória";

    if (value.length < 8) return "A senha deve ter pelo menos 8 caracteres";

    if (!/[A-Z]/.test(value)) return "A senha deve conter pelo menos uma letra maiúscula";

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return "A senha deve conter pelo menos um caractere especial";

    return true;
};

const validConfirmPassword = (value) => {
    if(!value) return "Confirme a senha para continuar"

    if(value !== form.password) return "Senhas não coincidem"

    return true
}

const modalActions = [
  {
    title: "Criar conta",
    type: "confirm",
    click: () => register(),
    loading: loading.value
  },
];

const register = async () => {
  try {

    loading.value = true

    const valid = await formValidation.value.validate();

    if (!valid) throw new Error("Preencha os campos obrigatórios");

    const { success, message, data } = await useApi("/user", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (!success) throw new Error(message);
    
    $toast.success("Cadastro realizado com sucesso!")

    enableValue.value = false   

  } catch (error) {
    console.log(error.message);
    $toast.error(error.message);
  }

  loading.value = false
};
</script>
<style scoped>
.card-input {
  width: 80%;
  margin: 10px auto;
}
</style>