import CheckItem from './check-item'

interface DayActivitiesProps {
  day: number
  dayOfWeek: string
  activities?: { description: string, time: string }[]
  finalized?: boolean
}

export default function DayActivities({ day, dayOfWeek, activities = [], finalized = false }: DayActivitiesProps) {
  return (
    <div className={`w-full flex flex-col gap-2 ${finalized ? 'opacity-30' : ''}`}>
      <div className='flex justify-start items-end gap-2'>
        <h2 className='text-xl font-semibold'>{`Dia ${day}`}</h2>
        <p className='text-xs text-zinc-500'>{dayOfWeek}</p>
      </div>
      <div className='w-full space-y-2'>
        {activities.length === 0 ? (
          <p className='text-sm text-zinc-100'>Nenhuma atividade cadastrada nessa data.</p>
        ) : (
          activities.map((activity, index) => (
            <CheckItem key={index} description={activity.description} time={activity.time} />
          ))
        )}
      </div>
    </div>
  )
}
