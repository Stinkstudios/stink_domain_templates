import 'normalize.css'
import 'focus-visible'

import '~/global/styles/base.sass'
import '~/global/styles/variables.sass'

/** 3RD PARTY */
import React, { useEffect }  from 'react'
import DefaultApp from 'next/app'

/** COMPONENTS */
import Analytics from '~/helpers/singletons/analytics'

/** LAYOUTS */
import * as layouts from '~/layouts'
import {handleBrowserScope} from '~/helpers'
handleBrowserScope()

const App = ({ Component, pageProps, data, router, query }) => {
	const Layout = layouts[Component.layout] ? layouts[Component.layout] : layouts.default
	
	useEffect(() => {
		Analytics.init()
		Analytics.track({action: 'page_view', params: {url:window.location.href}})
	})

	useEffect(() => {
		const handleRouteChange = (url) => {
			Analytics.track({action: 'page_view', params: {url:window.location.href}})
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

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

App.getInitialProps = async (appContext) => {
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
