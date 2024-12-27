<template>
  <div class="bg-[#43655a] px-3 rounded-bl-xl flex items-center">
    <!-- Avatar -->
    <div class="font-medium p-2 flex items-center">
      <div class="bg-gray-100 rounded-full p-4 relative">
        <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 p-1.5 rounded-full text-[#43655a]"></div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex ml-4">
      <!-- Conversa Button -->
      <button 
        @click="updateSection('conversa')" 
        :class="['p-3 hover:bg-gray-400 transition-all duration-300 px-3', 
                  currentSection === 'conversa' ? 'bg-[#dadde2] text-[#43655a]' : 'text-[#dadde2]']">
        <font-awesome-icon :icon="['fas', 'comments']" flip="horizontal" size="lg" />
      </button>

      <!-- Arquivos Button -->
      <button 
        @click="updateSection('arquivos')" 
        :class="['p-3 hover:bg-gray-400 transition-all duration-300 px-3', 
                  currentSection === 'arquivos' ? 'bg-[#dadde2] text-[#43655a]' : 'text-[#dadde2]']">
        <font-awesome-icon :icon="['fas', 'folder']" size="lg" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    currentSection: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateSection(section) {
      this.$emit('section-changed', section); // Emite o evento para o pai
    },
  },
};
</script>
