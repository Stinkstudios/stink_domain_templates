import React from 'react'

import client from 'part:@sanity/base/client'
import Spinner from 'part:@sanity/components/loading/spinner'

import productionClient from '../helpers/productionClient'
import { getProductionPublishedState } from '../helpers'

const InlineSpinner = () => <Spinner inline />
const Checkmark = () => '✓ '

const types = ['image', 'file']

// We traverse the object or array given as a parameter recursively to get the assets
// from preview, download them and upload them on the production dataset
const findAssetInVariable = async (variable) => {
	if (typeof variable === 'object' && !Array.isArray(variable)) {
		for (const prop in variable) {
			if (prop === '_type' && types.includes(variable[prop])) {
				const assetDocument = await client.fetch(`*[_id == "${variable.asset._ref}"][0]`)
				const buffer = await fetch(assetDocument.url).then((res) => {
					return res.arrayBuffer()
				})
				const newAssetDocument = await productionClient.assets.upload(assetDocument._id.split('-')[0], buffer, {
					filename: assetDocument.originalFilename
				})
				// We have to update the reference id as the asset on the production dataset has a different id
				variable.asset._ref = newAssetDocument._id
			} else {
				await findAssetInVariable(variable[prop])
			}
		}
	} else if (Array.isArray(variable)) {
		for (const item of variable) {
			await findAssetInVariable(item)
		}
	}
}

export function PublishOnProductionAction({ id, type }) {
	const [popoverMessage, setPopoverMessage] = React.useState(false)
	const [showConfirm, setShowConfirm] = React.useState(false)
	const [isPublishing, setIsPublishing] = React.useState(false) // Is the process of publishing ongoing
	const [isPublished, setIsPublished] = React.useState(null) // Is the document is published on the production dataset
	const prevIsPublished = React.useRef(isPublished)
	const [icon, setIcon] = React.useState(null)

	// We fetch the current published state on the production dataset
	React.useEffect(() => {
		getProductionPublishedState(id, type).then((state) => setIsPublished(state))
	}, [])

	React.useEffect(() => {
		if (isPublished && prevIsPublished.current !== null && !isPublishing) {
			setIcon('published')
			setTimeout(() => {
				setIcon(null)
			}, 2000)
		}
		prevIsPublished.current = isPublished
	}, [isPublished, isPublishing])

	return {
		label:
			icon === 'published'
				? 'Success'
				: isPublished
				? `Update on production`
				: isPublishing
				? 'Publishing...'
				: `Publish on production`,
		icon: isPublishing ? InlineSpinner : icon === 'published' ? Checkmark : null,
		disabled: isPublishing || isPublished === null,
		onHandle: () => {
			setShowConfirm(true)
		},
		dialog: showConfirm
			? {
					type: 'confirm',
					message: `Are you sure you would like to ${isPublished ? 'publish on' : 'update'} production?`,
					onConfirm: async () => {
						setShowConfirm(false)
						setIsPublishing(true)
						const previewDocument = await client.fetch(`*[_id == "${id}" && _type == "${type}"][0]`)
						await findAssetInVariable(previewDocument)
						await productionClient
							.createOrReplace(previewDocument)
							.then((res) => {
								setIsPublished(true)
							})
							.catch((err) => {
								setPopoverMessage({
									title: 'Fail',
									message: err.message.replace('The mutation(s) failed:', '')
								})
							})
						setIsPublishing(false)
					},
					onCancel: () => {
						setShowConfirm(false)
					}
			  }
			: popoverMessage && {
					type: 'popover',
					onClose: () => setPopoverMessage(false),
					content: (
						<div>
							<h3>{popoverMessage.title}</h3>
							<p>{popoverMessage.message}</p>
						</div>
					)
			  }
	}
}
