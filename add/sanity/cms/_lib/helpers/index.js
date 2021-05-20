import productionClient from './productionClient'
import client from 'part:@sanity/base/client'

export async function getProductionPublishedState(id, type) {
	const productionDocument = await productionClient.fetch(`*[_id == "${id}" && _type == "${type}"][0]`)
	if (productionDocument !== null) {
		return true
	} else {
		return false
	}
}

export function localizeObject(origObj, regionRefType) {
	const locaObj = {
		name: `${origObj}__fields`,
		title: `Localized ${origObj.title}`,
		type: 'object',
		fields: [
			...origObj.fields,
			{
				name: 'regionalized_reference',
				title: 'Region',
				type: 'reference',
				to: [{ type: regionRefType }]
			}
		],
		preview: {
			select: {
				title: 'regionalized_reference.name'
			},
			prepare({ title }) {
				return { title: `${title}` }
			}
		}
	}

	origObj.fields = [
		...locaObj.fields.filter((f) => f.name !== 'regionalized_reference'),
		{
			name: 'regionalized',
			title: 'Regionalized Content',
			type: 'array',
			of: [locaObj]
		}
	]
	return origObj
}
