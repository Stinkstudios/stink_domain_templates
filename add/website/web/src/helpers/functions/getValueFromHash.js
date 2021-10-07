export default function(h, key) {
	const hash = h.substring(1)
	const hashes = hash.split('&')
	const hashObj = {}
	hashes.forEach(h => {
		const [key, val] = h.split('=')
		hashObj[key] = val
	})
	return hashObj[key]
}
