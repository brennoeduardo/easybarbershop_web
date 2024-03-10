<template>
  <v-card class="card-box-login" :elevation="0">
    <v-card-title class="card-logo">
      <v-img src="/logo_barber_light.png" height="100" width="250" />
    </v-card-title>
    <v-card-text>
      <div class="card-form">
        <v-text-field
          v-model="form.mail"
          label="Email"
          type="email"
          variant="solo-filled"
          clearable
          class="card-input"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          variant="solo-filled"
          clearable
          class="card-input"
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>
        <v-btn class="card-btn" @click="login">Login</v-btn>
        <v-btn class="card-btn">Cadastrar-se</v-btn>
        <v-btn class="card-btn" append-icon="mdi-google"
          >Login com Google</v-btn
        >
        <v-divider></v-divider>
        <v-btn class="card-btn">Esqueceu sua senha?</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>

const { $toast } = useNuxtApp();

const showPassword = ref(false);

const form = reactive({
  mail: null,
  password: null,
});

const valid = () => {
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.mail || !form.password) {
    $toast.error("Preencha todos os campos.");
    return false;
  }

  if (!mailRegex.test(form.mail)) {
    $toast.error("Email inválido.");
    return false;
  }

  return true;
};

const login = async () => {
    if(!valid()) return;
    try {
        
        const { success, message, token} = await useApi('/user/login', { 
            method: 'POST',
            body: JSON.stringify(form)
        })

        if(!success) return $toast.error(message)

        $toast.success("Login efetuado com sucesso.")

        if(token && success){
            localStorage.setItem('token', token)
            setTimeout(() => {
                window.location.href = '/home'
            }, 1000)
        }


    } catch (error) {
        console.log(error.message);
        $toast.error(error.message)
    }


};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

.card-box-login {
  max-width: 45em;
  margin: 150px auto;
  padding: 20px;
}

.card-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0;
}

.card-input {
  width: 80%;
  margin: 10px auto;
}

.card-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-btn {
  width: 80%;
  margin: 10px auto;
  font-family: "Roboto", sans-serif;
  transition: 0.3s;
  font-size: 1em;
  font-weight: 500;
  background-color: #000;
  color: #fff;
}

.card-btn:hover {
  transform: scale(1.02);
  transition: 0.5s;
  background-color: #fff;
  color: #000;
}

@media (max-width: 600px) {
  .card-box-login {
    margin: 210px auto;
  }
}
</style>
