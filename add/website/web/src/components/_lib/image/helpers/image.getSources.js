import breakpoints from '~/global/settings/breakpoints'

import getProvider from './providers/Image.providers'
import generateSrcSet from './Image.generateSrcSet'

const defaultGetSources = ({ srcsets = null }) => {
	if (srcsets !== null && srcsets.length > 0) {
		return (
			<>
				{breakpoints.map(
					(breakpoint, i) =>
						srcsets[i] && (
							<source
								media={i < srcsets.length - 1 ? `(max-width: ${breakpoint.width}px)` : ''}
								key={breakpoint.name}
								srcSet={srcsets[i].path}
							/>
						)
				)}
			</>
		)
	}
	return null
}

const getSources = (options) => {
	const provider = getProvider(options.provider)
	let sources
	if (provider.getSources) {
		sources = provider.getSources({ ...options, srcsets: generateSrcSet(options) })
	} else {
		sources = defaultGetSources({ ...options, srcsets: generateSrcSet(options) })
	}
	return sources
}

export default getSources
