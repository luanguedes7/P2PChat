import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Importações do Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Ícones sólidos
import { fab } from '@fortawesome/free-brands-svg-icons'; // Ícones de marcas

// Adiciona os ícones à biblioteca
library.add(fas, fab);

// Criação da aplicação Vue
const app = createApp(App);

// Registra o componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Monta a aplicação
app.mount('#app');