const getLinkProps = ({ page, hash = null, url, type }) => {
	if (page) {
		switch (page._type) {
			case 'page':
				return { href: '/' + page.slug + (hash || '') }
			default:
				return { href: '/' + (hash || '') }
		}
	} else if (url) {
		return { href: url, target: '_blank', rel: 'noreferrer noopener' }
	}
	return {}
}
export default getLinkProps
