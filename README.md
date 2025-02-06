# P2P Chat - Aplicação Vue.js com WebRTC e PeerJS

## Descrição
Este é um aplicativo de chat peer-to-peer (P2P) desenvolvido com Vue.js e Tailwind CSS, utilizando WebRTC e PeerJS para comunicação direta entre usuários. O projeto permite o envio de mensagens e compartilhamento de arquivos sem a necessidade de um servidor central.

## Estrutura do Projeto
A seguir, detalhamos a estrutura de diretórios e os principais arquivos do projeto.

### Estrutura de Pastas
```
p2pchat/
├── public/                  # Arquivos estáticos públicos
├── src/                     # Código-fonte principal
│   ├── assets/              # Recursos estáticos
│   │   ├── img/             # Imagens utilizadas no projeto
│   ├── components/          # Componentes Vue reutilizáveis
│   │   ├── homeComponents/  # Componentes específicos da tela inicial
│   │   ├── shared/          # Componentes compartilhados
│   ├── filetransfer/        # Módulos para gerenciamento de arquivos
│   ├── router/              # Configuração das rotas do Vue Router
│   ├── trackerintegration/  # Integração com servidores de rastreamento WebRTC
│   ├── App.vue              # Componente raiz do Vue
│   ├── main.js              # Arquivo principal que inicializa o Vue
│   ├── style.css            # Estilos globais
├── package.json             # Dependências e configurações do projeto
├── tailwind.config.js       # Configuração do Tailwind CSS
├── vite.config.js           # Configuração do Vite para build e desenvolvimento
```

## Descrição dos Principais Arquivos

### Diretório `src/`
Contém o código-fonte principal do projeto.

- **`App.vue`**: Componente raiz do Vue, gerencia a estrutura principal da aplicação.
- **`main.js`**: Inicializa o Vue.js e configura o roteamento.
- **`style.css`**: Contém os estilos globais.

### Diretório `src/components/`
Armazena componentes Vue reutilizáveis.

- **`Chat.vue`**: Interface principal do chat, gerencia mensagens e usuários conectados.
- **`Login.vue`**: Tela de login, permite ao usuário acessar a aplicação.

#### `homeComponents/`
- **`chatBar.vue`**: Barra lateral do chat, mostrando usuários conectados e gerenciando conexões PeerJS.
- **`chatConversation.vue`**: Componente responsável pela exibição das mensagens trocadas.

#### `shared/`
- **`filesList.vue`**: Gerencia a lista de arquivos compartilhados.
- **`footer.vue`**: Rodapé da aplicação.
- **`navBar.vue`**: Barra de navegação superior.
- **`userChat.vue`**: Exibição individual dos usuários conectados.

### Diretório `src/filetransfer/`
Gerencia o compartilhamento de arquivos via WebRTC.

- **`filebuilder.js`**: Monta os arquivos recebidos.
- **`filedownloader.js`**: Controla o download de arquivos compartilhados.
- **`fileforwarder.js`**: Encaminha arquivos entre pares.
- **`filereader.js`**: Lê arquivos localmente para envio.
- **`fileuploader.js`**: Gerencia o envio de arquivos.
- **`sharerinterface.js`**: Interface para compartilhamento de arquivos.

### Diretório `src/router/`
- **`index.js`**: Configuração das rotas do Vue Router para navegação entre páginas.

## Tecnologias Utilizadas
- Vue.js
- Tailwind CSS
- WebRTC
- PeerJS
- Vite

## Como Rodar o Projeto

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

3. Acesse a aplicação no navegador pelo endereço exibido no terminal.

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

