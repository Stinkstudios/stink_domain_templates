const pages = {
	home: require('./home')
}

const Pages = args => pages[args.name](args)

module.exports = Pages
