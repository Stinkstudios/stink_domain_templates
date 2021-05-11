import Head from 'next/head'

const HTMLHead = ({ i18n }) => (
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta
			key="robots"
			name="robots"
			content={process.env.NODE_ENV === 'production' ? 'index,follow' : 'noindex,nofollow'}
		/>
		<title>{i18n.META_TITLE}</title>
		<meta key="twitter:site" name="twitter:site" content={''} />
		<meta key="og:site_name" property="og:site_name" content={''} />
		<link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon"></link>
		<link key="apple-touch-icon-48x48" rel="apple-touch-icon" sizes="48x48" href="/favicon/icon-48x48.png" />
		<link key="apple-touch-icon-72x72" rel="apple-touch-icon" sizes="72x72" href="/favicon/icon-72x72.png" />
		<link key="apple-touch-icon-96x96" rel="apple-touch-icon" sizes="96x96" href="/favicon/icon-96x96.png" />
		<link key="apple-touch-icon-144x144" rel="apple-touch-icon" sizes="144x144" href="/favicon/icon-144x144.png" />
		<link key="icon-192x192" rel="icon" type="image/png" sizes="192x192" href="/favicon/icon-192x192.png" />
		<link key="icon-256x256" rel="icon" type="image/png" sizes="256x256" href="/favicon/icon-256x256.png" />
		<link key="icon-384x384" rel="icon" type="image/png" sizes="384x384" href="/favicon/icon-384x384.png" />
		<link key="icon-512x512" rel="icon" type="image/png" sizes="512x512" href="/favicon/icon-512x512.png" />
		<link key="manifest" rel="manifest" href="/favicon/manifest.json" />
		<meta name="msapplication-TileColor" content="#ffffff" />
		<meta name="msapplication-TileImage" content="/favicon/icon-144x144.png" />
		<meta name="theme-color" content="#ffffff" />
	</Head>
)

export default HTMLHead
