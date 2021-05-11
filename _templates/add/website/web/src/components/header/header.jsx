import CSS from './header.module.sass'
import Link from 'next/link'
import { useRouter } from 'next/router'
import i18nConfig from '~/i18n/config'

const Header = ({ data }) => {
	const router = useRouter()
	const routePieces = router.asPath.split('/')
	if (i18nConfig.locales.includes(routePieces[1])) routePieces.splice(1, 1)
	const stripLangQuery = routePieces.join('/')
	return (
		<header className={`${CSS['m-header']}`}>
			header
			{/* {t('HEADER_DEFAULT')} */}
			<Link href={`/en${stripLangQuery}`}>
				<a href={`/en${stripLangQuery}`}>English</a>
			</Link>
			<Link href={`/fr${stripLangQuery}`}>
				<a href={`/fr${stripLangQuery}`}>Francais</a>
			</Link>
		</header>
	)
}

export default Header
