<template>
  <div class="flex flex-col justify-center items-center min-h-screen w-[1200px]">
    <div class="grid grid-cols-12 w-full mx-4">
      <div class="col-span-12">
        <ChatBar @section-changed="updateCurrentSection" />
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
import Footer from '../components/shared/footer.vue';

const currentSection = ref('conversa');

const updateCurrentSection = (section) => {
  currentSection.value = section;
};
</script>