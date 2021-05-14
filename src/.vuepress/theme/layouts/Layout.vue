<template>
  <Container>
    <article class="p-12 pt-6 pb-12" itemscope itemtype="http://schema.org/BlogPosting">
      <header class="text-center mb-12">
        <h1 itemprop="name headline" class="font-bold text-3xl">{{ $page.title }}</h1>
        <time v-if="$page.frontmatter.date" :datetime="$page.frontmatter.date" itemprop="datePublished" class="mt-6 block text-xl">
          {{ year }}/{{ month }}/{{ date }}
        </time>
      </header>
      <main aria-label="Main content" itemscope itemtype="https://schema.org/Blog">
        <Content itemprop="articleBody"/>
      </main>

      <div v-if="$page.frontmatter.tags && $page.frontmatter.tags.length > 0" class="mt-6">
        tags:
        <a v-for="tag in $page.frontmatter.tags" :key="tag" :href="`/tag/${tag}`"><Tag>{{ tag }}</Tag></a>
      </div>
    </article>
  </Container>
</template>
<script>
import Container from '../components/Container'
import Tag from '../components/Tag'

export default {
  name: 'Layout',
  components: {
    Container,
    Tag,
  },
  computed: {
    year() {
      return Intl.DateTimeFormat(['en-US'], { year: 'numeric' }).format(new Date(this.$page.frontmatter.date))
    },
    month() {
      return Intl.DateTimeFormat(['en-US'], { month: 'numeric' }).format(new Date(this.$page.frontmatter.date)).padStart(2, '0')
    },
    date() {
      return Intl.DateTimeFormat(['en-US'], { day: 'numeric' }).format(new Date(this.$page.frontmatter.date))
    },
  }
}
</script>
