---
to: 'package.json'
inject: true
after: '	"scripts": {'
---
		"<%= directoryName %>:start": "cd ./<%= directoryName %> && npm run start",
		"<%= directoryName %>:build": "cd ./<%= directoryName %> && npm run build",
		"<%= directoryName %>:deploy": "cd ./<%= directoryName %> && sanity deploy",
		"<%= directoryName %>:i": "npm i --prefix ./<%= directoryName %>",
		"<%= directoryName %>:uninstall": "npm uninstall --prefix ./<%= directoryName %>",
