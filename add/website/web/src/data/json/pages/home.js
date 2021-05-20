const data = {
	en: {
		key: 'value',
		HOME: 'Home'
	},
	fr: {
		key: 'value',
		HOME: 'Domicile'
	}
}
const home = (args) => data[args.language] || data.en

module.exports = home
