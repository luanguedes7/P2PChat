<template>
  <div class="group bg-transparent border-b-[2.5px] border-[#B9A590b] px-4 py-1 grid grid-cols-5 hover:bg-[#628281] hover:cursor-pointer transition-all duration-500 ease-linear">
    <div class="relative col-span-1">
        <img :src="imageUrl" :alt="name" class="rounded-full w-10 h-10 ">
        <div class="h-1 w-1 p-1.5 mt-3 ml-7 bg-green-500 rounded-full absolute top-4 left-0"></div>
    </div>
    <p class="text-[14.4px] font-semibold text-[#43655a] col-span-4 mt-2 group-hover:text-white transition-all duration-700">{{ name }}</p>
    <p class="text-[14.4px] font-semibold text-[#43655a] col-span-4 mt-2 group-hover:text-white transition-all duration-700">{{ file }}</p>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  props: {

    imageUrl: {
      type: String,
      required: true, 
    },
    
    name: {
      type: String,
      required: true, 
    },

    file: {
      type: String,
      required: true,
    }
  }
};
</script>
