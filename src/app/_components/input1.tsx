import { Button } from '@/components/Button'
import { format } from 'date-fns'
import { MapPinIcon, CalendarIcon, Settings2Icon, ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { DateRange } from 'react-day-picker'
import {ptBR} from 'date-fns/locale'

interface Input1Props {
  showUserInput: boolean
  setShowDatePicker: (show: boolean) => void
  setShowUserInput: (show: boolean) => void
  dateRange: DateRange | undefined
  destination: string
  setDestination: (destination: string) => void
}

export default function Input1({ setShowUserInput, showUserInput, setShowDatePicker, dateRange, destination, setDestination }: Input1Props) {
  return (
    <div className='w-[720px] mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
      <div className='flex flex-1 justify-start items-center gap-2'>
        <MapPinIcon className='h-5 w-5 text-zinc-400' />
        <input
          disabled={showUserInput}
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className='bg-transparent placeholder:text-zinc-400 outline-none' type="text" placeholder="Para onde você vai?" />
      </div>
      <div className='flex justify-end items-center'>
        <button
          onClick={e => setShowDatePicker(true)}
          className='w-60 flex justify-end items-center gap-2'
        >
          <CalendarIcon className='min-h-5 min-w-5 text-zinc-400' />
          <span className='text-zinc-400'>{dateRange?.from && dateRange.to ? `${format(dateRange.from, 'd')} à ${format(dateRange.to, 'd\' de \'MMMM', { locale: ptBR })}` : 'Quando ?'}</span>
        </button>
        <div className='text-zinc-800 h-full'>|</div>
      </div>

      {showUserInput ?
        (<Button
          variant='secondary'
          onClick={() => setShowUserInput(false)}
        >
          <p>Alterar local/data</p>
          <Settings2Icon className='h-5 w-5' />
        </Button>) :
        (<Button
          onClick={() => setShowUserInput(true)}
        >
          <p>Continuar</p>
          <ArrowRightIcon className='h-5 w-5' />
        </Button>)}
    </div>
  )
}
