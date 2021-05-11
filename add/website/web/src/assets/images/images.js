
const images = {}

function importAll(requireFunction) {
	return (ctx => {
		return ctx.keys().map(key => {
			return { img: ctx(key), key }
		})
	})(requireFunction)
}

function getFilePath(path) {
	return path.split('/')[3].replace(/\.(jpe?g|jpg|png|webp)$/, '')
}



for (const image of importAll(require.context(`./?{format: "webp"}`, false, /^(?!\.\/).*\.(jpe?g|jpg|png|webp)$/))) {
	const noExtensionPath = getFilePath(image.key)
	if (typeof images[noExtensionPath] === 'undefined') {
		images[noExtensionPath] = {
			webp: image.img
		}
	} else {
		images[noExtensionPath].webp = image
	}
}

for (const image of importAll(require.context(`./`, false, /^(?!\.\/).*\.(jpe?g|jpg|png|webp)$/))) {
	const noExtensionPath = getFilePath(image.key)
	if (typeof images[noExtensionPath] === 'undefined') {
		images[noExtensionPath] = {
			original: image.img
		}
	} else {
		images[noExtensionPath].original = image.img
	}
}

export default images
