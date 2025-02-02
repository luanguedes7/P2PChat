import { Peer } from "peerjs";
import FileSharerPrototype from "./sharerinterface.js";
import FileStream from "./filereader.js";

const BUFFER_SIZE = 1024;

export default class FileUploader extends FileSharerPrototype {
	constructor() {
		super();
		this.peers_list = null;
		this.file_reader = null;
	}

	setList(list) {
		this.peers_list = list;
	}

	setFileToUpload(file_object) {
		this.file_reader = FileStream(file_object, BUFFER_SIZE);
	}

	//Configura a conexão de requisição de download
	setDownloadRequestConn() {
		this.peer.on("connection", (request_conn) => {
			request_conn.on("data", (data) => {
				sendData(data);
				request_conn.close();
			});
		});
	}
	
	//Envia os dados aos forwarders
	async sendData(downloader_id) {
		let chunck = null;
		let bytes_read = 0;
		let chunck_index = 0;
		
		//Lê os dados, abre uma nova conexão, envia os dados e fecha a conexão
		while (bytes_read === -1) {
			for (let i=0; i<list.length; i++) {
				let continue_flag = false;
	
				//Se a conexão não ocorrer, tentar com o próximo peer
				this.peer.on("error", (err) => {
					if (err.type === 'peer_unavailable') {
						continue_flag = true;
					}
				});

				if (continue_flag) {
					continue;
				}

				this.connectToPeer(list[i].forwarder_id);			
				
				//Lê um chunck do arquivo
				bytes_read = await this.file_reader.readChunck();
				chunck = this.file_reader.getBufferedData();
				
				//Se retornar EOF, sinaliza o fim do arquivo, a conexão é terminada e o loop é quebrado
				if (bytes_read === -1) {
					this.peer_conn.send([downloader_id, [2, "EOF"]]);
					this.peer_conn.close();
					this.peer_conn = null;
					break;
				}
				
				//Envia o chunck e termina a conexão
				this.peer_conn.send([downloader_id, [1, BUFFER_SIZE, chunck_index, chunck]]);
				chunck_index += 1;
				this.peer_conn.close();
				this.peer_conn = null;
			}
		}
		
		//Após o arquivo inteiro ser enviado, o leitor de arquivos é fechado
		await this.file_reader.close();
		this.file_reader = null;
	}
}
