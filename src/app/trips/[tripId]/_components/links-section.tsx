'use client'
import { Button } from '@/components/Button'
import { Link2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

export default function LinksSection() {
  const [links, setLinks] = useState<{ title: string, url: string }[]>([
    { title: 'Reserva do AitBnb', url: 'https://www.airbnb.com.br/reserva/123456' },
    { title: 'Regras da Casa', url: 'https://www.airbnb.com.br/reserva/123456'},
    { title: 'Check-in e Check-out', url: 'https://www.airbnb.com.br/reserva/123456'}
  ])

  return (
    <section>
      <h1 className='text-zinc-50 text-xl font-semibold'>Links Importantes</h1>
      <div className='space-y-5 my-5'>
        {links.map((link, index) => (
          <LinkItem key={index} title={link.title} url={link.url} />
        ))}
      </div>
      <Button
        variant='secondary'
        size='full'
      >
        <PlusIcon className='w-5 h-5' />
        <p>Cadastrar novo link</p>
      </Button>
    </section>
  )
}

function LinkItem({ title, url }: { title: string, url: string }) {
  return (
    <li className='w-full flex justify-between items-center gap-16'>
      <div className='flex-1'>
        <h2>{title}</h2>
        <p className='truncate tex text-xs text-zinc-400'>{url}</p>
      </div>
      <Link2Icon className='w-6 h-6 text-zinc-400' />
    </li>
  )
}
