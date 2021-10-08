import getImageFromSrc from './getImageFromSrc'
const srcToB64 = async (url, dimensions, imgType = 'image/png', quality = 1.0) => {
	const image = await getImageFromSrc(url)
	const canvas = document.createElement('canvas')
	canvas.setAttribute('height', dimensions.height)
	canvas.setAttribute('width', dimensions.width)
	const ctx = canvas.getContext('2d')
	ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height)
	return imgType === 'image/jpeg' ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL()
}

export default srcToB64
