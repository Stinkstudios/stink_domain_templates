import { blocks } from '~/data/sanity/fragments'

const content = (name = 'content') => `${name}[]{
	_type == "bullets" => ${blocks.bullets()},
	_type == "cta" => ${blocks.cta()},
}`
export default content
