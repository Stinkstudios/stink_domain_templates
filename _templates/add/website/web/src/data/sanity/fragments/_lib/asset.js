const asset = (name) => `${name}{
	_key,
	alt,
	"_type": image._type,
	'asset': image.asset->,
	"crop": image.crop,
	"hotspot": image.hotspot
}`
export default asset
