import fragments from 'data-interface/sanity/_lib/fragments'

const content = (name = 'content') => `${name}[]{
	_type == "textModule" => {
		_type,
		_key,
		${fragments.blocks('paragraphs')}
	}
}`
export default content
