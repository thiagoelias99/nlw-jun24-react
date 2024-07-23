'use client'

import { Button } from '@/components/Button'
import { ITripGuests } from '@/models/trip'
import { CircleCheckIcon, CircleDashedIcon, UserCogIcon } from 'lucide-react'
import React from 'react'

interface Props {
  guests: ITripGuests[]
}

export default function GuestsSection({ guests }: Props) {
  return (
    <section>
      <h1 className='text-zinc-50 text-xl font-semibold'>Convidados</h1>
      <div className='space-y-5 my-5'>
        {guests.map((guest, index) => (
          <GuestItem
            key={index}
            {...guest}
          />
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

function GuestItem({ name, email, is_confirmed }: { name: string, email: string, is_confirmed: boolean }) {

  return (
    <div className='w-full flex justify-between items-center'>
      <div>
        <h2 className='text-zinc-100'>{name}</h2>
        <h3 className='text-zinc-400 text-sm'>{email}</h3>
      </div>
      {is_confirmed ? (
        <CircleCheckIcon className='w-5 h-5 text-lime-300'
        />
      ) : (
        <CircleDashedIcon className='w-5 h-5 text-zinc-400'
        />
      )}
    </div>
  )
}