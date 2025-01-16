<template> 
  <div class="flex flex-col justify-center items-center min-h-screen w-[1200px]">
    <div class="grid grid-cols-12 w-full mx-4">
      <!-- ChatBar: Lista de peers conectados -->
      <div class="col-span-3">
        <ChatBar 
          @section-changed="updateCurrentSection" 
          :peers="peers" 
        />
      </div>

      <!-- Conversation: Exibição e envio de mensagens -->
      <div class="col-span-9">
        <Conversation 
          :currentSection="currentSection" 
          :imageUrl="'src/assets/img/logoUser.png'" 
          :name="'Luan Guedes'" 
          :messages="messages" 
          @send-message="sendMessage" 
        />
      </div>
    </div>

    <div class="mt-11 w-full bg-[#628281] rounded-3xl">
      <!-- Footer Component -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import ChatBar from '../components/homeComponents/chatBar.vue';
import Conversation from '../components/homeComponents/conversation.vue';
import Footer from '../components/shared/footer.vue';

// Estado do componente
const currentSection = ref('conversa');
const updateCurrentSection = (section) => {
  currentSection.value = section;
};

// WebSocket
const ws = ref(null);
const peers = ref([]); // Lista de peers conectados
const messages = ref([]); // Histórico de mensagens

// Conexão com o servidor WebSocket
const connectToServer = () => {
  ws.value = new WebSocket("ws://localhost:9595/ws");

  ws.value.onopen = () => {
    console.log("Conectado ao servidor WebSocket");
  };

  ws.value.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        // Atualiza a lista de peers conectados
        peers.value = data;
      } else if (data.type === "chat") {
        // Adiciona a mensagem recebida ao histórico
        messages.value.push(data);
      }
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
    }
  };

  ws.value.onclose = () => {
    console.log("Conexão WebSocket fechada");
    ws.value = null;
  };
};

// Envio de mensagens para o servidor WebSocket
const sendMessage = (message) => {
  if (ws.value && message.trim()) {
    const msg = { type: "chat", text: message, from: "Luan Guedes" };
    ws.value.send(JSON.stringify(msg)); // Envia para o servidor
    messages.value.push(msg); // Adiciona localmente
  }
};

// Ciclo de vida do componente
onMounted(() => {
  connectToServer();
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});
</script>
