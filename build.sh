sed -i.bak 's/url:.*/url: https:\/\/michael.standen.link/' _config.yml
rm _config.yml.bak
# Dependencies
npm i
# Mini JS
node_modules/.bin/uglifyjs assets/js/src/* -o assets/js/main.min.js
# Force build
rm -r _site
bundle exec jekyll build
