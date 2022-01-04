import BaseImage from './BaseImage'
import { breakpoints } from 'local-config'
import { forwardRef } from 'react'

const CloudinaryImage = (props, ref) => {
	validate(props)
	const _props = Object.assign({}, props)
	_props.srcset = generateSrcSet({
		image: props.src,
		quality: props.quality,
		sizes: props.sizes,
		height: props.height,
		width: props.width
	})
	_props.placeholder = getFallbackURL({ image: props.src, quality: props.quality, size: props.size })
	return <BaseImage {..._props} ref={ref} />
}
const validate = props => {
	if (!process.env.CLOUDINARY_CLOUDNAME)
		// eslint-disable-next-line no-console
		console.error('CLOUDINARY_CLOUDNAME must be set as an environment variable')
}

const urlFor = (id, params = null) =>
	`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUDNAME}/image/upload/${params ? params + '/' : ''}${id}`

const generateSrcSet = ({ image, quality, sizes, height, width}) => {
	let srcset = ''
	breakpoints.forEach(breakpoint => {
		srcset += srcset !== '' ? `,\n` : ''
		let url = ''
		if (sizes && sizes[breakpoint.name]) {
			if (sizes[breakpoint.name].width && sizes[breakpoint.name].height) {
				url = urlFor(
					image,
					`f_auto,w_${sizes[breakpoint.name].width},h_${sizes[breakpoint.name].height},q_${quality},dpr_${i}`
				)
			} else if (sizes[breakpoint.name].width) {
				url = urlFor(image, `f_auto,w_${sizes[breakpoint.name].width},q_${quality}`)
			} else if (sizes[breakpoint.name].height) {
				url = urlFor(image, `f_auto,h_${sizes[breakpoint.name].height},q_${quality}`)
			} else {
				url = urlFor(image, `f_auto,q_${quality}`)
			}
			srcset += `${url} ${sizes[breakpoint.name].width}w`
		} else {
			url = urlFor(image, `f_auto,w_${breakpoint.width},q_${quality}`)
			srcset += `${url} ${breakpoint.width}w`
		}
	})
	return srcset
}

const getFallbackURL = ({ image, height, width, quality = 80 }) => {
	return urlFor(image, `f_auto,w_${width}${height ? ',h_' + height : ''},q_${quality}`)
}

export default forwardRef(CloudinaryImage)
