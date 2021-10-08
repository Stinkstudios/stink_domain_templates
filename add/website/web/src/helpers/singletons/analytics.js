class Analytics {
	get defaults() {
		return {
			GA_ID: 'G-XXXXXX'
		}
	}

	constructor(options) {
		Object.assign(this, options)
	}

	init() {
		window.dataLayer = window.dataLayer || []
		this.gtag('js', new Date())
		this.gtag('config', this.GA_ID)
	}

	track(event) {
		try {
			this.gtag('event', event.action, event.data)
		} catch (error) {
			setTimeout(this.track.bind(this), 300, event)
		}
	}

	trackClicks(options) {
		// Function to convert string arrays to uppercase
		const arrayToUppercase = (array) => {
			return array.map((tag) => {
				return tag.toUpperCase()
			})
		}
		const tracking = options?.tracking // Tracking tags and action defined by user
		let tagsAdded = [] // Array of tags to be tracked defined by user
		const mandatoryTags = ['a', 'button'] // Array of mandatory tags to be tracked
		const tagsToTrack = arrayToUppercase(mandatoryTags.slice()) // tagsToTrack: Array of mandatory tags plus tags defined by user

		if (typeof tracking === 'object') {
			// If tracking var is an object, add new tags to tagsToTrack array
			tagsAdded = arrayToUppercase(Object.keys(tracking))
			tagsAdded.forEach((tag) => {
				if (tagsToTrack.indexOf(tag) === -1) {
					tagsToTrack.push(tag)
				}
			})
		}

		// Get action, target (url) and label (inner text or alt text)
		const trackClick = (element) => {
			const { nodeName } = element
			let action
			let target
			const label = element.innerText || element.alt || 'No text'
			const customAction = tracking[nodeName.toLowerCase()]
			if (nodeName === 'A') {
				action = element.dataset['track-action'] || customAction || 'Link'
				target = element.href
			} else {
				action = element.dataset['track-action'] || customAction || 'Other interaction'
			}

			this.track({ action: 'click', params: { action, target, label } })
		}

		// Click event
		const handleClick = (e) => {
			if (!e?.target?.tagName) {
				return null
			}

			const { tagName } = e.target
			// Check if clicked element is in our "tagsToTrack" array
			if (tagsToTrack.indexOf(tagName) !== -1) {
				trackClick(e.target)
			} else {
				// Check if clicked element's parent are in our tagsToTrack array. If so, track click
				let trackedElement

				tagsToTrack.forEach((tag) => {
					const closest = e.target.closest(tag)
					if (closest) {
						trackedElement = closest
					}
				})

				if (trackedElement) {
					trackClick(trackedElement)
				}
			}
		}

		// Attach click event to document
		document.documentElement.addEventListener(
			'click',
			function clickListener(e) {
				handleClick(e)
			},
			true
		)
	}

	gtag() {
		window.dataLayer.push(arguments)
	}
}

export default new Analytics({ GA_ID: process.env.GA_ID })
