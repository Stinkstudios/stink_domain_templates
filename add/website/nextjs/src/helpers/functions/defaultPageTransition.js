import { gsap } from 'gsap'

const Transitions = (refs) => {
	return () => ({
		getScrollHeight: () => {
			return refs.$element.current.getBoundingClientRect().height
		},
		entryTransition: ({ from }) => {
			const tl = gsap.timeline()
			tl.set(refs.$element.current, {
				opacity: 0
			}).to(refs.$element.current, {
				opacity: 1,
				duration: 1
			})
			return tl
		},
		exitTransition: ({ to }) => {
			const tl = gsap.timeline()
			tl.to(refs.$element.current, {
				opacity: 0,
				duration: 1
			})
			return tl
		}
	})
}

export default Transitions
