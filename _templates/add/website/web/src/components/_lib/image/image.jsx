import { useRef, forwardRef, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { gsap } from 'gsap'
import { v4 as uuidv4 } from 'uuid'

import breakpoints from '~/global/settings/breakpoints'

import processSizes from './helpers/image.processSizes'
import getSources from './helpers/image.getSources'
import getFallbackURL from './helpers/image.getFallbackURL'

import { machine } from './image.machine'

import CSS from './image.module.sass'

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
		aspectRatio = null,
		alt,
		style = {},
		quality = DEFAULT_QUALITY,
		lazy = true,
		loadingColor = '#fff',
		provider = null
	},
	$element
) => {
	let Sources = null

	if ($element === null) {
		$element = useRef()
	}

	const $image = useRef()
	const $lqip = useRef()

	const mergedSizes = Object.assign(Object.assign({}, DEFAULT_SIZES), sizes)
	sizes = aspectRatio !== null ? processSizes(mergedSizes, aspectRatio) : mergedSizes
	const fallbackURL = getFallbackURL({ image, size: sizes.desktop, quality: 80, provider })

	useEffect(() => {
		let unsubscribe = () => {}
		async function initObserver() {
			const id = uuidv4()
			$element.current.setAttribute('id', id)
			const Observer = (await import('./helpers/image.intersectionObserverSingleton')).default
			unsubscribe = Observer.subscribe($element.current, () => send('LOAD'))
		}
		initObserver()
		return unsubscribe
	}, [])

	const hidePlaceholder = () => {
		return new Promise(resolve => {
			window.requestIdleCallback(() => {
				const tl = gsap.timeline({ onComplete: () => resolve() })
				tl.to(
					$lqip.current,
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

	const [current, send] = useMachine(machine, {
		services: {
			animationIn: hidePlaceholder
		}
	})

	const imgProps = {}
	Sources = ({ load }) => getSources({ image, quality, sizes, provider, load })
	if (!current.matches('idle')) {
		imgProps.src = fallbackURL
	}

	const ratioedHeight = useRef(
		typeof sizes.desktop.height !== 'undefined' ? sizes.desktop.height : (sizes.desktop.width * 3) / 4
	)

	const onLoadCallback = () => send('LOADED')

	return (
		<div className={`${className} ${CSS['a-image']}`} ref={$element} style={style}>
			<div
				className={`${CSS['a-image__img']} ${CSS['-placeholder']} ${elementClassName} `}
				style={{ paddingTop: (1 / aspectRatio) * 100 + '%' }}
			/>
			{lazy ? (
				<>
					{
						<picture>
							<Sources load={!current.matches('idle')} />
							<img
								{...imgProps}
								onLoad={onLoadCallback}
								alt={alt}
								ref={$image}
								className={`${CSS['a-image__img']} ${elementClassName}`}
								width={sizes.desktop.width}
								height={ratioedHeight.current}
							/>
						</picture>
					}
					<div
						ref={$lqip}
						className={`${CSS['a-image__img']} ${CSS['-lqip']}`}
						style={{ backgroundColor: loadingColor }}
					/>
				</>
			) : (
				<picture>
					{Sources !== null && <Sources />}
					<img
						src={fallbackURL}
						alt={alt}
						className={`${CSS['a-image__img']} ${CSS['-fallback']} ${elementClassName}`}
						width={sizes.desktop.width}
						height={ratioedHeight.current}
					/>
				</picture>
			)}
		</div>
	)
}

export default forwardRef(Image)
