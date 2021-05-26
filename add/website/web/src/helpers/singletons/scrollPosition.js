class ScrollPosition {
	constructor() {
		this.x = typeof window !== 'undefined' && window.document && window.document.createElement ? window.scrollX : 0
		this.y = typeof window !== 'undefined' && window.document && window.document.createElement ? window.scrollY : 0
		this.subscribers = []
		this.boundUpdateScrollPosition = this.updateScrollPosition.bind(this)
		this.isActive = false
		if (typeof window !== 'undefined' && window.document && window.document.createElement) {
			this.addEventListeners()
		}
	}

	addEventListeners() {
		this.isActive = true
		this.raf = requestAnimationFrame(this.boundUpdateScrollPosition)
	}

	removeEventListeners() {
		this.isActive = false
		cancelAnimationFrame(this.raf)
	}

	updateScrollPosition(ev) {
		if (this.isActive) {
			if (this.x !== window.scrollX || this.y !== window.scrollY) {
				this.setPosition(window.scrollX, window.scrollY)
				this.subscribers.forEach((fn) => {
					fn({ x: this.x, y: this.y, direction: this.direction })
				})
			}
			this.raf = requestAnimationFrame(this.boundUpdateScrollPosition)
		}
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
				y: this.y,
				direction: this.direction
			}
		)
	}

	setPosition(x, y) {
		this.direction = y > this.y
		this.x = x
		this.y = y
	}
}

module.exports = new ScrollPosition()
