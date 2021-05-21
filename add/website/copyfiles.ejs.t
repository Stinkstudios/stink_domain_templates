---
sh: "cp -r <%= cwd %>/_templates/add/website/web/. ./<%= name %> && cd <%= name %> && npm install && git submodule add https://github.com/Stinkstudios/stink_web_templates _templates && rm -f .gitmodules"
---
Creating site...
