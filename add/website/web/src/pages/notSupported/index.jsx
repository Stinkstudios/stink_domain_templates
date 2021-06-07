import CSS from './notSupported.module.sass'

export const getStaticProps = async (props) => {
	const DataInterface = require('~/data')
	const data = await DataInterface.fetch({ type: 'page', args: { name: 'notSupported' }})
	return {
		props: {
			data
		}
	}
}

const NotSupported = () => {
	return (
		<div className={`${CSS['p-notSupported ']}`}>
			<div>notSupported </div>
		</div>
	)
}

NotSupported.displayName = 'NotSupported '
NotSupported.layout = 'NotSupported'

export default NotSupported
