#sed -i.bak 's/url:.*/urls: https:\/\/michael.standen.link/' _config.yml
#rm _config.yml.bak
rm -r _site # Force complete build
bundle exec jekyll build
rm _site/*.sh
