const path = require('path')
const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "pomadgw's blog",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['script', { type: 'text/x-mathjax-config' }, `
      MathJax.Hub.Config({
          tex2jax: {inlineMath: [['!$','$!'], ['\\(','\\)']]}
      });
    `],
    ['script', { async: true, src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ...[[360, 'max-width: 767px'], [720, 'min-width: 768px'], [1080, 'min-width: 1200px']].map(([width, media]) => [
      'link', {
        rel: 'preload',
        media,
        href: `/img/${width}.png`,
        as: 'image',
      }
    ])
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/plugin-blog',
      {
        directories: [
          {
            // Unique ID of current classification
            id: 'post',
            // Target directory
            dirname: '_posts',
            // Path of the `entry page` (or `list page`)
            path: '/',
            itemLayout: 'Layout',
            itemPermalink: '/:year/:month/:day/:slug.html',
          },
        ],
        frontmatters: [
          {
            // Unique ID of current classification
            id: 'tag',
            // Decide that the frontmatter keys will be grouped under this classification
            keys: ['tag', 'tags'],
            // Path of the `entry page` (or `list page`)
            path: '/tag/',
            // Layout of the `entry page`
            layout: 'TagsIndex',
            // Layout of the `scope page`
            scopeLayout: 'Tag'
          },
        ],
        sitemap: {
          hostname: 'https://the.pomadgw.xyz'
        },
      }
    ],
  ],

  permalink: '/:year/:month/:day/:slug.html',

  alias: {
    'tailwind': path.resolve(__dirname, './tailwind')
  },

  postcss: {
    plugins: [
        require('autoprefixer')({/*plugin options*/}),
        require('tailwindcss')("./tailwind.config.js"),
    ]
  },

  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-footnote'))
    }
  },
}
