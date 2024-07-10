'use client'

import { useEffect, useState } from 'react'
import UsersModal from './_components/users-modal'
import ConfirmModal from './_components/confirm-modal'
import Input1 from './_components/input1'
import Input2 from './_components/input2'
import Header from './_components/header'
import Footer from './_components/footer'
import DatePicker from '@/components/date-picker'
import { DateRange } from 'react-day-picker'
import { useImmer } from 'use-immer'
import { api } from '@/utils/api'

export default function Home() {
  const [createTripData, setCreateTripData] = useImmer({
    destination: '',
    starts_at: '',
    ends_at: '',
    emails_to_invite: [
      'thiago@email.com',
      'thiago2@email.com'
    ],
    owner_name: '',
    owner_email: ''
  })


  const [showUserInput, setShowUserInput] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setCreateTripData(draft => {
        draft.starts_at = dateRange.from!.toISOString()
        draft.ends_at = dateRange.to!.toISOString()
      })
    } else {
      setCreateTripData(draft => {
        draft.starts_at = ''
        draft.ends_at = ''
      })
    }
  }, [dateRange])

  function handleCreateTrip() {
    api.post('/trips', createTripData)
  }

  return (
    <main className='flex h-svh flex-col justify-center items-center bg-pattern bg-no-repeat bg-center'>
      <div className='max-w-[720px] mx-auto'>
        <Header />
        <Input1
          destination={createTripData.destination}
          setDestination={destination => setCreateTripData(draft => { draft.destination = destination })}
          setShowUserInput={setShowUserInput}
          setShowDatePicker={setShowDatePicker}
          showUserInput={showUserInput}
          dateRange={dateRange}
        />

        {showUserInput && (
          <Input2
            setShowUserModal={setShowUserModal}
            setShowConfirmModal={setShowConfirmModal}
            users={createTripData.emails_to_invite}
          />
        )}
        <Footer />
      </div>

      {showUserModal && (
        <UsersModal
          setShowUserModal={setShowUserModal}
          setUsers={emails => setCreateTripData(draft => { draft.emails_to_invite = emails })}
          users={createTripData.emails_to_invite}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          setOwnerName={owner_name => setCreateTripData(draft => { draft.owner_name = owner_name })}
          setOwnerEmail={owner_email => setCreateTripData(draft => { draft.owner_email = owner_email })}
          createTrip={handleCreateTrip}
        />
      )}

      {showDatePicker && (
        <DatePicker
          setShowDatePicker={setShowDatePicker}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}
    </main >
  )
}
