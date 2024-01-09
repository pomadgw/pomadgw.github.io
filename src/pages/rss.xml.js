import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'
import { format } from 'date-fns'

export async function GET(context) {
  const posts = await getCollection('blog')
  return await rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${format(post.data.pubDate, 'yyyy/MM/dd')}/${post.slug}`
    }))
  })
}
