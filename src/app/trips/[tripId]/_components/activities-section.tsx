'use client'

import { Button } from '@/components/Button'
import { cn } from '@/utils/cn'
import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import DayActivities from './day-activities'
import { IActivity } from '@/models/trip'
import ActivitiesModal from './activities-modal'
import { format, getDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'


interface ActivitiesSectionProps {
  activities: IActivity[]
  tripId: string | undefined
  className?: ClassNameValue
}

export default function ActivitiesSection({ className, activities, tripId }: ActivitiesSectionProps) {
  const [open, setOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>()
  const [activitiesMap, setActivitiesMap] = useState(new Map<string, IActivity[]>())

  useEffect(() => {
    const map = new Map<string, IActivity[]>()

    // Sort activities by date
    activities.sort((a, b) => {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    })

    activities.forEach((activity) => {
      const date = new Date(activity.dateTime)
      const dateKey = format(date, 'yyyy-MM-dd')

      if (map.has(dateKey)) {
        const activities = map.get(dateKey)
        activities?.push(activity)
        map.set(dateKey, activities)
      } else {
        map.set(dateKey, [activity])
      }
    })

    setActivitiesMap(map)
  }, [activities])

  return (
    <section className={cn('flex-1', className)}>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-3xl font-semibold'>Atividades</h1>
        <Button
          onClick={() => {
            setSelectedActivity(undefined)
            setOpen(true)
          }}
        >
          <PlusIcon className='w-5 h-5' />
          <p>Cadastrar atividade</p>
        </Button>
      </div>

      <div className='w-full mt-4 flex flex-col gap-8'>
        {Array.from(activitiesMap.keys()).map((dateKey) => {
          const activities = activitiesMap.get(dateKey)

          return (
            <DayActivities
              key={dateKey}
              activities={activities || []}
              day={getDate(new Date(dateKey))}
              dayOfWeek={format(new Date(dateKey), 'EEEE', { locale: ptBR })}
              onActivityClick={(activity) => {
                setSelectedActivity(activity)
                setOpen(true)
              }}
            />
          )
        }
        )}

      </div>
      <ActivitiesModal
        open={open}
        onOpenChange={setOpen}
        selectedActivity={selectedActivity}
        tripId={tripId}
      />
    </section>
  )
}
