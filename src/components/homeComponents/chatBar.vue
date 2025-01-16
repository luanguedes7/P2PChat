<template>
  <section v-if="currentSection === 'conversa'">
    <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
      <!-- Cabeçalho -->
      <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
        <h1 class="text-3xl font-semibold text-white">Peers Ativos</h1>
      </div>

      <!-- Lista de Peers -->
      <div class="h-[549.7px] overflow-y-auto">
        <UserChat
          v-for="(peer, index) in peers"
          :key="index"
          :imageUrl="'src/assets/img/logoUser.png'"
          :name="peer"
        />
      </div>

      <!-- NavBar -->
      <NavBar :currentSection="currentSection" @section-changed="updateSection" />
    </div>
  </section>

  <section v-if="currentSection === 'arquivos'">
    <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
      <!-- Cabeçalho -->
      <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
        <h1 class="text-3xl font-semibold text-white">Arquivos</h1>
      </div>

      <!-- Conteúdo -->
      <div class="h-[549.7px]"></div>

      <!-- NavBar -->
      <NavBar :currentSection="currentSection" @section-changed="updateSection" />
    </div>
  </section>
</template>

<script>
import UserChat from "../shared/userChat.vue";
import NavBar from "../shared/navBar.vue";

export default {
  components: { UserChat, NavBar },
  props: {
    // Recebe a lista de peers conectados do componente pai
    peers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentSection: "conversa", // Gerencia a seção localmente
    };
  },
  methods: {
    updateSection(section) {
      this.currentSection = section;
      this.$emit("section-changed", section); // Retransmite o evento para o componente pai
    },
  },
};
</script>
