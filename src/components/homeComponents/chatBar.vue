<template>
    <section v-if="currentSection === 'conversa'">
        <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
            <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
                <h1 class="text-3xl font-semibold text-white">Peers Ativos</h1>
            </div>
            <div class="h-[549.7px]">
                <UserChat :imageUrl="'src/assets/img/logoUser.png'" :name="'Luan Guedes'" />
                <UserChat :imageUrl="'src/assets/img/logoUser.png'" :name="'Heitor'" />
                <UserChat :imageUrl="'src/assets/img/logoUser.png'" :name="'Eduardo'" />
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

export default {
  components: { UserChat, NavBar },
  data() {
    return {
      currentSection: "conversa", // Armazenar a seção atual localmente
    };
  },
  methods: {
    updateSection(section) {
      this.currentSection = section;
      this.$emit('section-changed', section); // Retransmite o evento para o componente pai
    },
  },
};
</script>
