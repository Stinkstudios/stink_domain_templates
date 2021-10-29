const fileType = require('file-type-es5')
const getFileType = ({ file, allowedMimeTypes }) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.addEventListener('load', function (loadEvent) {
			const buffer = loadEvent.target.result
			const uint8Array = new Uint8Array(buffer)
			if (!fileType(uint8Array)) return resolve(false)
			const allowed = allowedMimeTypes.indexOf(fileType(uint8Array).mime) > -1
			resolve(allowed)
		})
		reader.readAsArrayBuffer(file)
	})
}

export default getFileType
