import breakpoints from '~/global/settings/breakpoints'

import getProvider from './providers/Image.providers'
import generateSrcSet from './Image.generateSrcSet'

const defaultGetPictureElement = ({ srcsets = null }) => {
	if (srcsets !== null && srcsets.length > 0) {
		const $picture = document.createElement('picture')

		breakpoints.forEach((breakpoint, i) => {
			if (srcsets[i]) {
				const source = document.createElement('source')
				source.setAttribute('media', i < srcsets.length - 1 ? `(max-width: ${breakpoint.width}px)` : '')
				source.setAttribute('srcset', srcsets[i].path)
				$picture.appendChild(source)
			}
		})

		return $picture
	}
	return null
}

const getPictureElement = (options) => {
	const provider = getProvider(options.provider)
	let PictureElement
	if (provider.getPictureElement) {
		PictureElement = provider.getPictureElement({ ...options, srcsets: generateSrcSet(options) })
	} else {
		PictureElement = defaultGetPictureElement({ ...options, srcsets: generateSrcSet(options) })
	}
	return PictureElement
}

export default getPictureElement
