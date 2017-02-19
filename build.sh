sed -i.bak 's/url:.*/url: https:\/\/michael.standen.link/' _config.yml
rm _config.yml.bak
#npm install -g uglify-js
uglifyjs assets/js/src/* -o assets/js/main.min.js # Minify javascript
rm -r _site # Force complete build
bundle exec jekyll build
