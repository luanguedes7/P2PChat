import { Peer } from "peerjs";
import FileSharerPrototype from "./sharerinterface.js";

export default class FileForwarder extends FileSharerPrototype {
	constructor() {
		super();
	}
	
	//Configura o encaminhamento de dados ao peer que está realizando o download
	forwardData(downloader_id, data) {
		this.peer.on("error", (err) => {
            console.log(err);

			if (err.type === 'peer_unavailable') {
				console.log("[ERROR] Não foi possível solicitar o arquivo!");
			}
		});

		let forward_conn = this.peer.connect(downloader_id);

		forward_conn.on("open", () => {
			console.log("[INFO] Abrindo conexão para encaminhar dados.");

			forward_conn.on("close", () => {
				console.log("[INFO] Fechando conexão de encaminhamento de dados.");
			});

			forward_conn.send(data);
            console.log("[INFO] Enviando chunck ao solicitante do download.");
			console.log(data);
			forward_conn.close();	
		});		
	}
	
	//Configura a conexão com o peer que está realizando o upload do arquivo
	setConnToReceiveData() {
		this.peer.on("connection", (data_conn) => {
			console.log("[INFO] Criando conexão para receber dados do uploader.");
		
			data_conn.on("data", (data) => {
				console.log("[INFO] Recebendo chunck e o encaminhando.");

				const downloader_id = data[0];
				const chunck = data[1];

				this.forwardData(downloader_id, chunck);
				data_conn.close();	
			});

			data_conn.on("close", () => {
				console.log("[INFO] Finalizando conexão de recebimento de dados para encaminhamento.");
			});	
		});
		
	}
}
