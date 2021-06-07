class Analytics {
    get defaults() {return {
        GA_ID: 'G-XXXXXX'
    }}
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
			this.gtag('event', event.action, event.data);
		} catch (error) {
			setTimeout(this.track.bind(this), 300, event)
		}
    }

    gtag() {
        window.dataLayer.push(arguments)
    }
}

export default new Analytics({GA_ID: process.env.GA_ID})
