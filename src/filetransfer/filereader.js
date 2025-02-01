export default class FileStream {
	//Inicializa a stream de bytes do arquivo
	constructor(selected_file, buffer_size) {		
		this.file = selected_file;
		this.stream = this.file.stream();	
		this.reader = this.getReader();
		this.buffer = new Uint8Array(buffer_size);
		this.buffer_size = buffer_size;
		this.isClosed = false;
		this.isEOF = false;
	}
	
	//Tenta ler 1024 bytes e retorna quantos bytes foram lidos
	async readChunck() {
		let counter = 0;
		
		this.buffer.fill(0, 0, this.buffer_size);

		if (isClosed) {
			console.log(`[ERROR] Leitor está fechado`);
			return 0;
		}

		if (isEOF) {
			console.lof(`[ERROR] Todos os bytes foram lidos`);
			return -1;
		}

		while (counter < buffer_size) {
			try {
				const {value, done} = await this.reader.read();
			} catch(error) {
				console.log(`[INFO] ${error}`);
				break;
			}			
			
			if (done) {
				this.isEOF = true;
				break;
			}
			
			this.buffer[counter] = value;
			counter += 1;
		}

		return counter;
	}
	
	//Retorna um Int8Array com os dados lidos
	getBufferedData() {
		return this.buffer;
	}

	//Fecha a readable stream
	async close() {
		await reader.cancel()
			.catch((err) => {console.log(`[ERROR] ${err}`)})
			.then(() => {console.log('[INFO] Leitor de arquivo fechado')});

		this.isClosed = true;
	}	
}
