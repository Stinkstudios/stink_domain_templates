const getStaticProps = async () => {
	const DataInterface = require('data-interface')
	const data = await DataInterface.fetch({ type: 'page', args: { name: 'home' } })

	return {
		props: {
			data: data
		},
		revalidate: process.env.DEPLOY_ENV !== 'production' ? 5 : false
	}
}

export { getStaticProps }
