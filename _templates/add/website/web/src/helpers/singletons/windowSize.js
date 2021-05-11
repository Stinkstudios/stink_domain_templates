class WindowSize {
	constructor() {
		this.width =
			typeof window !== 'undefined' && window.document && window.document.createElement ? window.innerWidth : 0
		this.height =
			typeof window !== 'undefined' && window.document && window.document.createElement ? window.innerHeight : 0
		this.subscribers = []
		this.boundUpdateSize = this.updateSize.bind(this)
		this.isActive = false
		if (typeof window !== 'undefined' && window.document && window.document.createElement) {
			this.addEventListeners()
		}
	}

	addEventListeners() {
		this.isActive = true
		this.raf = requestAnimationFrame(this.boundUpdateSize)
	}

	removeEventListeners() {
		this.isActive = false
		cancelAnimationFrame(this.raf)
	}

	updateSize() {
		if (this.isActive) {
			if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
				this.setSize(window.innerWidth, window.innerHeight)
				for (const subscriber of this.subscribers) {
					subscriber({ width: this.width, height: this.height })
				}
			}
			this.raf = requestAnimationFrame(this.boundUpdateSize)
		}
	}

	subscribe(callback) {
		this.subscribers.push(callback)
		return () => {
			this.subscribers.filter(cb => cb !== callback)
		}
	}

	getSize() {
		return Object.assign(
			{},
			{
				width: this.width,
				height: this.height
			}
		)
	}

	setSize(width, height) {
		this.width = width
		this.height = height
	}
}

module.exports = new WindowSize()
