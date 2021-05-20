import CSS from './home.module.sass'

export const getStaticProps = async () => {
	const DataInterface = require('~/data')
	const data = await DataInterface.fetch({ type: 'page', args: { name: 'home' } })

	return {
		props: {
			data: data
		},
		revalidate: process.env.DEPLOY_ENV !== 'production' ? 5 : false
	}
}

const Home = () => {
	return <div className={`${CSS['p-home']}`}>Home</div>
}

Home.displayName = 'Home'
Home.layout = 'default'

export default Home
