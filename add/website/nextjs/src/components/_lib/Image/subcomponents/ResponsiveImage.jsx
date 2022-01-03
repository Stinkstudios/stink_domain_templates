// dependencies: next.js responsive-loader
import BaseImage from './BaseImage'
import { forwardRef } from 'react'

const ResponsiveImage = (props, ref) => {
	if (!validate(props)) return <div> VALIDATION ERROR: PLEASE CHECK CONSOLE </div>
	const _props = Object.assign({}, props)
	_props.src = require(`~/assets/images/${props.src}`)
	// NOTE: the require string sizes array cannot be a variable i guess?
	_props.srcset = require(`~/assets/images/${props.src}?{sizes:[320,640,960,1280,1600,1920,2240,2560,2880,3200,3520,3840], format: "webp"}`)
	return <BaseImage {..._props} ref={ref} />
}

const validate = props => {
	if (props.src.indexOf('https:') > -1 || props.src.indexOf('http:') > -1) {
		// eslint-disable-next-line no-console
		console.error('Responsive-Loader only works with local image files')
		return false
	}
	// TODO: create validation for props.sizes

	return true
}

export default forwardRef(ResponsiveImage)
