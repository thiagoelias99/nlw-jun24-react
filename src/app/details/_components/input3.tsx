import { Button } from '@/components/Button'
import { MapPinIcon, CalendarIcon, Settings2Icon, ArrowRightIcon } from 'lucide-react'
import React from 'react'

interface Input1Props {

}

export default function Input3({ }: Input1Props) {
  return (
    <div className='w-full mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
      <div className='flex flex-1 justify-start items-center gap-2'>
        <MapPinIcon className='h-5 w-5 text-zinc-400' />
        <input
          className='bg-transparent placeholder:text-zinc-400 outline-none' type="text" placeholder="Para onde você vai?" />
      </div>
      <div className='flex justify-end items-center'>
        <div className='w-28 flex justify-end items-center gap-2'>
          <CalendarIcon className='min-h-5 min-w-5 text-zinc-400' />
          <input
            className='bg-transparent placeholder:text-zinc-400' type="text" placeholder='Quando ?' />
        </div>
        <div className='text-zinc-800 h-full'>|</div>
      </div>

      <Button
        variant='secondary'
      >
        <p>Alterar local/data</p>
        <Settings2Icon className='h-5 w-5' />
      </Button>
    </div>
  )
}
