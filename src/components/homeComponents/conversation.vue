<template>
  <div class="bg-[#628281] my-2 rounded-r-xl h-[650px]">
    <!-- Seção de Conversa -->
    <div v-if="currentSection === 'conversa'" class="flex flex-col h-full">
      
      <!-- Header -->
      <div class="bg-[#43655a] py-2 px-3 rounded-tr-xl flex items-center">
        <img :src="imageUrl" :alt="name" class="rounded-full w-9 h-9 mr-3">
        <h2 class="text-white text-xl font-semibold">{{ name }}</h2>
      </div>

      <!-- Lista de Mensagens -->
      <div class="bg-[#F2ECFF] h-full overflow-y-auto px-4 py-2 flex-grow">
        <div v-for="(msg, index) in messages" :key="index" class="mb-2">
          <div 
            :class="{
              'bg-[#43655a] text-white self-end': msg.from === 'Luan Guedes',
              'bg-gray-200 text-black self-start': msg.from !== 'Luan Guedes'
            }" 
            class="p-2 rounded-lg max-w-[70%]"
          >
            <strong>{{ msg.from }}:</strong> {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Input de Mensagem -->
      <div class="bg-[#43655a] py-2 px-6 rounded-br-xl">
        <form @submit.prevent="handleSendMessage" class="flex items-center">
          <input 
            v-model="newMessage"
            type="text" 
            placeholder="Digite uma mensagem" 
            class="font-medium p-2 bg-[#F2ECFF] text-[#43655a] placeholder-[#B0B3B8] focus:outline-none rounded-l-xl transition duration-500 ease-linear flex-grow">
          <button 
            type="submit" 
            class="bg-[#F2ECFF] text-[#43655a] font-semibold px-4 py-2 rounded-r-xl hover:bg-[#E6E6E6] transition duration-300">
            Enviar
          </button>
        </form>
      </div>
    </div>

    <!-- Seção de Arquivos -->
    <div v-if="currentSection === 'arquivos'" class="p-4 text-white">
      <h2 class="text-xl font-semibold">Seção de Arquivos</h2>
      <p>Aqui devem estar os arquivos da rede.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conversation',
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currentSection: {
      type: String,
      required: true, // Passado do componente pai
    },
    messages: {
      type: Array,
      required: true, // Histórico de mensagens vindo do pai
    },
  },
  data() {
    return {
      newMessage: '', // Armazena a mensagem digitada
    };
  },
  methods: {
    handleSendMessage() {
      if (this.newMessage.trim()) {
        // Emite o evento para o componente pai
        this.$emit('send-message', this.newMessage);
        this.newMessage = ''; // Limpa o campo de entrada
      }
    },
  },
};
</script>
