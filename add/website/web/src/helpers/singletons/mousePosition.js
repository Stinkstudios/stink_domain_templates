class MousePosition {
	constructor() {
		this.x = null
		this.y = null
		this.subscribers = []
		this.boundUpdateMousePosition = this.updateMousePosition.bind(this)
		if (typeof window !== 'undefined' && window.document && window.document.createElement) {
			this.addEventListeners()
		}
	}

	addEventListeners() {
		window.addEventListener('mousemove', this.boundUpdateMousePosition)
	}

	removeEventListeners() {
		window.removeEventListener('mousemove', this.boundUpdateMousePosition)
	}

	updateMousePosition(ev) {
		this.setPosition(ev.clientX, ev.clientY)
		requestAnimationFrame(() => {
			this.subscribers.forEach((fn) => {
				fn({ x: this.x, y: this.y })
			})
		})
	}

	subscribe(callback) {
		this.subscribers.push(callback)
		return () => {
			this.subscribers.filter((cb) => cb !== callback)
		}
	}

	getPosition() {
		return Object.assign(
			{},
			{
				x: this.x,
				y: this.y
			}
		)
	}

	setPosition(x, y) {
		this.x = x
		this.y = y
	}
}

module.exports = new MousePosition()
