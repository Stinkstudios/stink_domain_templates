import React from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(Number(value)))

export default class Slider extends React.Component {
	static propTypes = {
		type: PropTypes.shape({
			title: PropTypes.string,
			options: PropTypes.shape({
				range: PropTypes.shape({
					min: PropTypes.number.isRequired,
					max: PropTypes.number.isRequired,
					step: PropTypes.number
				})
			}).isRequired
		}).isRequired,
		value: PropTypes.number,
		onChange: PropTypes.func.isRequired
	}

	focus() {
		this._inputElement.focus()
	}

	render() {
		const { _type, value, onChange } = this.props
		const type = _type || { options: { range: { min: 0, max: 10, step: 1 } } }
		const { min, max, step } = type.options.range

		return (
			<FormField label={type.title} description={type.description}>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value === undefined ? '' : value}
					onChange={event => onChange(createPatchFrom(event.target.value))}
					ref={element => (this._inputElement = element)}
				/>
			</FormField>
		)
	}
}
