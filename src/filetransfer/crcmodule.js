export default function GetCrcHash(binary_data) {
	const polynome = 0xEDB88320;
	let crc_hash = 0xFFFFFFFF;

	for (let i=0; i<binary_data.length; i++) {
		crc_hash ^= binary_data[i];

		for (let k=0; k<8; k++) {
			crc_hash = (crc_hash >>> 1) ^ (crc_hash & 1 ? polynome : 0);
		}

		return crc_hash ^ 0xFFFFFFFF;
	}	
}
