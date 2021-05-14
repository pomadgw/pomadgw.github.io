// Modified from https://www.adamdehaven.com/blog/how-to-add-metadata-canonical-urls-and-structured-data-to-your-vuepress-site/

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
// Customize the value to your timezone (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)
dayjs.tz.setDefault('Asia/Jakarta')

module.exports = (options = {}, ctx) => ({
  extendPageData($page) {
    const { frontmatter, path } = $page

    const slugRegex = /\/_posts\/(\d{4})-(\d{2})-(\d{2})-(.+?)\.html$/
    const result = slugRegex.exec(path)

    const date = frontmatter.date ? dayjs(frontmatter.date) : (result ? new Date(Number(result[1]), Number(result[2]) - 1, Number(result[3]), 0, 0, 0) : null)

    let permalink = frontmatter.permalink

    if (result) {
      const slug = result[4]
      permalink = frontmatter
        .permalink
        .replace(':year', date.year())
        .replace(':month', (date.month() + 1).toString().padStart(2, '0'))
        .replace(':day', date.date().toString().padStart(2, '0'))
        .replace(':slug', slug)
    }

    const metadata = {
      title: frontmatter.title
        ? frontmatter.title.toString().replace(/["|'|\\]/g, '')
        : $page.title
        ? $page.title.toString().replace(/["|'|\\]/g, '')
        : null,
      description: frontmatter.description
        ? frontmatter.description
            .toString()
            .replace(/'/g, "'")
            .replace(/["|\\]/g, '')
        : null,
      url:
        frontmatter.canonicalUrl && typeof frontmatter.canonicalUrl === 'string'
          ? frontmatter.canonicalUrl.startsWith('http')
            ? frontmatter.canonicalUrl
            : ctx.siteConfig.themeConfig.domain + frontmatter.canonicalUrl
          : ctx.siteConfig.themeConfig.domain + permalink,
      image:
        frontmatter.image && typeof frontmatter.image === 'string'
          ? frontmatter.image.startsWith('http')
            ? frontmatter.image
            : ctx.siteConfig.themeConfig.domain + frontmatter.image
          : null,
      type: meta_isArticle(path) ? 'article' : 'website',
      siteName: ctx.siteConfig.title || null,
      siteLogo: ctx.siteConfig.themeConfig.domain + ctx.siteConfig.themeConfig.defaultImage,
      published: frontmatter.date
        ? dayjs(frontmatter.date).toISOString()
        : $page.lastUpdated
        ? dayjs($page.lastUpdated).toISOString()
        : null,
      modified: $page.lastUpdated ? dayjs($page.lastUpdated).toISOString() : null,
      author: ctx.siteConfig.themeConfig.personalInfo ? ctx.siteConfig.themeConfig.personalInfo : null,
    }

    let meta_articleTags = []
    if (meta_isArticle(path)) {
      // Article info
      meta_articleTags.push(
        {
          property: 'article:published_time',
          content: metadata.published,
        },
        {
          property: 'article:modified_time',
          content: metadata.modified,
        },
        {
          property: 'article:section',
          content: frontmatter.category ? frontmatter.category.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()) : null,
        },
        {
          property: 'article:author',
          content: meta_isArticle(path) && metadata?.author?.name ? metadata.author.name : null,
        },
      )
      // Article tags
      // Todo: Currently, VuePress only injects the first tag
      if (frontmatter.tags && frontmatter.tags.length) {
        frontmatter.tags.forEach((tag, i) =>
          meta_articleTags.push({
            property: 'article:tag',
            content: tag,
          }),
        )
      }
    }

    let meta_profileTags = []
    if (frontmatter.pageAbout && metadata.author.name) {
      meta_profileTags.push(
        {
          property: 'profile:first_name',
          content: metadata.author.name.split(' ')[0],
        },
        {
          property: 'profile:last_name',
          content: metadata.author.name.split(' ')[1],
        },
        {
          property: 'profile:username',
          content: metadata.author.social.find((s) => s.title.toLowerCase() === 'twitter').account
            ? '@' + metadata.author.social.find((s) => s.title.toLowerCase() === 'twitter').account
            : null,
        },
        {
          property: 'profile:gender',
          content: metadata.author.gender ? metadata.author.gender : null,
        },
      )
    }

    let meta_dynamicMeta = [
      // General meta tags
      { name: 'description', content: metadata.description },
      {
        name: 'keywords',
        content: frontmatter.tags && frontmatter.tags.length ? frontmatter.tags.join(', ') : null,
      },
      { itemprop: 'name', content: metadata.title },
      { itemprop: 'description', content: metadata.description },
      {
        itemprop: 'image',
        content: metadata.image ? metadata.image : null,
      },
      // Open Graph
      { property: 'og:url', content: metadata.url },
      { property: 'og:type', content: metadata.type },
      { property: 'og:title', content: metadata.title },
      {
        property: 'og:image',
        content: metadata.image ? metadata.image : null,
      },
      {
        property: 'og:image:type',
        content: metadata.image && meta_getImageMimeType(metadata.image) ? meta_getImageMimeType(metadata.image) : null,
      },
      {
        property: 'og:image:alt',
        content: metadata.image ? metadata.title : null,
      },
      { property: 'og:description', content: metadata.description },
      { property: 'og:updated_time', content: metadata.modified },
      // Article info (if meta_isArticle)
      ...meta_articleTags,
      // Profile (if /about/ page)
      ...meta_profileTags,
      // Twitter Cards
      { property: 'twitter:url', content: metadata.url },
      { property: 'twitter:title', content: metadata.title },
      { property: 'twitter:description', content: metadata.description },
      {
        property: 'twitter:image',
        content: metadata.image ? metadata.image : null,
      },
      { property: 'twitter:image:alt', content: metadata.title },
    ]

    // Remove tags with empty content values
    meta_dynamicMeta = meta_dynamicMeta.filter((meta) => meta.content && meta.content !== '')
    // Combine frontmatter
    meta_dynamicMeta = [...(frontmatter.meta || []), ...meta_dynamicMeta]

    // Set frontmatter after removing duplicate entries
    meta_dynamicMeta = getUniqueArray(meta_dynamicMeta, ['name', 'content', 'itemprop', 'property'])

    frontmatter.meta = meta_dynamicMeta
  },
})

/**
 * Removes duplicate objects from an Array of JavaScript objects
 * @param {Array} arr Array of Objects
 * @param {Array} keyProps Array of keys to determine uniqueness
 */
function getUniqueArray(arr, keyProps) {
  return Object.values(
    arr.reduce((uniqueMap, entry) => {
      const key = keyProps.map((k) => entry[k]).join('|')
      if (!(key in uniqueMap)) uniqueMap[key] = entry
      return uniqueMap
    }, {}),
  )
}

/**
 * Returns boolean indicating if page is a blog post
 * @param {String} path Page path
 */
function meta_isArticle(path) {
  // Include path(s) where blog posts/articles are contained
  return ['articles', 'posts', '_posts', 'blog'].some((folder) => {
    let regex = new RegExp('^\\/' + folder + '\\/([\\w|-])+', 'gi')
    // Customize /category/ and /tag/ (or other sub-paths) below to exclude, if needed
    return regex.test(path) && path.indexOf(folder + '/category/') === -1 && path.indexOf(folder + '/tag/') === -1
  })
    ? true
    : false
}

/**
 * Returns the meme type of an image, based on the extension
 * @param {String} img Image path
 */
function meta_getImageMimeType(img) {
  if (!img) {
    return null
  }
  const regex = /\.([0-9a-z]+)(?:[\?#]|$)/i
  if (Array.isArray(img.match(regex)) && ['png', 'jpg', 'jpeg', 'gif'].some((ext) => img.match(regex)[1] === ext)) {
    return 'image/' + img.match(regex)[1]
  } else {
    return null
  }
}
