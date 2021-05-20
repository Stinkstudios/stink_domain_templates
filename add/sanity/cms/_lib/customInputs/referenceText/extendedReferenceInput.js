import React from 'react'

import client from 'part:@sanity/base/client'
import ReferenceInput from '@sanity/form-builder/lib/inputs/ReferenceInput/ReferenceInput'
import { search, getPreviewSnapshot } from '@sanity/form-builder/lib/sanity/inputs/client-adapters/reference'
import Button from 'part:@sanity/components/buttons/default'
import DefaultTextArea from 'part:@sanity/components/textareas/default'
import DefaultTextInput from 'part:@sanity/components/textinputs/default'
import PlusIcon from 'part:@sanity/base/plus-icon'
import Label from 'part:@sanity/components/labels/default'
import buttonStyle from '@sanity/components/lib/buttons/styles/DefaultButton.css'
import formItemStyle from './extendedReferenceInput.css'

export default class ExtendedReferenceInput extends React.Component {
	constructor(props) {
		super(props)
		this._input = null
		this._newDocLabel = null
		this._newDocContent = null
		this.state = {
			newTitle: '',
			newContent: '',
			addNewItem: false
		}
	}

	setInput = (input) => {
		this._input = input
	}

	focus() {
		this._input.focus()
	}

	searchWrapper(textTerm, referenceType, options) {
		return search(textTerm, referenceType, options)
	}

	getPreviewSnapshotWrapper(value, referenceType) {
		return getPreviewSnapshot(value, referenceType)
	}

	openAddView(state) {
		this.setState({
			addNewItem: state
		})
	}

	async handleAddClick() {
		await client
			.create({
				_type: this.props.type.to[0].name,
				title: this.state.newTitle,
				content: this.state.newContent
			})
			.then((res) => {
				const referenceInput = this._input._input._input
				referenceInput.handleChange({
					_type: 'reference',
					_id: res._id
				})
				this.setState({
					addNewItem: false
				})
			})
			.catch((err) => {
				console.log(err) // eslint-disable-line no-console
			})
	}

	handleTyping(label, value) {
		const obj = {}
		obj[label] = value
		this.setState(obj)
	}

	render() {
		return (
			<div>
				<div className={this.state.addNewItem ? formItemStyle.hiddenItem : ''}>
					<ReferenceInput
						{...this.props}
						// oncChange={}
						onSearch={this.searchWrapper}
						getPreviewSnapshot={this.getPreviewSnapshotWrapper}
						ref={this.setInput}
					/>
					<Button
						className={[buttonStyle.inverted, formItemStyle.customInputItem]}
						onClick={this.openAddView.bind(this, true)}
					>
						<PlusIcon />
					</Button>
				</div>
				<div className={!this.state.addNewItem ? formItemStyle.hiddenItem : ''}>
					<h2>
						New {this.props.type.to[0].name} for {this.props.type.to[0].fields[0].name}{' '}
					</h2>
					<Label className={formItemStyle.customInputItem}>Title</Label>
					<DefaultTextInput
						ref={(element) => (this._newDocLabel = element)}
						value={this.state.newTitle}
						placeholder="new title"
						onChange={(e) => this.handleTyping('newTitle', e.currentTarget.value)}
					></DefaultTextInput>
					<Label className={formItemStyle.customInputItem}>Content</Label>
					<DefaultTextArea
						ref={(element) => (this._newDocContent = element)}
						value={this.state.newContent}
						placeholder="new content"
						onChange={(e) => this.handleTyping('newContent', e.currentTarget.value)}
					></DefaultTextArea>
					<Button
						className={[formItemStyle.customInputItem, buttonStyle.inverted]}
						onClick={this.handleAddClick.bind(this)}
					>
						Save Item
					</Button>
					<Button className={formItemStyle.customInputItem} onClick={this.openAddView.bind(this, false)}>
						Cancel
					</Button>
					<br />
				</div>
			</div>
		)
	}
}
