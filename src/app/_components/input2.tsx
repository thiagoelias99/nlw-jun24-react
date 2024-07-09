import { Button } from '@/components/Button'
import { UserRoundPlus, ArrowRightIcon } from 'lucide-react'
import React from 'react'

interface Input2Props {
  setShowUserModal: (show: boolean) => void
  setShowConfirmModal: (show: boolean) => void
  users: string[]
}

export default function Input2({ setShowConfirmModal, setShowUserModal, users }: Input2Props) {
  return (
    <div className='w-[720px] mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
      <button
        onClick={() => setShowUserModal(true)}
        className='flex flex-1 justify-start items-center gap-2'>
        <UserRoundPlus className='h-5 w-5 text-zinc-400' />
        <span className='bg-transparent text-zinc-400 outline-none'>{users.length === 0 ? 'Quem estará na viagem?' : `${users.length} pessoa(s) convidada(s)`}</span>
      </button>
      <Button
        onClick={() => setShowConfirmModal(true)}
      >
        <p>Confirmar viagem</p>
        <ArrowRightIcon className='h-5 w-5' />
      </Button>
    </div>
  )
}
