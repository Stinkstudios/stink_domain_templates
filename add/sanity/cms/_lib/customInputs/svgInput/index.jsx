/* eslint-disable max-lines */
import React from 'react'
import Label from 'part:@sanity/components/labels/default'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import Button from 'part:@sanity/components/buttons/default'
import FileInputButton from 'part:@sanity/components/fileinput/button'
import ButtonGrid from 'part:@sanity/components/buttons/button-grid'
import UploadIcon from 'part:@sanity/base/upload-icon'
import TrashIcon from 'part:@sanity/base/trash-icon'
import Spinner from 'part:@sanity/components/loading/spinner'

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

import styles from './svgInput.css'

const createPatchFrom = value => PatchEvent.from(value.svgString === null ? unset() : set(value))

export default class svgInput extends React.Component {
	constructor(props) {
		super(props)
		const state = {
			svgString: null,
			isUploadingSvgFile: false
		}
		if (props.value) {
			if (props.value.svgString) {
				state.svgString = props.value.svgString
			}
		}

		this.state = state
	}

	componentDidUpdate() {}

	// this is called by the form builder whenever this input should receive focus
	focus() {
		// this._inputElement.focus()
	}

	handleUploadSvgFile(file) {
		const fr = new FileReader()
		this.setState({ isUploadingSvgFile: true })
		fr.onload = () => {
			this.patch({
				svgString: fr.result
			})
			this.setState({ svgString: fr.result, isUploadingSvgFile: false })
		}
		fr.readAsText(file)
	}

	patch(state) {
		const value = { svgString: null }
		if (state) {
			if (state.svgString !== null) {
				value.svgString = state.svgString
			}
		} else {
			this.setState({
				svgString: null
			})
		}
		this.props.onChange(createPatchFrom(value))
	}

	render() {
		const { type } = this.props

		return (
			<Fieldset legend={type.title}>
				<div className={styles.svgInput}>
					{this.state.svgString && this.state.svgString.nm && <Label>{this.state.svgString.nm}</Label>}
					<ButtonGrid>
						<FileInputButton
							inverted={true}
							accept={'image/svg+xml'}
							icon={this.state.isUploadingSvgFile ? Spinner : UploadIcon}
							disabled={this.state.isUploadingSvgFile}
							onSelect={files => this.handleUploadSvgFile(files[0])}
						>
							Upload the SVG file
						</FileInputButton>
						{this.state.svgString && (
							<Button icon={TrashIcon} onClick={() => this.patch()}>
								Delete the SVG
							</Button>
						)}
					</ButtonGrid>
					{this.state.svgString && (
						<div
							className={styles.svgPreview}
							dangerouslySetInnerHTML={{ __html: this.state.svgString }}
						></div>
					)}
				</div>
			</Fieldset>
		)
	}
}
