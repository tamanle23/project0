import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync, readFileSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'

function getFilesRecursively(dir) {
  let results = []
  if (!existsSync(dir)) return results
  const list = readdirSync(dir)
  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath))
    } else {
      if (filePath.endsWith('.json')) {
        results.push(filePath)
      }
    }
  }
  return results
}

function loadBlogs() {
  const blogDir = path.join(process.cwd(), 'data', 'blog')
  const files = getFilesRecursively(blogDir)
  
  return files.map((filePath) => {
    const raw = readFileSync(filePath, 'utf8')
    const doc = JSON.parse(raw)
    const relativePath = path.relative(path.join(process.cwd(), 'data'), filePath).replace(/\\/g, '/')
    const flattenedPath = relativePath.replace(/\.json$/, '')
    const postSlug = flattenedPath.replace(/^.+?(\/)/, '')
    return {
      ...doc,
      slug: postSlug,
      tags: doc.tags || [],
    }
  })
}

function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function computeTagData(allBlogs) {
  const tagCount = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  return tagCount
}

const outputFolder = process.env.EXPORT ? 'out' : 'public'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./${outputFolder}/${page}`, rss)
  }

  if (publishPosts.length > 0) {
    const tagData = computeTagData(publishPosts)
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
      const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
      const rssPath = path.join(outputFolder, 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    const coreContents = allBlogs.map(blog => {
      const { portableTextBody, structuredData, ...core } = blog
      return core
    })
    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(coreContents)
    )
    console.log('Local search index generated...')
  }
}

const rss = () => {
  const allBlogs = loadBlogs()
  generateRSS(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
  createSearchIndex(allBlogs)
}
export default rss
