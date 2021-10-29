import { useEffect, useRef, useState } from 'react'

import useUIStore from '~/helpers/stores/ui'

const Transition = function({ children, ...props }) {
	const [components, setComponents] = useState([children])
	const [lifecycle, setLifeCycle] = useState('transitioning')

	const scrollHeight = useRef()
	const $el = useRef()
	const currentRef = useRef()
	const nextRef = useRef()
	useEffect(() => {
		if (!children) return
		if (components[0].key === children.key) return
		setLifeCycle('transitioning') // is this a race condition?
		setComponents((cmpnts) => [cmpnts[0], children])
	}, [children])

	useEffect(() => {
		if (lifecycle === 'resting') return
		transitionStart()
	}, [components])

	const transitionStart = () => {
		if (!currentRef.current) return transitionEnd()
		scrollHeight.current = currentRef.current.getScrollHeight()
		if (components.length === 1) return currentRef.current.entryTransition({}).then(transitionEnd)
		const from = components[0]
		const to = components[1]
		Promise.all([
            currentRef.current.exitTransition({ to }), 
            nextRef.current.entryTransition({ from })
        ])
        .then(transitionEnd)
	}
	const transitionEnd = () => {
		window.scrollTo(0, 0)
		setLifeCycle('resting')
		currentRef.current = nextRef.current
		nextRef.current = null
		if (components.length > 1) setComponents((cmpnts) => [cmpnts[1]])
	}

	const getContainerStyle = () => {
		const height = lifecycle === 'transitioning' ? `${scrollHeight.current}px` : null
		return { height }
	}

	const getComponentStyle = (idx) => {
		if (lifecycle === 'transitioning') {
			return idx === 0
				? { position: 'absolute' } // absolute positioning maintains the window scroll value
				: { position: 'fixed' } // fixed positioning ignores the window scroll value
		} else {
			return { position: 'static' }
		}
	}

	return (
		<div style={getContainerStyle()} ref={$el}>
			{components.map((Component, idx) => {
				return (
					Component !== null && (
						<div style={getComponentStyle(idx)} key={`${Component.displayName}_${Component.key}`}>
							<Component.type
								{...Component.props}
								transition={{ lifecycle, scrollHeight: scrollHeight.current }}
								ref={(node) => (idx === 0 ? (currentRef.current = node) : (nextRef.current = node))}
							/>
						</div>
					)
				)
			})}
		</div>
	)
}

Transition.displayName = 'Transition'

export default Transition
