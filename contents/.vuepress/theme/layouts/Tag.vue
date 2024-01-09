<template>
  <Container>
    <div class="px-12">
      <h1 class="mt-6 text-3xl">Post with tag <Tag>{{ $currentTag.key }}</Tag></h1>
      <div v-for="page in pages" :key="page.path" class="py-6">
        <div v-if="page.frontmatter.date">{{ format(parse(page.frontmatter.date), 'yyyy/MM/dd') }}</div>
        <h1 class="font-bold text-3xl">
          <a :href="page.path">{{ page.title }}</a>
        </h1>
        <template v-if="page.excerpt">
          <div v-html="page.excerpt" class="mt-3" />

          <a :href="page.path" class="mt-3 block">more...</a>
        </template>
      </div>
    </div>
  </Container>
</template>
<script>
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import Container from '../components/Container'
import Tag from '../components/Tag'

export default {
  name: 'TagLayout',
  components: {
    Container,
    Tag,
  },
  computed: {
    pages() {
      return this.$pagination._matchedPages
    },
  },
  methods: {
    format,
    parse: parseISO,
  },
}
</script>
