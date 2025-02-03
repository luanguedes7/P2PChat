export default class FileStream {
	//Inicializa a stream de bytes do arquivo
	constructor(selected_file) {		
		this.file = selected_file;
		this.stream = this.file.stream();	
		this.reader = this.stream.getReader();
		this.buffer = null;
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

		try {
			const {value, done} = await this.reader.read();
						
			if (done) {
				this.isEOF = true;
				return -1;
			}
			
			this.buffer = value;
			counter = this.buffer.length;
		} catch(error) {
			console.log(`[INFO] ${error}`);
			return -1;
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
