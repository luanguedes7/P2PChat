<template>
  <div class="bg-[#628281] my-2 rounded-r-xl h-[650px]">
    <div v-if="currentSection === 'conversa'">
    
      <!-- Header -->
      <div class="bg-[#43655a] py-2 px-3 rounded-tr-xl flex justify-between">
        <img :src="imageUrl" :alt="name" class="rounded-full w-9 h-9 ml-[365px]">
        <div class="col-span-1 mt-1 cursor-pointer hover:bg-[#889fa5] text-white bg-[#628281] font-semibold p-1 rounded-lg transition-all duration-300 ease-linear">
          <font-awesome-icon :icon="['fas', 'file']" class="mx-1" />
        </div>
      </div>

      <!-- Dynamic Content -->
      <div class="bg-transparent h-[549.6px]">
      </div>

      <!-- Footer -->
      <div class="bg-[#43655a] py-2 px-6 rounded-br-xl">
        <form>
          <div class="bg-[#F2ECFF] rounded-xl w-full flex items-center">
            <input 
              type="text" 
              placeholder="Digite uma mensagem" 
              class="font-medium p-1 bg-transparent text-[#43655a] placeholder-[#B0B3B8] focus:outline-none rounded-l-xl transition duration-500 ease-linear flex-grow">
            <button class="mx-2"><font-awesome-icon :icon="['fas', 'file-export']" class="text-[#B0B3B8]" /></button>
            <button class="mx-2"><font-awesome-icon :icon="['fas', 'video']" class="text-[#B0B3B8]" /></button>
            <button class="ml-2 mr-3"><font-awesome-icon :icon="['fas', 'images']" class="text-[#B0B3B8]" /></button>
            <button type="submit" class="hidden"></button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="currentSection === 'arquivos'" class="p-4 text-white">
      <h2 class="text-xl font-semibold">Seção de Arquivos</h2>
      <p>Aqui deve estar os arquivos da rede</p>
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
  },
};
</script>
