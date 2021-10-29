import fragments from '~/data/sanity/_lib/fragments'

const home = () => `{
	"home": *[_type == 'home'][0] {
		${fragments.metaData()},
		hero {
			${fragments.blocks('paragraph')},
			${fragments.title('title')},
			${fragments.link('link')},
			${fragments.video('videoModule')}
		}
	},
	"work": *[_type == 'workpage'][0] {
		${fragments.title()},
		"featuredProjects": ${fragments.projectCard('featuredProjects.projects[0...5]->')}
	},
	"contact": *[_type == "contact"][0] {
		${fragments.contactHero('hero')},
		${fragments.contactOfficesModule('officesModule')}
	},
	"about": *[_type == "about"][0] {
		${fragments.aboutHero('hero')}
	},
	"news": *[_type == "news"][0] {
		${fragments.tag('tags[]->')},
		${fragments.feed('feed[]')},
	}
}
`
export default home
