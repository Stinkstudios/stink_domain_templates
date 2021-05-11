export default function importAll(requireFunction) {
	return (ctx => {
		const keys = ctx.keys()
		const values = keys.map(ctx)
		return values.map(value => {
			return value.default
		})
	})(requireFunction)
}
