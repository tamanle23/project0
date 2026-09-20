import fs from 'fs'
import { globSync } from 'glob'

const files = globSync('app/tags/**/*.tsx', { ignore: 'node_modules/**' })
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8')
  let updated = content.replace(/import tagData from 'app\/tag-data\.json'/g, "import { tagData } from '@/lib/content'")
  if (content !== updated) {
    fs.writeFileSync(f, updated)
    console.log('Updated ' + f)
  }
})
