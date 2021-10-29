import breakpoints from '~/global/settings/breakpoints'

const urlFor = (source) => {
	const imageUrlBuilder = require('@sanity/image-url')

	const builder = imageUrlBuilder({
		projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
		dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET
	})

	return builder.image(source)
}

const generateSrcSet = ({ image, quality, sizes }) => {
	const images = []
	breakpoints.forEach((breakpoint) => {
		let srcset = ''
		if (sizes && sizes[breakpoint.name]) {
			for (let i = 1; i < 4; i++) {
				srcset += srcset !== '' ? `,\n` : ''

				let url = ''
				if (sizes[breakpoint.name].width && sizes[breakpoint.name].height) {
					url = urlFor(image)
						.width(sizes[breakpoint.name].width)
						.height(sizes[breakpoint.name].height)
						.quality(quality)
						.dpr(i)
						.auto('format')
						.url()
				} else if (sizes[breakpoint.name].width) {
					url = urlFor(image).width(sizes[breakpoint.name].width).quality(quality).dpr(i).auto('format').url()
				} else if (sizes[breakpoint.name].height) {
					url = urlFor(image)
						.height(sizes[breakpoint.name].height)
						.quality(quality)
						.dpr(i)
						.auto('format')
						.url()
				} else {
					url = urlFor(image).quality(quality).dpr(i).auto('format').url()
				}
				srcset += `${url} ${i}x`
			}
			images.push({ path: srcset, width: sizes[breakpoint.name].width, height: sizes[breakpoint.name].height })
		}
	})
	return images
}

const getFallbackURL = ({ image, size, quality = 80 }) => {
	const url = urlFor(image).quality(quality).auto('format').width(size.width)

	if (size.height) {
		return url.height(size.height).url()
	}
	return url.url()
}

const getId = ({ image }) => {
	return image.asset._id
}

export default { generateSrcSet, getFallbackURL, getId }
