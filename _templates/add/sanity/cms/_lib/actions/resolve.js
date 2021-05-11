import defaultResolve, {
	PublishAction,
	DeleteAction,
	CreateAction,
	DuplicateAction
} from 'part:@sanity/base/document-actions'

import { PublishOnProductionAction } from './publishOnProduction'
import { UnpublishOnProductionAction } from './unpublishOnProduction'
import { CustomDeleteAction } from './customDelete'

export default function resolveDocumentActions(props) {
	if (process.env.SANITY_STUDIO_API_DATASET !== 'production') {
		const defaultActions = [
			...defaultResolve(props).filter(action => {
				if (props.type.includes('singleton')) {
					switch (action) {
						case DeleteAction:
							return false
						case CreateAction:
							return false
						case DuplicateAction:
							return false
						default:
							return true
					}
				}
				return true
			}),
			UnpublishOnProductionAction
		]

		if (props.published !== null && props.draft === null) {
			// We don't want to be able to publish on the production dataset if it hasn't been published on preview first
			// If there is no draft, it means that the document is published
			return [
				...defaultActions.map(Action => {
					let actionToReturn = Action
					switch (Action) {
						case PublishAction:
							actionToReturn = PublishOnProductionAction
							break
						case DeleteAction:
							actionToReturn = CustomDeleteAction
							break
					}
					return actionToReturn
				})
			]
		}
		return defaultActions
	}
	return defaultResolve(props)
}
