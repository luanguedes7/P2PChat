export default class FileStream {
	//Inicializa a stream de bytes do arquivo
	constructor(selected_file, buffer_size) {		
		this.file = selected_file;
		this.stream = this.file.stream();	
		this.reader = this.stream.getReader();
		this.buffer = null;
		this.buffer_size = 0;
		this.isClosed = false;
		this.isEOF = false;
	}
	
	//Tenta ler 1024 bytes e retorna quantos bytes foram lidos
	async readChunck() {
		let counter = 0;

		if (this.isClosed) {
			console.log(`[ERROR] Leitor está fechado`);
			return 0;
		}

		if (this.isEOF) {
			console.log("[ERROR] Todos os bytes foram lidos");
			return -1;
		}

		while (!this.isEOF) {
			try {
				const {value, done} = await this.reader.read();
							
				if (done) {
					this.isEOF = true;
					break;
				}
				
				this.buffer = value;
				counter = this.buffer.length;
			} catch(error) {
				console.log(`[INFO] ${error}`);
				break;
			}
		}

		return counter;
	}
	
	//Retorna um Int8Array com os dados lidos
	getBufferedData() {
		return this.buffer;
	}

	//Fecha a readable stream
	async close() {
		await this.reader.cancel()
			.catch((err) => {console.log(`[ERROR] ${err}`)})
			.then(() => {console.log('[INFO] Leitor de arquivo fechado')});

		this.isClosed = true;
	}	
}
