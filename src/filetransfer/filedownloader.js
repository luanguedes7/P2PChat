import FileSharerPrototype from "sharerinterface.js";
import FileBuilder from "filebuilder.js";

export default class FileDownloader extends FileSharerPrototype {
	constructor(file_name) {
		super();
		this.file_builder = new FileBuilder();
		this.data_conn = null;
		this.file_name = file_name;
	}

	getId() {
		return this.peer.id;
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
						this.downloadFile()												

						console.log("[INFO] Download concluído com sucesso!");
						break;
				}
			});

			this.data.on("close", () => {
				this.data_conn = null;				

				console.log("[INFO] Conexão de download finalizada.");
			});
		});
	}
}
