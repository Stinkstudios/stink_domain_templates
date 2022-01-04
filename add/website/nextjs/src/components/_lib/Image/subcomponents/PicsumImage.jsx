import BaseImage from './BaseImage'
import { breakpoints } from 'local-config'
import { forwardRef, useRef } from 'react'

const PicsumImage = (props, ref) => {
	validate(props)
	const _props = Object.assign({}, props)
	const index = useRef(Math.round(Math.random() * 1000))
	_props.srcset = generateSrcSet({
		sizes: props.sizes,
		index: index.current,
		height: props.height,
		width: props.width
	})
	_props.src = getURL({ height: props.height, width: props.width, index })
	return <BaseImage {..._props} ref={ref} />
}

const validate = props => {
	if (!props.width || !props.height) {
		// eslint-disable-next-line no-console
		console.error("the image component requires the props 'height' and 'width' be passed in")
		return false
	}
}

const generateSrcSet = ({ sizes, index, height, width }) => {
	let srcset = ''
	breakpoints.forEach(breakpoint => {
		let url = ''
		srcset += srcset !== '' ? `,\n` : ''
		if (sizes && sizes[breakpoint.name]) {
			const sbn = sizes[breakpoint.name]
			if (sbn.width && sbn.height) {
				url = `https://picsum.photos/id/${index}/${sbn.width}/${sbn.height}`
			} else {
				url = `https://picsum.photos/id/${index}/${sbn.width}/${sbn.width * (height / width)}`
			}
			srcset += `${url} ${sbn.width}w`
		} else {
			url = `https://picsum.photos/id/${index}/${breakpoint.width}/${Math.round(
				breakpoint.width * (height / width)
			)}`
			srcset += `${url} ${breakpoint.width}w`
		}
	})
	return srcset
}

const getURL = ({ height, width, index }) => {
	return `https://picsum.photos/id/${index}/${width}/${height}`
}

export default forwardRef(PicsumImage)
