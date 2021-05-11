import 'normalize.css'
import 'focus-visible'
import '~/global/styles/fonts.sass'
import '~/global/styles/helpers.sass'
import '~/global/styles/global.sass'
import '~/helpers/gsapDirectionalPlugin'

import '~/helpers/wdyr'

/** 3RD PARTY */
import React, { useLayoutEffect } from 'react'
import DefaultApp from 'next/app'
import dynamic from 'next/dynamic'

/** COMPONENTS */

/** LAYOUTS */
import layout from '~/layouts/default'
const layouts = {
	default: layout
}

const App = ({ Component, pageProps, data, router, query }) => {
	const Layout = layouts[Component.layout] ? layouts[Component.layout] : layouts.default

	return (
		<>
			<div id="skip">
				<a href="#main">Skip to main content</a>
			</div>
			<Layout data={data} query={query}>
				<main id="main" role="main">
					<Component query={query} key={router.pathname} data={data} {...pageProps} />
				</main>
			</Layout>
		</>
	)
}

App.getInitialProps = async appContext => {
	const DataInterface = require('~/data')
	const pageProps = await DefaultApp.getInitialProps(appContext)
	const data = await DataInterface.fetch({ type: 'config' })
	return {
		...pageProps,
		data,
		query: appContext.router.query
	}
}

export default App
