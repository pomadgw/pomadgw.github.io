const parse = require('date-fns/parse')
const parseISO = require('date-fns/parseISO')

// string.js slugify drops non ascii chars so we have to
// use a custom implementation here

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’–—<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

function slugify(str) {
  // Split accented characters into components
  return str.normalize('NFKD')
    // Remove accents
    .replace(rCombining, '')
    // Remove control characters
    .replace(rControl, '')
    // Replace special characters
    .replace(rSpecial, '-')
    // Remove continuous separators
    .replace(/\-{2,}/g, '-')
    // Remove prefixing and trailing separators
    .replace(/^\-+|\-+$/g, '')
    // ensure it doesn't start with a number (#121)
    .replace(/^(\d)/, '_$1')
    // lowercase
    .toLowerCase()
}

/**
 * Returns boolean indicating if page is a blog post
 * @param {String} path Page path
 */
 function isArticle(path) {
  // Include path(s) where blog posts/articles are contained
  return ['articles', 'posts', '_posts', 'blog'].some((folder) => {
    let regex = new RegExp('^\\/' + folder + '\\/([\\w|-])+', 'gi')
    // Customize /category/ and /tag/ (or other sub-paths) below to exclude, if needed
    return regex.test(path) && path.indexOf(folder + '/category/') === -1 && path.indexOf(folder + '/tag/') === -1
  })
    ? true
    : false
}

module.exports = (options = {}, ctx) => ({
  extendPageData($page) {
    const { frontmatter, path } = $page

    const slugRegex = /\/_posts\/(\d{4})-(\d{2})-(\d{2})-(.+?)\.html$/
    const result = slugRegex.exec(path)

    const date = frontmatter.date ? parseISO(frontmatter.date) : (result ? new Date(Number(result[1]), Number(result[2]) - 1, Number(result[3]), 0, 0, 0) : null)

    let permalink = frontmatter.permalink

    if (result) {
      const slug = result[4]
      permalink = frontmatter
        .permalink
        .replace(':year', date.getFullYear())
        .replace(':month', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace(':day', date.getDate().toString().padStart(2, '0'))
        .replace(':slug', slug)
    }

    frontmatter.meta = []

    const title = frontmatter.title ?? $page.title ?? null

    if (title) {
      frontmatter.meta.push({
        name: 'title',
        content: title
      })
      frontmatter.meta.push({
        property: 'og:title',
        content: title
      })
    }

    const description = frontmatter.description

    if (description) {
      frontmatter.meta.push({
        name: 'description',
        content: description
      })
      frontmatter.meta.push({
        property: 'og:description',
        content: description
      })
    }

    const createUrl = (path, domain) => {
      if (typeof path !== 'string') return undefined
      if (path.startsWith('http')) return path

      return new URL(path, domain).toString()
    }

    const canonicalUrl = createUrl(frontmatter.canonicalUrl ?? permalink, ctx.siteConfig.themeConfig.domain)

    if (canonicalUrl) {
      frontmatter.meta.push({
        property: 'og:url',
        content: canonicalUrl
      })
    }

    const image = createUrl(frontmatter.image ?? '/img/header.png', ctx.siteConfig.themeConfig.domain)
    const getMime = (url) => {
      const result = /.+\.(jpg|png|webp|gif|jpeg)$/.exec(url)
      if (result) {
        if (result[1] === 'jpg') return 'image/jpeg'
        return `image/${result[1]}`
      }

      return null
    }

    frontmatter.meta.push({
      property: 'og:image',
      content: image
    })

    frontmatter.meta.push({
      property: 'og:image:type',
      content: getMime(image)
    })

    frontmatter.meta.push({
      property: 'og:image:alt',
      content: title ?? ''
    })

    if (isArticle(path)) {
      const published = frontmatter.date
        ? date.toISOString()
          : $page.lastUpdated
        ? parse($page.lastUpdated, 'M/dd/yyyy, hh:mm:ss a', new Date()).toISOString()
          : null

      if (published) {
        frontmatter.meta.push({
          property: 'article:published_time',
          content: published
        })
      }
    }
  }
})
