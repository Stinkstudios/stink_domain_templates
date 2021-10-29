export default function dataURLtoFile(dataurl, filename = 'image.jpg', type = 'image/jpeg') {
	const mime = dataurl.split(';base64,')[0].split(':')[1]
	const bytes = atob(dataurl.split(';base64,')[1])
	const writer = new Uint8Array(new ArrayBuffer(bytes.length))

	for (let i = 0; i < bytes.length; i++) {
		writer[i] = bytes.charCodeAt(i)
	}

	return new File([writer.buffer], filename, { type: mime })
}
