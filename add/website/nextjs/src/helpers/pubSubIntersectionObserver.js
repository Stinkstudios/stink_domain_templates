class PubSubIntersectionObserver {
	get defaults() {
		return {
			rootMargin: '0px',
			threshold: 0,
			callOnce: true
		}
	}

	constructor(options) {
		Object.assign(this, Object.assign(this.defaults, options))
		this.intersectionObserver = new IntersectionObserver(this.callback.bind(this), options)
		this.subscribers = {}
	}

	callback(entries) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				this.subscribers[entry.target.id](entry)
				if (this.callOnce) this.unsubscribe(entry.target)
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

export default PubSubIntersectionObserver
