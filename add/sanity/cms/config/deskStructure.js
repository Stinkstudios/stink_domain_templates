import S from '@sanity/desk-tool/structure-builder'

import { VscGear } from 'react-icons/vsc'
import { RiPagesLine } from 'react-icons/ri'

const generateDoc = (type, title, icon, id) => {
	const doc = S.listItem()
		.title(title)
		.child(
			S.document()
				.title(title)
				.schemaType(type)
				.documentId(id || type)
		)
	return icon ? doc.icon(icon) : icon === false ? doc.showIcon(false) : doc
}

const generatePagesList = () => {
	return S.listItem()
		.title('Pages')
		.icon(RiPagesLine)
		.child(S.documentList().filter(`_type == 'page'`).title('Pages'))
}

export default () =>
	S.list()
		.title('Boilerplate desk')
		.items([
			generateDoc('singletonSiteConfiguration', 'Site Configuration', VscGear),
			S.divider(),
			generatePagesList()
		])
