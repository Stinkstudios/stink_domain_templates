/* eslint-disable max-lines */
import { Children, useRef, forwardRef, useEffect, isValidElement, cloneElement } from 'react'
import { interpret } from 'xstate'
import { gsap } from 'gsap'
import { v4 as uuidv4 } from 'uuid'
import useDeepCompareEffect from 'use-deep-compare-effect'

import breakpoints from '~/global/settings/breakpoints'

import processSizes from './helpers/Image.processSizes'
import getPictureElement from './helpers/Image.getPictureElement'
import getFallbackURL from './helpers/Image.getFallbackURL'
import getId from './helpers/Image.getId'

import { machine } from './Image.machine'

import CSS from './Image.module.scss'

const DEFAULT_QUALITY = 75

const DEFAULT_SIZES = {}

for (const breakpoint of breakpoints) {
	DEFAULT_SIZES[breakpoint.name] = { width: breakpoint.width }
}

const Image = (
	{
		className,
		elementClassName = '',
		image,
		sizes = {},
		aspectRatio = undefined,
		alt = '',
		style = {},
		quality = DEFAULT_QUALITY,
		lazy = true,
		loadingColor,
		provider = null,
		children,
		onLoaded = null
	},
	$element
) => {
	const Sources = null

	const id = useRef(null)

	if ($element === null) {
		$element = useRef()
	}

	const $picture = useRef(null)
	const $loader = useRef()

	const mergedSizes = Object.assign(Object.assign({}, DEFAULT_SIZES), sizes)

	let computedAspectRatio = {}

	if (typeof aspectRatio === 'undefined') {
		for (const [breakpoint, value] of Object.entries(mergedSizes)) {
			if (value.width && value.height) {
				computedAspectRatio[breakpoint] = value.width / value.height
			}
		}
		if (Object.keys(computedAspectRatio).length === 0) {
			computedAspectRatio = null
		}
	} else {
		computedAspectRatio = aspectRatio
	}

	let computedLoadingColor = loadingColor

	if (loadingColor) {
		computedLoadingColor = loadingColor
	} else {
		if (image?.asset?.metadata?.palette?.dominant?.background) {
			computedLoadingColor = image.asset.metadata.palette.dominant.background
		} else {
			computedLoadingColor = '#fff'
		}
	}

	sizes = typeof aspectRatio !== 'undefined' ? processSizes(mergedSizes, aspectRatio) : mergedSizes
	const fallbackURL = getFallbackURL({ image, size: sizes.desktop, quality, provider })

	let Loader

	if (children && Children.only(children) && isValidElement(Children.toArray(children)[0])) {
		Loader = cloneElement(Children.toArray(children)[0], {
			className: `${CSS.img} ${CSS.isLoader}`,
			image: image,
			ref: $loader
		})
	}

	const hidePlaceholder = () => {
		if (Loader) {
			return $loader.current.hide()
		} else {
			return new Promise((resolve) => {
				window.requestIdleCallback(() => {
					const tl = gsap.timeline({ onComplete: () => resolve() })
					tl.to(
						$loader.current,
						{
							opacity: 0,
							duration: 0.3,
							ease: 'none'
						},
						0
					)
				})
			})
		}
	}

	const clearLoader = () => {
		if (Loader) {
			return $loader.current.clear()
		} else {
			gsap.set($loader.current, {
				clearProps: 'opacity'
			})
		}
	}

	useDeepCompareEffect(() => {
		if (lazy && id.current !== getId({ image, provider })) {
			id.current = getId({ image, provider })
			if ($picture.current !== null) {
				$picture.current.remove()
				$picture.current = null
				clearLoader()
			}
			const service = interpret(
				machine.withConfig({
					services: {
						animationIn: hidePlaceholder
					}
				})
			).onTransition((state) => {
				if (state.value === 'loading') {
					const $image = document.createElement('img')
					$image.className = CSS.img + ' ' + elementClassName
					$image.setAttribute('width', sizes.desktop.width)
					$image.setAttribute('height', ratioedHeight.current)

					$picture.current = getPictureElement({ image, quality, sizes, provider })
					$picture.current.appendChild($image)
					$image.setAttribute('src', fallbackURL)
					$image.setAttribute('alt', alt)

					const onLoadCallback = () => {
						$element.current.insertBefore($picture.current, $loader.current.element || $loader.current)
						service.send('LOADED')
						if (onLoaded) {
							onLoaded()
						}
					}

					$image
						.decode()
						.then(onLoadCallback)
						// eslint-disable-next-line no-console
						.catch((error) => console.warn(error))
				}
			})

			let unsubscribe = () => {}
			// eslint-disable-next-line no-inner-declarations
			async function initObserver() {
				const id = uuidv4()
				$element.current.setAttribute('id', id)
				const Observer = (await import('./helpers/Image.intersectionObserverSingleton')).default
				unsubscribe = Observer.subscribe($element.current, () => {
					service.send('LOAD')
				})
			}
			initObserver()

			service.start()

			return () => {
				unsubscribe()
				service.stop()
			}
		}
	}, [image, aspectRatio])

	const ratioedHeight = useRef(
		typeof sizes.desktop.height !== 'undefined' ? sizes.desktop.height : (sizes.desktop.width * 3) / 4
	)

	useEffect(() => {
		if (lazy && $picture.current !== null && $element.current.querySelector('picture') === null) {
			$element.current.insertBefore($picture.current, $loader.current.element || $loader.current)
		}
	})

	return (
		<div className={`${className} ${CSS.image}`} ref={$element} style={style}>
			{typeof aspectRatio === 'object' ? (
				Object.entries(aspectRatio).map(([breakpoint, value]) => (
					<div
						className={`${CSS.img} ${CSS.isPlaceholder} ${elementClassName} ${CSS[breakpoint]}`}
						style={{ paddingTop: (1 / value) * 100 + '%' }}
						key={breakpoint}
					/>
				))
			) : (
				<div
					className={`${CSS.img} ${CSS.isPlaceholder} ${elementClassName} ${CSS.singleAspectRatio}`}
					style={{ paddingTop: (1 / aspectRatio) * 100 + '%' }}
				/>
			)}
			{lazy ? (
				<>
					{Loader || (
						<div
							ref={$loader}
							className={`${CSS.img} ${CSS.isLoader}`}
							style={{ backgroundColor: computedLoadingColor }}
						/>
					)}
				</>
			) : (
				<picture>
					{Sources !== null && <Sources />}
					<img
						src={fallbackURL}
						alt={alt}
						className={`${CSS.img} ${CSS.isFallback} ${elementClassName}`}
						width={sizes.desktop.width}
						height={ratioedHeight.current}
					/>
				</picture>
			)}
		</div>
	)
}

export default forwardRef(Image)
