const breakpoints = require('../local-config/breakpoints')

const generateSassBreakpoint = () => {
	let breakpointsString = '$breakpoints: ('
	for (const breakpoint of breakpoints) {
		breakpointsString += `"${breakpoint.name}": ${breakpoint.width}px,`
	}
	breakpointsString = breakpointsString.substr(0, breakpointsString.length - 1) + ')'
	return breakpointsString
}

const sassOptions = {
	prependData: `
    ${generateSassBreakpoint()};
    @use 'sass:map';
    @use 'sass:list';
    @import '~rupture-sass/rupture';
    @import '~/styles/settings.scss';
    @import '~/styles/helpers.scss';
    `
}

module.exports = sassOptions
