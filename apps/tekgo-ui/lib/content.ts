import fs from 'fs'
import path from 'path'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'

export type CoreContent<T> = Omit<T, 'portableTextBody' | 'structuredData'>

export interface Blog {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: any
  authors?: string[]
  layout?: string
  bibliography?: string
  canonicalUrl?: string
  portableTextBody: any
  slug: string
  path: string
  filePath: string
  readingTime: any
  toc: { value: string; url: string; depth: number }[]
  structuredData: any
}

export interface Authors {
  name: string
  avatar?: string
  occupation?: string
  company?: string
  email?: string
  twitter?: string
  bluesky?: string
  linkedin?: string
  github?: string
  layout?: string
  portableTextBody: any
  slug: string
  path: string
  filePath: string
  readingTime: any
}

function extractTocFromPortableText(blocks: any[]): { value: string; url: string; depth: number }[] {
  const toc: { value: string; url: string; depth: number }[] = []
  if (!Array.isArray(blocks)) return toc
  
  const slugger = new GithubSlugger()
  
  for (const block of blocks) {
    if (block._type === 'block' && typeof block.style === 'string' && block.style.match(/^h[1-6]$/)) {
      const depth = parseInt(block.style.charAt(1), 10)
      const text = block.children?.map((child: any) => child.text).join('') || ''
      const url = '#' + slugger.slug(text)
      toc.push({ value: text, url, depth })
    }
  }
  return toc
}

function getFilesRecursively(dir: string): string[] {
  let results: string[] = []
  if (!fs.existsSync(dir)) return results
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
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

function loadBlogs(): Blog[] {
  const blogDir = path.join(process.cwd(), 'data', 'blog')
  const files = getFilesRecursively(blogDir)
  
  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8')
    const doc = JSON.parse(raw)
    
    // Normalize path to use forward slashes
    const relativePath = path.relative(path.join(process.cwd(), 'data'), filePath).replace(/\\/g, '/')
    
    // e.g. "blog/my-post.json" -> "blog/my-post"
    const flattenedPath = relativePath.replace(/\.json$/, '')
    
    // e.g. "blog/my-post" -> "my-post", "blog/nested/post" -> "nested/post"
    const slug = flattenedPath.replace(/^.+?(\/)/, '')
    
    const docToc = extractTocFromPortableText(doc.portableTextBody || [])
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.lastmod || doc.date,
      description: doc.summary,
      image: doc.images ? (Array.isArray(doc.images) ? doc.images[0] : doc.images) : siteMetadata.socialBanner,
      url: `${siteMetadata.siteUrl}/${flattenedPath}`,
    }

    return {
      ...doc,
      slug,
      path: flattenedPath,
      filePath: relativePath,
      readingTime: readingTime(JSON.stringify(doc.portableTextBody || '')),
      toc: docToc,
      structuredData,
      tags: doc.tags || [],
    }
  })
}

function loadAuthors(): Authors[] {
  const authorDir = path.join(process.cwd(), 'data', 'authors')
  const files = getFilesRecursively(authorDir)
  
  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8')
    const doc = JSON.parse(raw)
    
    const relativePath = path.relative(path.join(process.cwd(), 'data'), filePath).replace(/\\/g, '/')
    const flattenedPath = relativePath.replace(/\.json$/, '')
    const slug = flattenedPath.replace(/^.+?(\/)/, '')

    return {
      ...doc,
      slug,
      path: flattenedPath,
      filePath: relativePath,
      readingTime: readingTime(JSON.stringify(doc.portableTextBody || '')),
    }
  })
}

export const allBlogs = loadBlogs()
export const allAuthors = loadAuthors()

export const tagData = (() => {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = new GithubSlugger().slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  return tagCount
})()

export function sortPosts(posts: any[]) {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function coreContent<T extends { portableTextBody?: any; structuredData?: any }>(content: T): Omit<T, 'portableTextBody' | 'structuredData'> {
  const { portableTextBody, structuredData, ...core } = content
  return core as Omit<T, 'portableTextBody' | 'structuredData'>
}

export function allCoreContent<T extends { portableTextBody?: any; structuredData?: any }>(contents: T[]): Omit<T, 'portableTextBody' | 'structuredData'>[] {
  return contents.map((c) => coreContent(c))
}
