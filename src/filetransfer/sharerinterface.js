import { Peer } from "peerjs";

export default class FileSharerPrototype {
	//Construtor padrão
	constructor(buffer_size) {
		this.peer = new Peer();
		this.peer_conn = null;
	}

	getId() {
		return this.peer.id;
	}

	connectToPeer(partner_id) {
		this.peer_conn = this.peer.connect(partner_id);
	}
}
