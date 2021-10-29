const asset = (name, extraFields = null) => `${name}{
	${extraFields !== null ? extraFields + ',' : ''}
	_id,
	_key,
	alt,
	_type,
	asset->,
	crop,
	hotspot
}`
export default asset
