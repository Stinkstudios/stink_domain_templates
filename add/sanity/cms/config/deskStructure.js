import S from '@sanity/desk-tool/structure-builder'

// import { VscListTree, VscGear } from 'react-icons/vsc'
import { VscGear } from 'react-icons/vsc'
// import { BsPeople, BsPeopleFill } from 'react-icons/bs'
// import { RiBuildingLine, RiPagesLine, RiHome4Line } from 'react-icons/ri'
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

// const generateDocList = (type, title, icon, filter, params, defaultOrdering) => {
// 	let list = S.documentList().schemaType(type).title(title).filter(filter)

// 	if (params) {
// 		list = list.params(params)
// 	}

// 	if (defaultOrdering) {
// 		list = list.defaultOrdering(defaultOrdering)
// 	}

// 	return S.listItem().title(title).icon(icon).schemaType(type).child(list)
// }

const generatePagesList = () => {
	return S.listItem()
		.title('Pages')
		.icon(RiPagesLine)
		.child(
			S.documentList()
				.filter(`_type == 'page'`)
				.title('Pages')
		)
}

export default () =>
	S.list()
		.title('Boilerplate desk')
		.items([
			generateDoc('singletonSiteConfiguration', 'Site Configuration', VscGear),
			S.divider(),
			generatePagesList()
			// generateInfo(),
		])
