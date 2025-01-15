<template>
  <div id="app">
    <router-view /> <!-- Ponto de montagem das rotas -->
  </div>
</template>

<script setup>
import NavBar from './components/shared/navBar.vue';
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
