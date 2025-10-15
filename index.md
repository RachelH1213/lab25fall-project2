---
layout: layout.njk
title: Home
---

# Taylor Swift Collection

<section class="filters">
  <input id="search" type="search" placeholder="Search titles…" />
  <div id="filters"></div>
  <div class="filter-actions"><button id="clear-filters" class="tag-btn">Clear</button></div>
</section>

<ul id="post-list" class="post-list">
{% for post in collections.posts %}
  {% set tagsArr = post.data.tags or [] %}
  {% set title = post.data.title or post.fileSlug %}

  <li class="post-card"
      data-tags="{{ tagsArr | join(' ') }}"
      data-title="{{ title | escape }}">
    <a href="{{ post.url | url }}">
      {% if post.data.thumb or post.data.cover %}
      <figure>
        {% if post.data.thumb %}
          <img src="{{ post.data.thumb | url }}" alt="{{ title | escape }} thumbnail">
        {% else %}
          <img src="{{ post.data.cover | url }}" alt="{{ title | escape }} cover">
        {% endif %}
      </figure>
      {% endif %}

      <h2>{{ title }}</h2>
      <div class="chips">
        {% if post.data.era %}
          <span class="era-chip" data-era="{{ post.data.era }}">{{ post.data.era }}</span>
        {% endif %}
      </div>
      <p class="meta">
        {% if post.date %}{{ post.date | date('yyyy-LL-dd') }}{% endif %}
      </p>
    </a>
  </li>
{% endfor %}
</ul>

