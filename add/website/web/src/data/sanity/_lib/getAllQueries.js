const getAllQueries = (ctx) => {
	const keys = ctx.keys()
	const values = keys.map(ctx)
	const returnValue = {}
	let i = 0
	for (const key of keys) {
		const query = values[i]
		returnValue[key.match(/^(?:.*\/)?([^/]+?|)(?=(?:\.[^/.]*)?$)/)[1]] = query.default
		i++
	}
	return returnValue
}
export default getAllQueries
