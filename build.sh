sed -i.bak 's/url:.*/url: https:\/\/michael.standen.link/' _config.yml
rm _config.yml.bak
bundle exec jekyll build
cd _site
rm *.sh
