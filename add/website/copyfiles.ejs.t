---
sh: "cp -r <%= cwd %>/_templates/add/website/web/. ./<%= name %> && cd <%= name %> && npm install && git submodule add -f https://github.com/Stinkstudios/stink_web_templates  _templates"
---
Creating site in the directory <%= name %>...
