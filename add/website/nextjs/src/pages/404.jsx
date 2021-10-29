import CSS from './home/home.module.scss'

const _404 = () => {
	return <div className={`${CSS['p-home']}`}>404</div>
}

_404.displayName = '404'

_404.layout = 'default'

export default _404
