const getImageFromSrc = (src, useCreds = false) => {
	return new Promise((resolve) => {
		const image = new Image()
		// NOTE: the below few lines are a hack to get the CORS policy of Google Storage buckets to work with it's own IAP
		image.crossOrigin = window.location.host.indexOf('localhost') < 0 && useCreds ? 'Use-Credentials' : 'Anonymous'
		image.onload = () => {
			resolve(image)
		}
		image.src = src
	})
}
export default getImageFromSrc
