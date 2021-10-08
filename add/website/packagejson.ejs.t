---
to: 'package.json'
inject: true
after: '	"scripts": {'
---
		"<%= name %>:dev": "cd ./<%= name %> && npm run dev",
		"<%= name %>:prod": "cd ./<%= name %> && npm run prod",
		"<%= name %>:i": "npm i --prefix ./<%= name %>",
		"<%= name %>:uninstall": "npm uninstall --prefix ./<%= name %>",
		"<%= name %>:hygen": "cd ./<%= name %> && hygen",
