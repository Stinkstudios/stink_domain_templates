---
to: 'package.json'
inject: true
after: '	"scripts": {'
---
		"<%= directoryName %>:dev": "cd ./<%= directoryName %> && npm run dev",
		"<%= directoryName %>:prod": "cd ./<%= directoryName %> && npm run prod",
		"<%= directoryName %>:i": "npm i --prefix ./<%= directoryName %>",
		"<%= directoryName %>:uninstall": "npm uninstall --prefix ./<%= directoryName %>",
