export default class FileBuilder {
	//Inicializa o construtor de arquivo
	constructor() {
		this.chuncks_array = [];
		this.chuncks_map = new Map();
		this.isClosed = false;
		this.hasBuild = false;
		this.blob = null;
	}

	//Adiciona os dados na construção do blob
	pushData(binary_data_chunck, index) {
		if (this.isClosed) {
			console.log('[ERROR] Construtor de arquivo está fechado');			
	
			return;
		}

		this.chuncks_map.set(index, binary_data_chunck);
	}

	//Cria um blob a partir dos dados providenciados
	buildFile() {
		for (let i=0; i<this.chuncks_map.size; i++) {
			this.chuncks_array.push(this.chuncks_map.get(i));
		}

		this.blob = new Blob(this.chuncks_array);
		this.hasBuild = true;	
	}

	//Faz o download do arquivo a partir do blob
	downloadFile(file_name) {
		if (!this.hasBuild) {
			console.log('[ERRO] Não existe nenhuma build do arquivo');
			return;
		}

		const blobUrl = URL.createObjectURL(this.blob);
		const download_link = document.createElement("a");
		
		download_link.href = blobUrl;
		download_link.download = file_name;

		document.body.appendChild(download_link);

		download_link.dispatchEvent(
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			})
		);

		document.body.removeChild(download_link);
	}

	close() {
		this.isClosed = true;
		this.chuncks_array = null;
	}	
}
