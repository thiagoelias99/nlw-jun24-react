'use client'

import { XIcon } from 'lucide-react'
import { DateRange, DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'

interface DatePickerProps {
  setShowDatePicker: (show: boolean) => void
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange | undefined) => void
}

export default function DatePicker({ setShowDatePicker, dateRange, setDateRange }: DatePickerProps) {
  return (
    <div className='inset-0 fixed bg-black w-full h-full bg-opacity-60 flex items-center justify-center'>
      <div className='bg-zinc-900 flex flex-col justify-start items-start gap-5 px-6 py-5 rounded-xl'>
        <div className='w-full'>
          <div className='w-full flex justify-between items-center'>
            <p className='text-lg text-white'>Selecione as Datas</p>
            <XIcon
              className='h-5 w-5 text-zinc-400 cursor-pointer'
              onClick={() => setShowDatePicker(false)}
            />
          </div>
        </div>
        <DayPicker
          locale={ptBR}
          mode='range'
          selected={dateRange}
          onSelect={setDateRange}
        />
      </div>
    </div>
  )
}
