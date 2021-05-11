const getSources = () => {
	return null
}

const getFallbackURL = ({ image }) => {
	return `https://picsum.photos/${image.width}/${image.height}?random=${image.index}`
}

export default { getSources, getFallbackURL }
