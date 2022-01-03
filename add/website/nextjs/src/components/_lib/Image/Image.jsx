import { forwardRef } from 'react'
import * as ImageComponentTypes from './subcomponents'

const Image = (props, imageRef) => {
	const provider = props.provider || process.env.DEFAULT_IMAGE_PROVIDER || 'base'
	const ImageComponent = ImageComponentTypes[provider] ? ImageComponentTypes[provider] : ImageComponentTypes.default
	return <ImageComponent {...props} ref={imageRef} />
}

export default forwardRef(Image)
