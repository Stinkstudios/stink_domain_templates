import React from 'react'

import { useDocumentOperation } from '@sanity/react-hooks'
import TrashIcon from 'part:@sanity/base/trash-icon'

import productionClient from '../helpers/productionClient'
import { getProductionPublishedState } from '../helpers'

const initalLabel = 'Loading...'

export function CustomDeleteAction({ id, type }) {
	const { del } = useDocumentOperation(id, type)
	const [isPublished, setIsPublished] = React.useState(null)
	const [defaultLabel, setDefaultLabel] = React.useState(initalLabel)
	const [showConfirm, setShowConfirm] = React.useState(false)
	const [label, setLabel] = React.useState(defaultLabel)

	React.useEffect(() => {
		getProductionPublishedState(id, type).then(state => setIsPublished(state))
	}, [])

	React.useEffect(() => {
		if (defaultLabel === initalLabel && isPublished !== null) {
			setDefaultLabel(isPublished ? `Delete on production` : `Delete`)
		}
	}, [isPublished])

	React.useEffect(() => {
		if (label === initalLabel) {
			setLabel(defaultLabel)
		}
	}, [defaultLabel])

	return {
		label,
		icon: TrashIcon,
		disabled: isPublished === null,
		onHandle: () => {
			setShowConfirm(true)
		},
		dialog: showConfirm && {
			type: 'confirm',
			message: `Are you sure you would like to delete this document${isPublished ? ' on production' : ''}?`,
			onConfirm: () => {
				if (isPublished) {
					productionClient
						.delete(id)
						.then(() => {
							setIsPublished(false)
							setLabel('Successfully deleted this document on production')
							setTimeout(() => {
								setLabel(defaultLabel)
							}, 2000)
						})
						.catch(() => {
							setLabel('Failed to delete this document on production')
							setTimeout(() => {
								setLabel(defaultLabel)
							}, 2000)
						})
				} else {
					del.execute()
				}
				setShowConfirm(false)
			},
			onCancel: () => setShowConfirm(false)
		}
	}
}
