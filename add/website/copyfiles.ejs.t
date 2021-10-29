---
sh: "cp -r <%= cwd %>/_templates/add/website/<%= framework %>/. ./<%= name %> && cd <%= name %> && npm install && git submodule add -f https://github.com/Stinkstudios/stink_<%= framework %>_templates  _templates"
---
Creating site in the directory <%= name %>...
