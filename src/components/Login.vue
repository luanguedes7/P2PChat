<template>
  <div class="flex flex-col justify-center items-center bg-[#628281] rounded-3xl py-24">
    <div class="w-full max-w-lg p-7 bg-white rounded-3xl shadow-lg">
      <h2 class="text-center text-3xl font-extrabold text-[#628281] mb-6">Bem-vindo ao P2PChat</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col items-start">
          <label for="username" class="block text-md text-gray-600 font-bold">Nome de Usuário</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required 
            class="mt-2 w-full p-2 border border-[#628281] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#628281] focus:border-transparent transition duration-200" 
            placeholder="Digite seu nome de usuário"
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-2 mt-6 bg-[#628281] text-white text-lg font-semibold rounded-xl shadow-md hover:bg-[#506c67] focus:outline-none focus:ring-2 focus:ring-[#628281] transition ease-linear duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
  <div class="mt-11 w-full bg-[#628281] rounded-3xl">
      <!-- Footer Component -->
      <Footer />
  </div>
</template>

<script>
import Footer from '../components/shared/footer.vue';

export default {
  components: {
    Footer,
  },
  data() {
    return {
      username: '',
    };
  },
  methods: {
    handleSubmit() {
      if (this.username) {
        const userData = {
          username: this.username,
        };
        // Armazena os dados do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redireciona para a página de chat
        this.$router.push({ name: 'Chat' });
      }
    },
  },
};
</script>

