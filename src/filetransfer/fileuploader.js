import { Peer } from "peerjs";
import FileSharerPrototype from "./sharerinterface.js";
import FileStream from "./filereader.js";
import GetCrcHash from "./crcmodule.js"; 

export default class FileUploader extends FileSharerPrototype {
	constructor() {
		super();
		this.peers_list = null;
		this.file_reader = null;
		this.file_object = null;
	}

	setList(list) {
		this.peers_list = list;
	}

	setFileToUpload(file_object) {
		this.file_object = file_object;
		this.file_reader = new FileStream(file_object);
	}

	//Configura a conexão de requisição de download
	setDownloadRequestConn() {
        console.log("[INFO] Escutando por solicitações de download.");

		this.peer.on("connection", (request_conn) => {
			request_conn.on("data", (data) => {
				this.sendData(data);
				request_conn.close();
			});
		});
	}
	
	//Envia os dados aos forwarders
	async sendData(downloader_id) {
        console.log("[INFO] Lendo arquivo.");

		let chunck = null;
		let bytes_read = 0;
		let chunck_index = 0;
		let check_sum = 0;
		
		//Lê os dados, abre uma nova conexão, envia os dados e fecha a conexão
		while (bytes_read != -1) {
			for (let i=0; i<this.peers_list.length; i++) {
				let continue_flag = false;
				let open_flag = false;
	
				//Se a conexão não ocorrer, tentar com o próximo peer
				this.peer.on("error", (err) => {
					if (err.type === 'peer_unavailable') {
						continue_flag = true;
					}
				});

				if (continue_flag) {
					continue;
				}

				//Lê um chunck do arquivo
				bytes_read = await this.file_reader.readChunck();
				chunck = this.file_reader.getBufferedData();
				check_sum = GetCrcHash(chunck);

				//Cria uma promise que resolve quando o chunck for enviado ao forwarder
				let waitSend = new Promise((resolve, reject) => {	
					let upload_conn = this.peer.connect(this.peers_list[i].ForwarderId);			
					upload_conn.on("open", () => {
						upload_conn.on("close", () => {
							console.log("[INFO] Fechando conexão com o forwarder.");
						});

						console.log("[INFO] Conexão com o forwarder aberta.");	
						
						//Se retornar EOF, sinaliza o fim do arquivo, a conexão é terminada e o loop é quebrado
						if (bytes_read === -1) {
							upload_conn.send([downloader_id, [2, chunck_index]]);
							console.log("[INFO] Envio de arquivo finalizado!");
							resolve("OK");
							return;
						}
						
						//Envia o chunck
						console.log("[INFO] Enviando chunck ao forwarder.");

						upload_conn.send([downloader_id, [1, bytes_read, chunck_index, chunck, check_sum]]);
						chunck_index += 1;
						resolve("OK");
					});
				});

				//Aguarda a resolução da promise antes de continuar a iteração
				await waitSend.then(() => {
					console.log("[INFO] Chunck enviado com sucesso ao forwarder.");
				});
			}
		}
		
		//Após o arquivo inteiro ser enviado, o leitor de arquivos é fechado
		await this.file_reader.close();
		this.file_reader = new FileStream(this.file_object);
	}
}
