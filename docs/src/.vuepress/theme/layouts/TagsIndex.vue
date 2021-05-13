<template>
  <Container>
    <div class="px-12">
      <h1 class="mt-6 text-3xl">Tags!</h1>

      <div class="flex py-12 justify-between">
        <a v-for="(tag, key) in $tag._metaMap" :key="key" :href="tag.path" class="text-xl block" style="width: 100px">
          <Tag class="p-2">{{ key }}</Tag>
        </a>
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
  name: 'TagIndexLayout',
  components: {
    Container,
    Tag
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
