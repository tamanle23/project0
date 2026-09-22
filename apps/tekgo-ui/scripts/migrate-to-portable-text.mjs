import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'

const ROOT = process.cwd()
const CONTENT_DIRS = ['data/blog', 'data/authors']

function generateKey() {
  return Math.random().toString(36).substring(2, 8)
}

function mdastToPortableText(nodes) {
  let blocks = []

  for (const node of nodes) {
    if (node.type === 'paragraph' || node.type === 'heading' || node.type === 'blockquote') {
      let style = 'normal'
      if (node.type === 'heading') style = `h${node.depth}`
      if (node.type === 'blockquote') style = 'blockquote'

      const markDefs = []
      const children = extractSpans(node.children, [], markDefs)

      blocks.push({
        _type: 'block',
        style,
        children: children.length > 0 ? children : [{ _type: 'span', marks: [], text: '' }],
        markDefs,
      })
    } else if (node.type === 'list') {
      const listItemStyle = node.ordered ? 'number' : 'bullet'
      for (const item of node.children) {
        const itemChildren = mdastToPortableText(item.children)
        // Lists in Portable Text are blocks with listItem and level
        itemChildren.forEach((b) => {
          if (b._type === 'block') {
            b.listItem = listItemStyle
            b.level = 1
          }
          blocks.push(b)
        })
      }
    } else if (node.type === 'code') {
      blocks.push({
        _type: 'code',
        language: node.lang,
        code: node.value,
      })
    } else if (node.type === 'math') {
      blocks.push({
        _type: 'math',
        formula: node.value,
      })
    } else if (node.type === 'image') {
      blocks.push({
        _type: 'image',
        alt: node.alt,
        src: node.url,
      })
    } else if (node.type === 'thematicBreak') {
      // Ignore or map to custom HR
    } else if (node.type === 'footnoteDefinition') {
      blocks.push({
        _type: 'footnoteDefinition',
        identifier: node.identifier,
        children: mdastToPortableText(node.children),
      })
    } else if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      const attributes = (node.attributes || []).reduce((acc, attr) => {
        if (attr.type === 'mdxJsxAttribute') {
          acc[attr.name] = attr.value
        }
        return acc
      }, {})
      blocks.push({
        _type: 'mdxComponent',
        name: node.name,
        attributes,
        children: node.children ? mdastToPortableText(node.children) : [],
      })
    } else {
      // fallback for raw text or inline elements that were parsed incorrectly
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', marks: [], text: node.value || '' }],
        markDefs: [],
      })
    }
  }
  return blocks
}

function extractSpans(nodes, activeMarks = [], markDefs = []) {
  let spans = []
  for (const node of nodes) {
    if (node.type === 'text') {
      spans.push({
        _type: 'span',
        marks: [...activeMarks],
        text: node.value,
        _key: generateKey(),
      })
    } else if (node.type === 'strong') {
      spans.push(...extractSpans(node.children, [...activeMarks, 'strong'], markDefs))
    } else if (node.type === 'emphasis') {
      spans.push(...extractSpans(node.children, [...activeMarks, 'em'], markDefs))
    } else if (node.type === 'inlineCode') {
      spans.push({
        _type: 'span',
        marks: [...activeMarks, 'code'],
        text: node.value,
        _key: generateKey(),
      })
    } else if (node.type === 'inlineMath') {
      spans.push({
        _type: 'span',
        marks: [...activeMarks],
        text: `$${node.value}$`,
        _key: generateKey(),
      })
    } else if (node.type === 'link') {
      const key = generateKey()
      markDefs.push({
        _type: 'link',
        _key: key,
        href: node.url,
      })
      spans.push(...extractSpans(node.children, [...activeMarks, key], markDefs))
    } else if (node.type === 'image') {
      // Inline image - portable text usually does not do inline images well, treat as text
      spans.push({
        _type: 'span',
        marks: [...activeMarks],
        text: `[Image: ${node.alt}]`,
        _key: generateKey(),
      })
    } else if (node.type === 'mdxJsxTextElement') {
      // if it's a JSX tag inside text, we will just output its raw value or children
      if (node.children && node.children.length > 0) {
        spans.push(...extractSpans(node.children, activeMarks, markDefs))
      }
    } else if (node.type === 'footnoteReference') {
      const key = generateKey()
      markDefs.push({
        _type: 'link',
        _key: key,
        href: `#fn-${node.identifier}`,
      })
      spans.push({
        _type: 'span',
        marks: [...activeMarks, key],
        text: `[${node.identifier}]`,
        _key: generateKey(),
      })
    }
  }
  return spans
}

async function run() {
  for (const dir of CONTENT_DIRS) {
    const files = globSync(`${dir}/**/*.mdx`, { cwd: ROOT })

    for (const file of files) {
      const fullPath = path.join(ROOT, file)
      const content = fs.readFileSync(fullPath, 'utf8')
      const { data: frontmatter, content: markdownBody } = matter(content)

      const processor = unified().use(remarkParse).use(remarkMath).use(remarkMdx).use(remarkGfm)
      const mdast = processor.parse(markdownBody)

      const portableText = mdastToPortableText(mdast.children)

      const jsonOutput = {
        ...frontmatter,
        portableTextBody: portableText,
      }

      const jsonPath = fullPath.replace(/\.mdx$/, '.json')
      fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf8')
      console.log(`Converted ${file} to ${jsonPath}`)
    }
  }
}

run().catch(console.error)
