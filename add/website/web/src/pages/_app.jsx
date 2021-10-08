import 'normalize.css'
import 'focus-visible'

import '~/global/styles/base.sass'
import '~/global/styles/variables.sass'

/** 3RD PARTY */
import React, { useEffect, useLayoutEffect } from 'react'
import DefaultApp from 'next/app'

/** HELPERS */
import Analytics from '~/helpers/singletons/analytics'
import Perf from '~/helpers/singletons/performance'
import useFoucFix from '~/helpers/useFouc'

/** LAYOUTS */
import * as layouts from '~/layouts'

const getInitialProps = async (appContext) => {
	const DataInterface = require('~/data')
	const pageProps = await DefaultApp.getInitialProps(appContext)
	const data = await DataInterface.fetch({ type: 'config' })
	data.i18n = await DataInterface.fetch({ type: 'siteCopy' })
	return {
		...pageProps,
		data,
		query: appContext.router.query
	}
}

const App = ({ Component, pageProps, data, router, query }) => {
	useFoucFix()
	const Layout = layouts[Component.layout] ? layouts[Component.layout] : layouts.default

	useLayoutEffect(() => {
		Perf.getGPU()
		Perf.getCPU()
		Perf.getInfo()
	})

	useEffect(() => {
		Analytics.init()
		Analytics.track({ action: 'page_view', params: { url: window.location.href } })

		// NOTE: when pressing the back button do not restore old scroll position
		router.beforePopState((state) => {
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual'
			}
			return true
		})
	})

	useEffect(() => {
		const handleRouteChange = (url) => {
			Analytics.track({ action: 'page_view', params: { url: window.location.href } })
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

App.getInitialProps = getInitialProps
export default App
