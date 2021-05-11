import CSS from './footer.module.sass'
// import useTranslation from 'next-translate/useTranslation'

const Footer = ({ data }) => {
	// const { t } = useTranslation('general')
	return <footer className={`${CSS['m-footer']}`}>{/* {t('FOOTER_DEFAULT')} */}</footer>
}

export default Footer
