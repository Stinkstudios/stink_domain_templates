import { forwardRef } from 'react'
import BaseImage from './BaseImage'
import { breakpoints } from 'local-config'
const SanityImage = (props, ref) => {
	validate(props)
	const _props = Object.assign({}, props)
	_props.srcset = generateSrcSet({
		image: props.image,
		quality: props.quality,
		sizes: props.sizes,
		width: props.width,
		height: props.height
	})
	_props.src = getURL({ image: props.image, quality: props.quality, width: props.width, height: props.height })
	return <BaseImage {..._props} ref={ref} />
}

const validate = props => {
	if (!props.image || !props.image.asset)
		// eslint-disable-next-line no-console
		console.error("A sanity.io image data object must be passed as the 'image' prop to use this component")
	if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET)
		// eslint-disable-next-line no-console
		console.error('Both the SANITY_PROJECT_ID and SANITY_DATASET must be set as an environment variable')
}

const urlFor = source => {
	const imageUrlBuilder = require('@sanity/image-url')
	if (!imageUrlBuilder) console.error('@sanity/image-url must be installed to use this component with sanity')
	const builder = imageUrlBuilder({
		projectId: process.env.SANITY_PROJECT_ID,
		dataset: process.env.SANITY_DATASET
	})

	return builder.image(source)
}

const generateSrcSet = ({ image, quality = 80, sizes, width, height }) => {
	let srcset = ''
	breakpoints.forEach(breakpoint => {
		srcset += srcset !== '' ? `,\n` : ''
		let url = ''
		let dimension = ''
		if (sizes && sizes[breakpoint.name]) {
			if (sizes[breakpoint.name].width && sizes[breakpoint.name].height) {
				url = urlFor(image)
					.width(sizes[breakpoint.name].width)
					.height(sizes[breakpoint.name].height)
					.quality(quality)
					// .dpr(i)
					.auto('format')
					.url()
			} else if (sizes[breakpoint.name].width) {
				dimension = sizes[breakpoint.name].width + 'w'
				url = urlFor(image)
					.width(sizes[breakpoint.name].width)
					.quality(quality)
					// .dpr(i)
					.auto('format')
					.url()
			} else if (sizes[breakpoint.name].height) {
				dimension = sizes[breakpoint.name].height + 'h'
				url = urlFor(image)
					.height(sizes[breakpoint.name].height)
					.quality(quality)
					// .dpr(i)
					.auto('format')
					.url()
			} else {
				url = urlFor(image)
					.quality(quality)
					// .dpr(i)
					.auto('format')
					.url()
			}
			srcset += `${url} ${dimension}`
		} else {
			dimension = breakpoint.width + 'w'
			url = urlFor(image)
				.width(breakpoint.width)
				.quality(quality)
				// .dpr(i)
				.auto('format')
				.url()
		}
	})
	return srcset
}

const getURL = ({ image, width, height, quality = 80 }) => {
	const url = urlFor(image)
		.quality(quality)
		.auto('format')
		.width(width)

	if (height) {
		return url.height(height).url()
	}
	return url.url()
}

export default forwardRef(SanityImage)
