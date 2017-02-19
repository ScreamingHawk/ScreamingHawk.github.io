sed -i.bak 's/url:.*/url: http:\/\/localhost:4000/' _config.yml
rm _config.yml.bak
bundle exec jekyll serve --drafts
