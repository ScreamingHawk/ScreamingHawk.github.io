#npm install -g uglify-js
uglifyjs assets/js/src/* -o assets/js/main.min.js # Minify javascript
rm -r _site # Force complete build
bundle exec jekyll build
