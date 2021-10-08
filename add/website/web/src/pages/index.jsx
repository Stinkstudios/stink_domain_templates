import { useRef, forwardRef, useImperativeHandle } from 'react'
import CSS from './home.module.sass'
import { HTMLHead } from '~/components'

import { defaultPageTransition } from '~/helpers'
export { getStaticProps } from './home/home.gsp'

const Home = ({ data }, ref) => {
	const $element = useRef()
	useImperativeHandle(ref, defaultPageTransition({ $element }), [])
	return (
		<div ref={$element} className={`${CSS.home}`}>
			<HTMLHead />
			<div>Home</div>
		</div>
	)
}

Home.displayName = 'Home'
Home.layout = 'default'

export default forwardRef(Home)
