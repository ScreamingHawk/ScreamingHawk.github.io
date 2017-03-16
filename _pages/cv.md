---
layout: page
title: "Michael Standen - Curriculum Vitae"
description: "Software Engineer for fun and profit"
permalink: /cv.html
image: "images/sai-kiran-anagani-61187.jpg"
imageattribution: "Sai Kiran Anagani"
imageattributionlink: https://unsplash.com/@iamkiran
block_share_bottom: true
---

{% assign cv = site.data.cv %}
# {{ cv.details.name }}
{% if cv.details.blurb %}
### {{ cv.details.blurb }}
{% endif %}

{% if cv.details.email %}Email: **<a href="mailto:{{ cv.details.email }}">{{ cv.details.email }}</a>**<br />{% endif %}
{% if cv.details.phone %}Phone: **{{ cv.details.phone }}**<br />{% endif %}
{% if cv.details.location %}Location: **{{ cv.details.location }}**<br />{% endif %}

{% for section in cv.sections %}
## {{ section.title }}
{% if section.request %}
### {{section.title}} available on request
{% else %}
{% for item in section.content %}
### {{ item.title }}
{% if item.date and item.blurb %}
#### ({{ item.date }}) {{ item.blurb }}
{% elsif item.date %}
#### {{ item.date }}
{% elsif item.blurb %}
#### {{ item.blurb }}
{% endif %}
{% for content in item.content %}
{{ content | markdownify }}
{% endfor %}
{% endfor %}
{% endif %}
{% endfor %}

