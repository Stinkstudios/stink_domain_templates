---
sh: "cp -r <%= cwd %>/_templates/add/website/web/. ./<%= directoryName %> && cd <%= directoryName %> && npm install && git submodule add -f https://github.com/Stinkstudios/stink_web_templates"
---
Creating site in the directory <%= directoryName %>...
