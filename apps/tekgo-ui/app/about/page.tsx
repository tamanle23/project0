/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Authors, allAuthors } from '@/lib/content'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author as any)

  return (
    <>
      <AuthorLayout content={mainContent as any}>
        <PortableTextRenderer content={author.portableTextBody} />
      </AuthorLayout>
    </>
  )
}
