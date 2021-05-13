<template>
  <Container>
    <div class="px-12">
      <div v-for="page in pages" :key="page.path" class="py-6">
        <div>{{ format(parse(page.frontmatter.date), 'yyyy/MM/dd') }}</div>
        <h1 class="font-bold text-3xl">
          <a :href="page.path">{{ page.title }}</a>
        </h1>
      </div>
    </div>
  </Container>
</template>
<script>
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import Container from '../components/Container'

export default {
  name: 'Tag',
  components: {
    Container
  },
  computed: {
    pages() {
      return this.$site
        .pages
        .filter(page => page.frontmatter?.tags?.includes(this.$route.query?.tag))
        .sort((a, b) => parseISO(b.frontmatter.date) - parseISO(a.frontmatter.date))
    },
  },
  methods: {
    format,
    parse: parseISO,
  },
}
</script>
