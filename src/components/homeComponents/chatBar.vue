<template>
    <section v-if="currentSection === 'conversa'">
        <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
            <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
                <h1 class="text-3xl font-semibold text-white">Peers Ativos</h1>
            </div>
            <div class="h-[549.7px]">
                        <UserChat
                          v-for="(peer, index) in activePeers"
                          :key="index"
                          :imageUrl="'src/assets/img/logoUser.png'"
                          :name="peer.username"
                        />
            </div>
            <NavBar :currentSection="currentSection" @section-changed="updateSection" />
        </div>
    </section>
    <section v-if="currentSection === 'arquivos'">
        <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
            <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
            <h1 class="text-3xl font-semibold text-white">Arquivos</h1>
            </div>
            <div class="h-[549.7px]">
            </div>
            <NavBar :currentSection="currentSection" @section-changed="updateSection" />
        </div>
    </section>
</template>

<script>
import UserChat from "../shared/userChat.vue";
import NavBar from "../shared/navBar.vue";
import { connectWebSocket, sendMessage } from "../../trackerintegration/tracker.js";

export default {
  components: { UserChat, NavBar },
  data() {
    return {
      currentSection: "conversa", // Armazenar a seção atual localmente
      socket: null,
      activePeers: [],
    };
  },
  methods: {
    updateSection(section) {
      this.currentSection = section;
      this.$emit('section-changed', section); // Retransmite o evento para o componente pai
    },

    handleMessage(data) {
      // Processa as mensagens recebidas
      const messageType = data[0]; // Tipo da mensagem
      const messageContent = data.slice(1); // Conteúdo da mensagem

      if (messageType === "3") {
        // Mensagem de lista de peers ativos
        try {
          const peers = JSON.parse(messageContent);
          this.activePeers = peers; // Atualiza a lista de peers ativos
        } catch (error) {
          console.error("[ERROR] Falha ao parsear lista de peers:", error);
        }
      }
    },

    handleError(error) {
      console.error("[ERROR] WebSocket erro:", error);
    },

    handleClose() {
      console.log("[INFO] Conexão WebSocket encerrada.");
    },

    requestPeers() {
      // Envia mensagem para solicitar a lista de peers ativos
      sendMessage("3\n");
    },

  },

  mounted() {
    connectWebSocket("ws://localhost:9595", this.handleMessage, this.handleError, this.handleClose)
      .then((socket) => {
        // Agora que a conexão foi aberta, envie uma mensagem
        return sendMessage("3\n");
      })
      .then((response) => {
        console.log(response); // Mensagem enviada com sucesso
      })
      .catch((error) => {
        console.error("Erro: ", error); // Se ocorrer algum erro, seja na conexão ou no envio
      });
    }

};
</script>
