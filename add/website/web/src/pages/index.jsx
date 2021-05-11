import { useTranslation } from 'react-i18next'
import { getResourceBundle, addResourceBundle } from 'i18next'

import CSS from './home.module.sass'

export const getStaticProps = async () => {
	const DataInterface = require('~/data')
	const data = await DataInterface.fetch({type: 'page'})

	return {
		props: {
			data: data
		},
		revalidate: (process.env.DEPLOY_ENV !== "production") ? 5 : false
	}
}

const Home = ({ data, images }) => {

	return (
		<div className={`${CSS['p-home']}`}>Home</div>
	)
}

Home.displayName = 'Home'
Home.layout = 'default'

export default Home
