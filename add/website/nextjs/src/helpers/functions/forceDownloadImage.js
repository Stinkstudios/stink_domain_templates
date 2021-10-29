import Bowser from 'bowser'
import { getImageFromSrc } from '~/helpers'
import mobile from 'is-mobile'

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
	const byteCharacters = atob(b64Data.split(',')[1])
	const byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize)

		const byteNumbers = new Array(slice.length)
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)
		byteArrays.push(byteArray)
	}

	const blob = new Blob(byteArrays, { type: contentType })
	return blob
}

const srcToB64 = async (url, dimensions, imgType = 'image/png', quality = 1.0) => {
	const image = await getImageFromSrc(url)
	const canvas = document.createElement('canvas')
	canvas.setAttribute('height', dimensions.height)
	canvas.setAttribute('width', dimensions.width)
	const ctx = canvas.getContext('2d')
	ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height)
	return imgType === 'image/jpeg' ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL()
}

export default async function (fileURL, fileName, dimensions, fileType, quality) {
	const browser = Bowser.getParser(window.navigator.userAgent)
	const _browser = browser.getBrowserName()
	const isMobile = mobile({ tablet: true })
	const isIE = _browser === 'Internet Explorer' || _browser === 'Microsoft Edge'
	// console.log(isMobile, isIE, fileURL)
	if (isMobile || isIE) return window.open(fileURL)

	const b64 = await srcToB64(fileURL, dimensions, fileType, quality)
	const a = document.createElement('a')
	a.style.display = 'none'
	document.body.appendChild(a)
	const blob = b64toBlob(b64, 'image/jpeg')
	const blobUrl = URL.createObjectURL(blob)
	a.href = blobUrl
	a.setAttribute('download', fileName)
	a.click()
	window.URL.revokeObjectURL(a.href)
	document.body.removeChild(a)
}
