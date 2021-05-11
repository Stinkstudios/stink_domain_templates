import CSS from './home.module.sass'

const _404 = ({ data, i18n, query }) => {
	return <div className={`${CSS['p-home']}`}>404</div>
}

_404.displayName = '404'

_404.layout = 'default'

export default _404
