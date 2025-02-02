import { Peer } from "peerjs";
import FileSharerPrototype from "sharerinterface.js";

export default class FileUploader extends FileSharerPrototype {
	constructor() {
		super();
		this.peers_list = null;
		this.downloader_id = null;
	}

	setList(list) {
		this.peers_list = list;
	}

	setDownloadRequestConn() {

	}

	sendData() {

	}
}
