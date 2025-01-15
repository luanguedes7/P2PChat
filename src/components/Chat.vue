<template>
  <div class="flex flex-col justify-center items-center min-h-screen w-[1200px]">
    <div class="grid grid-cols-12 w-full mx-4">
      <div class="col-span-3">
        <ChatBar @section-changed="updateCurrentSection" />
      </div>
      <div class="col-span-9">
        <Conversation 
          :currentSection="currentSection" 
          :imageUrl="'src/assets/img/logoUser.png'" 
          :name="'Luan Guedes'" 
        />
      </div>
    </div>

  </div>


  <div class="mt-11 w-full bg-[#628281] rounded-3xl">
      <!-- Footer Component -->
      <Footer />
  </div>

</template>

<script setup>
import { ref } from 'vue';

import ChatBar from '../components/homeComponents/chatBar.vue';
import Conversation from '../components/homeComponents/conversation.vue';
import Footer from '../components/shared/footer.vue';

const currentSection = ref('conversa');

const updateCurrentSection = (section) => {
  currentSection.value = section;
};
</script>