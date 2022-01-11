import { useRef } from 'react'
import { Transition, Footer, Header } from '~/components'
import CSS from './Default.module.scss'

const Default = ({ children, data, i18n }) => {
	const $element = useRef()

	return (
		<div className={`${CSS.default}`} ref={$element}>
			<Header i18n={i18n} data={data} />
			<main id="main" role="main">
				<Transition>{children}</Transition>
			</main>
			<Footer i18n={i18n} data={data} />
		</div>
	)
}

export default Default
