import { Peer } from "peerjs";
import FileSharerPrototype from "sharerinterface.js";

export default class FileForwarder extends FileSharerPrototype {
	constructor() {
		super();
		this.receiver_peer = new Peer();
		this.receiver_conn = null;
	}
	
	//Configura o encaminhamento de dados ao peer que está realizando o download
	forwardData(downloader_id, data) {
		this.connectToPeer(downloader_id);
		this.peer_conn.on("open", () => {
			console.log("[INFO] Abrindo conexão para encaminhar dados.");

			this.peer_conn.on("close", () => {
				console.log("[INFO] Fechando conexão de encaminhamento de dados.");
			});

			this.peer_conn.send(data);
			this.peer_conn.close();
			this.peer_conn = null;
		});		
	}
	
	//Configura a conexão com o peer que está realizando o upload do arquivo
	setConnToReceiveData() {
		this.receiver_peer.on("connection", (data_conn) => {
			console.log("[INFO] Criando conexão para receber dados do uploader.");

			this.receiver_conn = data_conn;
		
			this.receiver_conn.on("close", () => {
				this.receiver_conn = null;
				console.log("[INFO] Finalizando conexão de recebimento de dados para encaminhamento.");
			});

			this.receiver_conn.on("data", (data) => {
				const downloader_id = data[0];
				const chunck = data[1];

				this.forwardData(downloader_id, chunck);
				this.receiver_conn.close();
			});
		});
		
	}
}
