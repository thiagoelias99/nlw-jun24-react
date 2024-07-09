import { Button } from '@/components/Button'
import { cn } from '@/utils/cn'
import { CircleCheckIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import CheckItem from './check-item'
import DayActivities from './day-activities'


interface ActivitiesSectionProps {
  className?: ClassNameValue
}

export default function ActivitiesSection({ className }: ActivitiesSectionProps) {
  return (
    <section className={cn('flex-1', className)}>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-3xl font-semibold'>Atividades</h1>
        <Button>
          <PlusIcon className='w-5 h-5' />
          <p>Cadastrar atividade</p>
        </Button>
      </div>

      <div className='w-full mt-4 flex flex-col gap-8'>
        <DayActivities finalized day={17} dayOfWeek='Sábado' />
        <DayActivities finalized day={18} dayOfWeek='Domingo' activities={[
          { description: 'Café da manhã', time: '08:00' },
        ]} />
        <DayActivities finalized day={19} dayOfWeek='Segunda-feira' activities={[
          { description: 'Café da manhã', time: '08:00' },
          { description: 'Almoço', time: '12:00' },
          { description: 'Jantar', time: '18:00' },
        ]} />
        <DayActivities day={20} dayOfWeek='Terça-feira' activities={[
          { description: 'Café da manhã', time: '08:00' },
          { description: 'Almoço', time: '12:00' },
          { description: 'Jantar', time: '18:00' },
        ]} />
        <DayActivities day={21} dayOfWeek='Quarta-feira' activities={[
          { description: 'Café da manhã', time: '08:00' },
          { description: 'Churrasco', time: '12:00' },
          { description: 'Jantar', time: '18:00' },
        ]} />
        <DayActivities day={22} dayOfWeek='Quinta-feira' activities={[
          { description: 'Café da manhã', time: '08:00' },
          { description: 'Almoço', time: '12:00' },
          { description: 'Jantar', time: '18:00' },
        ]} />
        <DayActivities day={23} dayOfWeek='Sexta-feira' />
      </div>
    </section>
  )
}
