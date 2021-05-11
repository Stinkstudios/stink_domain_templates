import breakpoints from '~/global/settings/breakpoints'

const urlFor = (id, params = null) =>
	`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUDNAME}/image/upload/${params ? params + '/' : ''}${id}`

const generateSrcSet = ({ image, quality, sizes }) => {
	const images = []
	breakpoints.forEach(breakpoint => {
		let srcset = ''
		if (sizes && sizes[breakpoint.name]) {
			for (let i = 1; i < 4; i++) {
				srcset += srcset !== '' ? `,\n` : ''
				let url = ''
				if (sizes[breakpoint.name].width && sizes[breakpoint.name].height) {
					url = urlFor(
						image,
						`f_auto,w_${sizes[breakpoint.name].width},h_${
							sizes[breakpoint.name].height
						},q_${quality},dpr_${i}`
					)
				} else if (sizes[breakpoint.name].width) {
					url = urlFor(image, `f_auto,w_${sizes[breakpoint.name].width},q_${quality},dpr_${i}`)
				} else if (sizes[breakpoint.name].height) {
					url = urlFor(image, `f_auto,h_${sizes[breakpoint.name].height},q_${quality},dpr_${i}`)
				} else {
					url = urlFor(image, `f_auto,q_${quality},dpr_${i}`)
				}
				srcset += `${url} ${i}x`
			}
			images.push({ path: srcset, width: sizes[breakpoint.name].width, height: sizes[breakpoint.name].height })
		}
	})
	return images
}

const getFallbackURL = ({ image, size, quality = 80 }) => {
	return urlFor(image, `f_auto,w_${size.width}${size.height ? ',h_' + size.height : ''},q_${quality}`)
}

export default { generateSrcSet, getFallbackURL }
