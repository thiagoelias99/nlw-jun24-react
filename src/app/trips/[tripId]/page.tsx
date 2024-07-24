import Divider from '@/components/Divider'
import ActivitiesSection from './_components/activities-section'
import LinksSection from './_components/links-section'
import GuestsSection from './_components/guest-section'
import { redirect } from 'next/navigation'
import { api } from '@/utils/api'
import { Trip } from '@/models/trip'

interface Props {
  params: {
    tripId: string
  }
}

export default async function DetailsPage({ params }: Props) {
  if (!params.tripId) {
    redirect('/')
  }

  const data = await api.get<Trip>(`/trips?tripId=${params.tripId}`)
  // console.log(data.data)

  return (
    <main className='max-w-[1100px] px-8 m-auto flex flex-col justify-center items-center'>
      <div className='w-full mt-8 flex justify-start items-start gap-8'>
        <ActivitiesSection
          activities={data.data.activities}
          className='flex-1'
          tripId={params.tripId}
        />
        <div className='w-1/3 space-y-6'>
          <LinksSection tripId={params.tripId} links={data.data.links} />
          <Divider />
          <GuestsSection guests={data.data.guests} />
        </div>
      </div>
    </main>
  )
}
