const localizedString = (name = 'localizedString', args) => `
	"${name}": coalesce(localizedString.${args.language}, localizedString.${args.defaultLanguage}, "Missing translation")
`
export default localizedString
