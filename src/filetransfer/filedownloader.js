import FileSharerPrototype from "./sharerinterface.js";
import FileBuilder from "./filebuilder.js";

export default class FileDownloader extends FileSharerPrototype {
	constructor() {
		super();
		this.file_builder = null;
		this.data_conn = null;
		this.file_name = null;
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
		});	
	}

	setDownloadConn() {
		this.peer.on("connection", (data_conn) => {
			//Inicialização da conexão
			this.data_conn = data_conn;
			console.log("[INFO] Conexão com peer para download iniciada.");
			
			//Processamento dos dados recebidos na conexão para download
			this.data_conn.on("data", (data) => {
				let chunck_size = 0;
				let chunck_data = null;
				let chunck_order = 0;				

				switch (data[0]) {
					case 1:
						chunck_size = data[1];
						chunck_order = data[2];
						chunck_data = data[3];					
						this.file_builder.pushData(chunck_data, chunck_order);						

						console.log(`[INFO] Chunck de ${chunck_size} bytes recebido.`);
						break;
					case 2:
						this.file_builder.buildFile();
						this.file_builder.downloadFile(this.file_name);												
						this.file_builder.close();
						this.file_builder = null;				

						console.log("[INFO] Download concluído com sucesso!");
						break;
				}

				this.data_conn.close();
			});	
		});
	}
}
