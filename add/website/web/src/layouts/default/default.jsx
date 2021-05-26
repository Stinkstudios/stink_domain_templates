import WebGL from '~/webgl'

import { useRef } from 'react'
import Footer from '~/components/footer'
import Header from '~/components/header'

import CSS from './default.module.sass'

const Default = ({ children, data, i18n }) => {
	const $element = useRef()

	return (
		<div className={`${CSS['l-default']}`} ref={$element}>
			<Header i18n={i18n} data={data} />
            <WebGL />

			{children}
			<Footer i18n={i18n} data={data} />
		</div>
	)
}

export default Default
