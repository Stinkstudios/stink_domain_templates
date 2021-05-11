import images from '~/assets/images/images'

const getSources = ({ image }) => {
	return (
		<>
			<source srcSet={images[image].webp.srcset} type={'image/webp'} />
			<source srcSet={images[image].original.srcset} />
		</>
	)
}

const getFallbackURL = ({ image, size }) => {
	const rightSizeImage = images[image].original.images.find(img => img.width === size)
	return rightSizeImage ? rightSizeImage.path : images[image].original.src
}

export default { getSources, getFallbackURL }
