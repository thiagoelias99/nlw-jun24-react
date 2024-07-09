'use client'

import { Button } from '@/components/Button'
import { CircleCheckIcon, CircleDashedIcon, UserCogIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function GuestsSection() {
  const [guest, setGuest] = useState<{ name: string, email: string }[]>([
    { name: 'Jessica White', email: 'jessica@email.com' },
    { name: 'Dr Rita', email: 'rita@email.com' },
    { name: 'Dr. John Doe', email: 'jhon@email.com' },
  ])

  return (
    <section>
      <h1 className='text-zinc-50 text-xl font-semibold'>Convidados</h1>
      <div className='space-y-5 my-5'>
        {guest.map((guest, index) => (
          <GuestItem key={index} name={guest.name} email={guest.email} />
        ))}
      </div>
      <Button
        variant='secondary'
        size='full'
      >
        <UserCogIcon className='w-5 h-5' />
        <p>Gerenciar convidados</p>
      </Button>
    </section>
  )
}

function GuestItem({name, email}: {name: string, email: string}) {
  const [checked, setChecked] = useState(false)
  return (
    <div className='w-full flex justify-between items-center'>
      <div>
        <h2 className='text-zinc-100'>{name}</h2>
        <h3 className='text-zinc-400 text-sm'>{email}</h3>
      </div>
      {checked ? (
        <CircleCheckIcon className='w-5 h-5 text-lime-300'
          onClick={() => setChecked(!checked)}
        />
      ) : (
        <CircleDashedIcon className='w-5 h-5 text-zinc-400'
          onClick={() => setChecked(!checked)}
        />
      )}
    </div>
  )
}