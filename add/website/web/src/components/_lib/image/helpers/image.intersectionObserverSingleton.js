const options = {
	rootMargin: '0px',
	threshold: 0
}

class Observer {
	constructor() {
		this.intersectionObserver = new IntersectionObserver((entries) => this.callback(entries), options)
		this.subscribers = {}
	}

	callback(entries) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				this.subscribers[entry.target.id]()
				this.unsubscribe(entry.target)
			}
		}
	}

	subscribe(element, callback) {
		if (element !== null) {
			this.subscribers[element.id] = callback
			this.intersectionObserver.observe(element)
			return () => {
				this.unsubscribe(element)
			}
		}
		return () => {}
	}

	unsubscribe(element) {
		this.intersectionObserver.unobserve(element)
		delete this.subscribers[element.id]
	}
}

export default new Observer()
