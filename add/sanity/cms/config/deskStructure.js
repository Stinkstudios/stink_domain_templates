import S from '@sanity/desk-tool/structure-builder'

import { VscGear } from 'react-icons/vsc'
import { RiPagesLine } from 'react-icons/ri'
import { FaSuitcase } from 'react-icons/fa'
		
		const generateDoc = ({type, title, icon, id}) => {
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
		
		const generateDocumentsList = ({title, type, icon=RiPagesLine}) => {
			return S.listItem()
				.title(title)
				.icon(RiPagesLine)
				.child(S.documentList().filter(`_type == '${type}'`).title(title))
		}
		
		export default () =>
			S.list()
				.title('Boilerplate desk')
				.items([
					generateDoc({type:'singletonSiteConfiguration', title:'Site Configuration', icon:VscGear}),
					generateDoc({type:'copyDeck', title:'Site Copy', icon:FaSuitcase}),
					S.divider(),
					generateDocumentsList({title:'Pages', type:'page', icon:RiPagesLine}),
				])
		 