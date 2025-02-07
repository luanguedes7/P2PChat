<template>
  <div class="grid grid-cols-10">
    <section v-if="currentSection === 'conversa'" class="col-span-3">
      <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
        <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
          <h1 class="text-3xl font-semibold text-white">Peers Ativos</h1>
        </div>
        <div class="h-[549.7px] overflow-y-auto">
          <UserChat
            v-for="(peer, index) in activePeers"
            :key="index"
            :imageUrl="'src/assets/img/logoUser.png'"
            :name="String(peer.Username)"
            @click="handlePeerClick(peer)"
          />
        </div>

        <NavBar :currentSection="currentSection" @section-changed="updateSection" />
      </div>
    </section>
    <section v-if="currentSection === 'arquivos'" class="col-span-3">
      <div class="bg-[#dadde2] rounded-l-xl mt-2 border-r-2 h-[649px]">
        <div class="bg-[#43655a] py-2 px-3 rounded-tl-xl">
          <h1 class="text-3xl font-semibold text-white">Arquivos</h1>
        </div>
        <div class="h-[549.7px] overflow-y-auto">
          <FileList
            v-for="(file_info, index) in activeFiles"
            :key="index"
            :imageUrl="'src/assets/img/logoUser.png'"
            :name="String(file_info.Username)"
			:file="String(file_info.FileName)"
            @click="handleFileClick(file_info)"
          />
		</div>
        <NavBar :currentSection="currentSection" @section-changed="updateSection" />
      </div>
    </section>

    <div class="bg-[#628281] my-2 rounded-r-xl h-[650px] col-span-7">
      <div v-if="currentSection === 'conversa'">
        <!-- Header -->
        <div class="bg-[#43655a] py-2 px-3 rounded-tr-xl flex justify-center">
          <img :src="'src/assets/img/logoUser.png'" :alt="'Luan Guedes'" class="rounded-full w-9 h-9">
        </div>

        <!-- Dynamic Content -->
        <div class="bg-transparent h-[549.6px] overflow-y-auto px-4 py-2 space-y-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="flex flex-col"
            :class="{
              'items-end': message.senderId === peerId,
              'items-start': message.senderId !== peerId
            }"
          >
            <p class="text-xs text-[#dadde2] font-medium">
              {{ message.senderId === peerId ? 'Você' : message.senderName }} → 
              {{ message.receiverId === peerId ? 'Você' : message.receiverName }}
            </p>
            <div
              class="rounded-xl px-4 py-2 max-w-[70%] text-sm"
              :class="{
                'bg-[#43655a] text-white': message.senderId === peerId,
                'bg-[#dadde2] text-[#43655a]': message.senderId !== peerId
              }"
            >
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-[#43655a] py-2 px-6 rounded-br-xl">
          <form @submit.prevent="sendMessage">
            <div class="bg-[#F2ECFF] rounded-xl w-full flex items-center">
              <input
                type="text"
                v-model="msg"
                placeholder="Digite uma mensagem"
                class="font-medium p-1 bg-transparent text-[#43655a] placeholder-[#B0B3B8] focus:outline-none rounded-l-xl transition duration-500 ease-linear flex-grow"
              />
              <button type="submit" class="hidden"></button> 
            </div>
          </form>
        </div>
      </div>
      <div v-if="currentSection === 'arquivos'" class="p-6 text-white col-span-7 bg-[#43655a] rounded-r-lg">
        <h2 class="text-2xl font-semibold mb-3">Seção de Arquivos</h2>
        <p class="text-white mb-1">Aqui devem estar os arquivos da rede</p>

        <div class="space-y-4">
          <label class="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded cursor-pointer transition-colors inline-block">
            Selecionar Arquivo
            <input 
              type="file" 
              @change="setFile" 
              class="hidden"
            />
          </label>

          <button 
            @click="sendFileInfo()"
            class="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded transition-colors"
          >
            Enviar
          </button>

          <button 
            @click="downloadFile()"
            class="ml-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded transition-colors"
          >
            Baixar
          </button>
        </div>

        <div class="mt-10">
          <h2 class="text-xl font-semibold mb-3">Seletor de Banda</h2>
          <p class="text-white mb-2">Selecione sua prioridade</p>

          <div>
            <form action="" class="flex items-center space-x-4">
              <select name="nivel" v-model="priority" id="nivel" class="text-black bg-white border border-gray-300 rounded px-4 py-2">
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>

              <button 
                @click="selectPriority()"
                class=" bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded transition-colors"
              >
                Escolher
              </button>
            </form>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import UserChat from "../shared/userChat.vue";
import FileList from "../shared/filesList.vue";
import NavBar from "../shared/navBar.vue";
import Peer from "peerjs";
import FileDownloader from "../../filetransfer/filedownloader.js";
import FileForwarder from "../../filetransfer/fileforwarder.js";
import FileUploader from "../../filetransfer/fileuploader.js";

export default {
  components: { UserChat, NavBar, FileList },
  data() {
    return {
      username: "",
      msg: "", // Mensagem do input
      messages: [], // Lista de mensagens exibidas na tela
      currentSection: "conversa",
      socket: null,
      activePeers: [],
      activeFiles: [],
      fileToDownload: null,
      peer: null,
      peerId: null, // ID do Peer atual
      fileName: null,
      fileObject: null,
      currentConnection: null,
      currentPeer: null, // Informações do peer atual conectado
      downloader: null,
      uploader: null,
      forwarder: null,
      priority: ""
    };
  },

  methods: {
    updateSection(section) {
      this.currentSection = section;
      this.$emit("section-changed", section);
    },

    selectPriority() {
      this.downloader.setPriority(this.priority);
    },

    setFile(change_file_event) {
      this.fileName = change_file_event.target.files[0].name;
      console.log(change_file_event.target.files);
      this.fileObject = change_file_event.target.files[0];
      console.log(`[INFO] O arquivo ${this.fileName} foi selecionado para upload.`);
    },

    sendFileInfo() {
         if (this.fileName) {
		   const fileToUpload = JSON.stringify({
             Username: this.username,
             FileName: this.fileName,
             UploaderId: this.uploader.getId()
           });

           console.log(`[INFO] Enviando ${fileToUpload} ao tracker.`);

      	   this.trackerSocket.send(`1${fileToUpload}\n`);
          
           //Configura o uploader para escutar por solicitações 
           this.uploader.setFileToUpload(this.fileObject);
           this.uploader.setList(this.activePeers); 
        }else{
          console.log("[ERROR] Nenhum arquivo foi selecionado.");
        }
    },

    handlePeerClick(peer) {
      const conn = this.peer.connect(peer.Id);
      this.currentConnection = conn;
      this.currentPeer = peer;
      console.log("Conectado ao peer:", peer.Id);

      conn.on("open", () => {
        console.log("[INFO] Conexão aberta com o peer:", peer.Id);
      });

      conn.on("data", (data) => {
        console.log("[INFO] Mensagem recebida:", data);
        this.messages.push({
          text: data.text,
          senderId: data.senderId,
          senderName: data.senderName,
          receiverId: data.receiverId,
          receiverName: data.receiverName,
        });
      });
    },

    handleFileClick(file_info) {
      this.fileToDownload = file_info;
    },

    downloadFile() { 
      this.downloader.requestDownload(this.fileToDownload.UploaderId, this.fileToDownload.FileName); 
    },

    sendMessage() {
      if (this.currentConnection && this.msg.trim()) {
        const message = {
          text: this.msg.trim(),
          senderId: this.peerId,
          senderName: this.username,
          receiverId: this.currentPeer.Id,
          receiverName: this.currentPeer.Username,
        };

        this.currentConnection.send(message);
        this.messages.push(message); // Adiciona a mensagem enviada
        this.msg = ""; // Limpa o input
      } else {
        console.warn("[WARNING] Nenhuma conexão ativa ou mensagem vazia.");
      }
    },

  },

  async mounted() {
    this.downloader = new FileDownloader();
    this.forwarder = new FileForwarder();
    this.uploader = new FileUploader();

    const userData = JSON.parse(localStorage.getItem("userData"));
    this.username = userData.username;	

    if (userData) {
      this.peer = new Peer();
      this.peer.on("open", (peerId) => {
        console.log(`[INFO] ID PeerJS gerado: ${peerId}`);
        this.peerId = peerId;

        userData.id = peerId;
        localStorage.setItem("userData", JSON.stringify(userData));

        this.trackerSocket = new WebSocket("ws://localhost:9595");
        this.trackerSocket.onopen = () => {
          const userDataMessage = JSON.stringify({
            Username: userData.username,
            Id: peerId,
            ForwarderId: this.forwarder.getId()
          });
          this.trackerSocket.send(`2${userDataMessage}\n`);
          this.trackerSocket.send("3\n");
		  this.trackerSocket.send("4\n");
        };

        this.trackerSocket.onmessage = (event) => {
          const messageType = event.data[0];
          const messageContent = event.data.slice(1);
			
          console.log("[INFO] Mensagem recebida do tracker: " + messageContent);

          if (messageType === "3") {
            try {
              this.activePeers = JSON.parse(messageContent);
              this.uploader.setList(this.activePeers);
            } catch (error) {
              console.error("[ERROR] Falha ao parsear lista de peers:", error);
            }
          }

          if (messageType === "4") {
            try {
              this.activeFiles = JSON.parse(messageContent);
              console.log(this.activeFiles);
            } catch (error) {
              console.error("[ERROR] Falha ao parsear lista de arquivos:", error);
            }
          }
        };

        this.peer.on("connection", (conn) => {
          conn.on("data", (data) => {
            console.log("[INFO] Mensagem recebida:", data);
            this.messages.push({
              text: data.text,
              senderId: data.senderId,
              senderName: data.senderName,
              receiverId: data.receiverId,
              receiverName: data.receiverName,
            });
          });
        });
      });

    }

    this.forwarder.setConnToReceiveData();
    this.uploader.setDownloadRequestConn();
    this.downloader.setDownloadConn();

    setInterval(() => {
      this.trackerSocket.send("3\n");
      this.trackerSocket.send("4\n");
    }, 5000);
  },
};
</script>
