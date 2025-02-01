export default class FileBuilder {
	private chuncks_array;
	private blob;
	private isClosed;
	private hasBuild;
	
	//Inicializa o construtor de arquivo
	constructor() {
		this.chuncks_array = [];
		this.isClosed = false;
		this.hasBuild = false;
	}

	//Adiciona os dados na construção do blob
	public pushData(binary_data_chunck) {
		if (isClosed) {
			console.log('[ERROR] Construtor de arquivo está fechado');			
	
			return;
		}

		this.chuncks_array.push(binary_data_chunck);
	}

	//Cria um blob a partir dos dados providenciados
	public buildFile() {
		this.blob = new Blob(this.chuncks_array);
		this.hasBuild = true;	
	}

	//Faz o download do arquivo a partir do blob
	public downloadFile(file_name) {
		if (!this.hasBuild) {
			console.log('[ERRO] Não existe nenhuma build do arquivo');
			return;
		}

		const blobUrl = URL.createObjectURL(this.blob);
		const download_link = document.createElement("a");
		
		download_link.href = blobUrl;
		download_link.download = file_name;

		document.body.appendChild(download_link);

		link.dispatchEvent(
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			})
		);

		document.body.removeChild(download_link);
	}

	public close() {
		this.isClosed = true;
		this.chuncks_array = null;
	}	
}
