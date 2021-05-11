const localizedString = (args) => `
	"localizedString": coalesce(localizedString.${args.language}, localizedString.${args.defaultLanguage}, "Missing translation")
`
export default localizedString
