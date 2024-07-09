import Divider from '@/components/Divider'
import Input3 from './_components/input3'
import ActivitiesSection from './_components/activities-section'
import LinksSection from './_components/links-section'
import GuestsSection from './_components/guest-section'

export default function DetailsPage() {
  return (
    <main className='max-w-[1100px] px-8 m-auto flex flex-col justify-center items-center'>
      <Input3 />
      <div className='w-full mt-8 flex justify-start items-start gap-8'>
        <ActivitiesSection className='flex-1' />
        <div className='w-1/3'>
          <LinksSection />
          <Divider />
          <GuestsSection />
        </div>
      </div>
    </main>
  )
}
