'use client'
import { Button } from '@/components/Button'
import { Link2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import LinksModal from './links-modal'
import { ITripLinks } from '@/models/trip'

interface Props {
  tripId?: string
  links?: ITripLinks[]
}

export default function LinksSection({ tripId, links = [] }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedLink, setSelectedLink] = useState<ITripLinks | undefined>()

  return (
    <section>
      <h1 className='text-zinc-50 text-xl font-semibold'>Links Importantes</h1>
      <div className='space-y-5 my-5'>
        {links.map((link, index) => (
          <LinkItem
            key={index}
            title={link.title}
            url={link.url}
            onClick={() => {
              setSelectedLink(link)
              setOpen(true)
            }}
          />
        ))}
      </div>
      <Button
        variant='secondary'
        size='full'
        onClick={() => {
          setSelectedLink(undefined)
          setOpen(true)
        }}
      >
        <PlusIcon className='w-5 h-5' />
        <p>Cadastrar novo link</p>
      </Button>
      <LinksModal
        open={open}
        onOpenChange={setOpen}
        tripId={tripId}
        selectedLink={selectedLink}
      />
    </section>
  )
}

function LinkItem({ title, url, onClick }: { title: string, url: string, onClick?: () => void }) {
  return (
    <li
      className='w-full flex justify-between items-center gap-16'>
      <div className='flex-1'>
        <button
          onClick={onClick}
        >{title}</button>
        <p className='truncate tex text-xs text-zinc-400'>{url}</p>
      </div>
      <Button
        variant='ghost'
        onClick={() => window.open(url)}
      >
        <Link2Icon className='w-6 h-6 text-zinc-400' />
      </Button>
    </li>
  )
}
