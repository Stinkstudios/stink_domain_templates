import breakpoints from '~/global/settings/breakpoints'

const generateSrcSet = ({ image, sizes }) => {
	const images = []
	breakpoints.forEach((breakpoint) => {
		let srcset = ''
		if (sizes && sizes[breakpoint.name]) {
			for (let i = 1; i < 4; i++) {
				srcset += srcset !== '' ? `,\n` : ''

				let url = ''
				if (sizes[breakpoint.name].width && sizes[breakpoint.name].height) {
					url = `https://picsum.photos/id/${image.index}/${sizes[breakpoint.name].width * i}/${
						sizes[breakpoint.name].height * i
					}`
				}
				srcset += `${url} ${i}x`
			}
			images.push({ path: srcset, width: sizes[breakpoint.name].width, height: sizes[breakpoint.name].height })
		}
	})
	return images
}

const getFallbackURL = ({ image, size }) => {
	return `https://picsum.photos/id/${image.index}/${size.width}/${size.height}`
}

const getId = ({ image, size }) => {
	return `${image.index}-${size.width}-${size.height}`
}

export default { generateSrcSet, getFallbackURL, getId }
