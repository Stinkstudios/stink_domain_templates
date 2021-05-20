import React from 'react'

import productionClient from '../helpers/productionClient'
import CloseIcon from 'part:@sanity/base/close-icon'

const defaultLabel = 'Unpublish on production'

export function UnpublishOnProductionAction({ id }) {
	const [showConfirm, setShowConfirm] = React.useState(false)
	const [label, setLabel] = React.useState(defaultLabel)
	return {
		label: label,
		icon: CloseIcon,
		onHandle: async () => {
			setShowConfirm(true)
		},
		dialog: showConfirm && {
			type: 'confirm',
			message: `Are you sure you would like to unpublish this document on production?`,
			onConfirm: async () => {
				// Instead of unpublishing on production, we simply delete the document,
				// because it will be created or replaced again anyway on the next published
				productionClient
					.delete(id)
					.then(() => {
						setLabel('Successfully unpublished this document on production')
						setTimeout(() => {
							setLabel(defaultLabel)
						}, 2000)
					})
					.catch(() => {
						setLabel('Failed to unpublish this document on production')
						setTimeout(() => {
							setLabel(defaultLabel)
						}, 2000)
					})
				setShowConfirm(false)
			},
			onCancel: () => {
				setShowConfirm(false)
			}
		}
	}
}
