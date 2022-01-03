import { useRef, forwardRef, useEffect } from 'react'
import PubSubIntersectionObserver from '~/helpers/pubSubIntersectionObserver'
import { v4 as uuidv4 } from 'uuid'

const LOADING_TYPES = {
	AUTO: 'auto',
	LAZY: 'lazy',
	EAGER: 'eager'
}

const BaseImage = (props, imageRef) => {
	if (!validate(props)) return <div> VALIDATION ERROR: PLEASE CHECK CONSOLE </div>
	const {
		src,
		srcset,
		loading = LOADING_TYPES.LAZY,
		placeholder, // only used if lazy loading
		className,
		height,
		width,
		onReady = () => {}, // loaded and intersected
		pubSubObserver, // if omitted, no lazy loading or onReady triggered
		a11y = {}, // contains alt text
		style
	} = props

	const load = () => {
		const $tmp = document.createElement('img')
		$tmp.setAttribute('width', width)
		$tmp.setAttribute('height', height)
		$tmp.setAttribute('src', src)
		$tmp.decode()
			.then(() => {
				imageRef.current.setAttribute('src', src)
				if (srcset) imageRef.current.setAttribute('srcset', srcset)
				onReady(imageRef)
			})
			// eslint-disable-next-line no-console
			.catch(error => console.warn(error))
	}

	const intersect = () => {
		if (needsJSLazyLoading()) {
			load()
		} else {
			onReady(imageRef)
		}
	}

	useEffect(() => {
		if (imageRef && !imageRef.current.getAttribute('id')) imageRef.current.setAttribute('id', uuidv4())
		if (!pubSubObserver) return
		const cleanUp = pubSubObserver.subscribe(imageRef.current, intersect)
		return () => cleanUp()
	})

	const needsJSLazyLoading = () => {
		// if we are lazy loading and the browser doesn't support native image lazy loading ...
		return (
			typeof window !== 'undefined' &&
			loading === LOADING_TYPES.LAZY &&
			!('loading' in HTMLImageElement.prototype) &&
			pubSubObserver
		)
	}

	return (
		// alt text is within a11y
		// eslint-disable-next-line jsx-a11y/alt-text
		<img
			ref={imageRef}
			src={needsJSLazyLoading() ? placeholder || null : src}
			srcSet={needsJSLazyLoading() ? null : srcset || null}
			decoding="async"
			loading={loading}
			className={className}
			width={width}
			height={height}
			style={style}
			{...a11y}
		/>
	)
}

const validate = props => {
	if (!props.width || !props.height) {
		// eslint-disable-next-line no-console
		console.error("the image component requires the props 'height' and 'width' be passed in")
		return false
	}
	if (props.pubSubObserver && !(props.pubSubObserver instanceof PubSubIntersectionObserver)) {
		// eslint-disable-next-line no-console
		console.error('If you are using an Intersection Observer, you must use the PubSubIntersectionObserver')
		return false
	}

	return true
}

export default forwardRef(BaseImage)
