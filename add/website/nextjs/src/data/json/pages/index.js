const pages = {
	home: require('./home'),
	notSupported: require('./notSupported')
}

const Pages = (args) => pages[args.name](args)

module.exports = Pages
