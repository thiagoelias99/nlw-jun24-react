'use client'

import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react'
import { useState } from 'react'

interface CheckItemProps {
  description: string
  time: string
}

export default function CheckItem({ description, time }: CheckItemProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div className='w-full flex justify-start items-center gap-3 bg-zinc-900 text-zinc-100 rounded-xl px-4 h-10'>
      {checked ? (
        <CircleCheckIcon className='w-5 h-5 text-lime-300'
          onClick={() => setChecked(!checked)}
        />
      ) : (
        <CircleDashedIcon className='w-5 h-5 text-zinc-400'
          onClick={() => setChecked(!checked)}
        />
      )}

      <p>{description}</p>
      <p className='ml-auto text-zinc-400 text-sm'>{time}</p>
    </div>
  )
}