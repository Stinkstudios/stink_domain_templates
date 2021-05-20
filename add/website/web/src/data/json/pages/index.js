const pages = {
	about: require('./about'),
	home: require('./home')
}

const Pages = (args) => pages[args.name](args)

module.exports = Pages
