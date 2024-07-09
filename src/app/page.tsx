'use client'

import { useState } from 'react'
import UsersModal from './_components/users-modal'
import ConfirmModal from './_components/confirm-modal'
import Input1 from './_components/input1'
import Input2 from './_components/input2'
import Header from './_components/header'
import Footer from './_components/footer'

export default function Home() {
  const [showUserInput, setShowUserInput] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [users, setUsers] = useState<string[]>([
    'thiago@email.com',
    'thiago2@email.com'
  ])

  return (
    <main className='flex h-svh flex-col justify-center items-center bg-pattern bg-no-repeat bg-center'>
      <div className='max-w-[720px] mx-auto'>
        <Header />
        <Input1
          setShowUserInput={setShowUserInput}
          showUserInput={showUserInput}
        />

        {showUserInput && (
          <Input2
            setShowUserModal={setShowUserModal}
            setShowConfirmModal={setShowConfirmModal}
            users={users}
          />
        )}
        <Footer />
      </div>

      {showUserModal && (
        <UsersModal
          setShowUserModal={setShowUserModal}
          setUsers={setUsers}
          users={users}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </main >
  )
}
