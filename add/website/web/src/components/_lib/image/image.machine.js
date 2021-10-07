import { createMachine } from 'xstate'

export const machine = createMachine({
	id: 'image',
	initial: 'idle',
	states: {
		idle: {
			on: { LOAD: 'loading' }
		},
		loading: {
			on: {
				LOADED: 'animatingIn',
				FAIL: 'failed'
			}
		},
		animatingIn: {
			invoke: {
				id: 'animationIn',
				src: 'animationIn',
				onDone: { target: 'displayed' },
				onError: { target: 'failed' }
			}
		},
		displayed: {
			type: 'final'
		},
		failed: {
			type: 'final'
		}
	}
})
