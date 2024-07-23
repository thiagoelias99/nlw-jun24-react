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
import { createTripDtoSchema } from '@/models/trip'
import { ZodError } from 'zod'
import { format } from 'date-fns'

export default function Home() {
  const [createTripData, setCreateTripData] = useImmer({
    destination: '',
    starts_at: '',
    ends_at: '',
    emails_to_invite: new Set([
      'thiago@email.com',
      'thiago2@email.com'
    ]),
    owner_name: '',
    owner_email: ''
  })


  const [showUserInput, setShowUserInput] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isLoading, setIsLoading] = useState(false)

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

  async function handleCreateTrip() {
    setIsLoading(true)
    try {
      const normalizedData = createTripDtoSchema.parse({
        ...createTripData,
        ends_at: format(new Date(createTripData.ends_at), 'yyyy-MM-dd'),
        starts_at: format(new Date(createTripData.starts_at), 'yyyy-MM-dd'),
        emails_to_invite: Array.from(createTripData.emails_to_invite)
      })
      const response = await api.post('/trips', normalizedData)

      if (response.status === 200) {
        alert('Viagem criada com sucesso. Verifique seu email para confirmar a viagem')

        window.location.reload()
      }

    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Error parsing data: ', error.flatten().fieldErrors)
      } else {
        console.error('Error parsing data: ', error)
      }
    } finally {
      setIsLoading(false)
    }
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
            users={Array.from(createTripData.emails_to_invite)}
          />
        )}
        <Footer />
      </div>

      {showUserModal && (
        <UsersModal
          setShowUserModal={setShowUserModal}
          setUsers={emails => setCreateTripData(draft => { draft.emails_to_invite = new Set(emails) })}
          users={Array.from(createTripData.emails_to_invite)}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          setOwnerName={owner_name => setCreateTripData(draft => { draft.owner_name = owner_name })}
          setOwnerEmail={owner_email => setCreateTripData(draft => { draft.owner_email = owner_email })}
          createTrip={handleCreateTrip}
          isLoading={isLoading}
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
