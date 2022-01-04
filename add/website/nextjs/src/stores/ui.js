import create from 'zustand'
import WindowSize from '~/helpers/singletons/windowSize'
import ScrollPosition from '~/helpers/singletons/scrollPosition'
import { breakpoints } from 'local-config'

const getBreakpoint = width => {
	if (width > 0) {
		for (const breakpoint of breakpoints) {
			if (width <= breakpoint.width) {
				return breakpoint
			}
		}
	}
	return breakpoints[breakpoints.length - 1]
}

const UIStore = create(set => ({
	windowHeight: WindowSize.getSize().height,
	windowWidth: WindowSize.getSize().width,
	breakpoint: getBreakpoint(WindowSize.getSize().width),
	scrollPositionX: ScrollPosition.getPosition().x,
	scrollPositionY: ScrollPosition.getPosition().y,
	isScrollLocked: false,
	updateIsScrollLocked: isScrollLocked => set({ isScrollLocked }),
	isAnimating: true,
	updateIsAnimating: isAnimating => set({ isAnimating })
}))

WindowSize.subscribe(size => {
	const patch = {}
	const currentState = UIStore.getState()
	if (size.height !== currentState.windowHeight) {
		patch.windowHeight = size.height
	}
	if (size.width !== currentState.windowWidth) {
		patch.windowWidth = size.width
		const breakpoint = getBreakpoint(size.width)
		if (breakpoint !== currentState.breakpoint) {
			patch.breakpoint = breakpoint
		}
	}

	UIStore.setState({ windowHeight: size.height, windowWidth: size.width })
})

ScrollPosition.subscribe(position => {
	UIStore.setState({ scrollPositionX: position.x, scrollPositionY: position.y })
})

export default UIStore
