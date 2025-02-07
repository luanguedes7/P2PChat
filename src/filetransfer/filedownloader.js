import FileSharerPrototype from "./sharerinterface.js";
import FileBuilder from "./filebuilder.js";
import GetCrcHash from "./crcmodule.js";

export default class FileDownloader extends FileSharerPrototype {
	constructor() {
		super();
		this.file_builder = null;
		this.file_name = null;
		this.start_time;
	}

	async checkFileSize(size) {
		return new Promise((resolve, reject) => {
			while (this.file_builder.getChuncksNum() < size) {}
			resolve("OK");
			return;
		});
	}

	startCount() {
		this.start_time = Date.now();
	}

	getElapsedTime() {
		const final_count = (Date.now() - this.start_time)/1000;	
		this.start_time = null;

		return final_count;
	}

	requestDownload(uploader_id, file_name) {
		this.file_name = file_name;
		this.connectToPeer(uploader_id);
		
		this.peer.on("error", (err) => {
			if (err.type === 'peer_unavailable') {
				console.log("[ERROR] Não foi possível solicitar o arquivo!");
			}
		});

		this.peer_conn.on("open", () => {
			this.file_builder = new FileBuilder();

			console.log(`[INFO] Solicitando o download do arquivo.`);
				
			this.peer_conn.on("close", () => {
				this.peer_conn = null;
			});

			this.peer_conn.send(this.getId());
			this.startCount();
		});	
	}

	setDownloadConn() {
		this.peer.on("connection", (data_conn) => {
			//Inicialização da conexão
			console.log("[INFO] Conexão com peer para download iniciada.");
			
			//Processamento dos dados recebidos na conexão para download
			data_conn.on("data", async (data) => {
				let chunck_size = 0;
				let chunck_data = null;
				let chunck_order = 0;				
				let hash_from_message = null;
				let new_hash = null;
				console.log(data);
	
				switch (data[0]) {
					case 1:
						chunck_size = data[1];
						chunck_order = data[2];
						chunck_data = data[3];
						hash_from_message = data[4];
						new_hash = GetCrcHash(chunck_data);
						
						//Verifica o hash do CRC para identificar erros
						if (hash_from_message != new_hash) {
							alert("Arquivo corrompido!");
						}
		
						this.file_builder.pushData(chunck_data, chunck_order);						

						console.log(`[INFO] Chunck de ${chunck_size} bytes recebido.`);
						break;
					case 2:
						await this.checkFileSize(data[1]);

						this.file_builder.buildFile();
						this.file_builder.downloadFile(this.file_name);												
						this.file_builder.close();
						this.file_builder = null;				

						console.log("[INFO] Download concluído com sucesso!");
						console.log(`[INFO] O download levou ${this.getElapsedTime()} segundos.`);
						break;
				}

				data_conn.close();
			});	
		});
	}
}
