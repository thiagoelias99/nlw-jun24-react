'use client'

import { ArrowRightIcon, AtSignIcon, CalendarIcon, MailIcon, MapPinIcon, PlusIcon, Settings2Icon, UserIcon, UserRoundPlus, X, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
        <div className='w-full flex items-center justify-center'>
          <Image src='/logo.png' alt='plann.er logo' width={170} height={44} />
        </div>
        <p className='text-zinc-300 text-lg w-full text-center mt-2'>Convide seus amigos e planeje sua próxima viagem!</p>




        <div className='w-[720px] mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
          <div className='flex flex-1 justify-start items-center gap-2'>
            <MapPinIcon className='h-5 w-5 text-zinc-400' />
            <input
              disabled={showUserInput}
              className='bg-transparent placeholder:text-zinc-400 outline-none' type="text" placeholder="Para onde você vai?" />
          </div>
          <div className='flex justify-end items-center'>
            <div className='w-28 flex justify-end items-center gap-2'>
              <CalendarIcon className='min-h-5 min-w-5 text-zinc-400' />
              <input
                disabled={showUserInput}
                className='bg-transparent placeholder:text-zinc-400' type="text" placeholder='Quando ?' />
            </div>
            <div className='text-zinc-800 h-full'>|</div>
          </div>



          {showUserInput ?
            (<button
              className='bg-zinc-800 hover:bg-zinc-700 h-9 text-zinc-200 rounded-lg flex items-center justify-center gap-2 px-5 py-2'
              onClick={() => setShowUserInput(false)}
            >
              <p>Alterar local/data</p>
              <Settings2Icon className='h-5 w-5' />
            </button>) :
            (<button
              className='bg-lime-300 hover:bg-lime-400 h-9 text-lime-950 rounded-lg flex items-center justify-center gap-2 px-5 py-2'
              onClick={() => setShowUserInput(true)}
            >
              <p>Continuar</p>
              <ArrowRightIcon className='h-5 w-5' />
            </button>)}
        </div>



        {showUserInput && (
          <div className='w-[720px] mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
            <button
              onClick={() => setShowUserModal(true)}
              className='flex flex-1 justify-start items-center gap-2'>
              <UserRoundPlus className='h-5 w-5 text-zinc-400' />
              <span className='bg-transparent text-zinc-400 outline-none'>{users.length === 0 ? 'Quem estará na viagem?' : `${users.length} pessoa(s) convidada(s)`}</span>
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className='bg-lime-300 hover:bg-lime-400 h-9 text-lime-950 rounded-lg flex items-center justify-center gap-2 px-5 py-2'>
              <p>Confirmar viagem</p>
              <ArrowRightIcon className='h-5 w-5' />
            </button>
          </div>
        )}



        <p className='w-full text-center text-zinc-500 text-sm mt-5'>Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <span className='text-zinc-300 underline'>termos de uso</span> e <span className='text-zinc-300 underline'>políticas de privacidade</span>.</p>
      </div>


      {showUserModal && (
        <div className='inset-0 fixed bg-black w-full h-full bg-opacity-60 flex items-center justify-center'>
          <div className='w-[640px] bg-zinc-900 flex flex-col justify-start items-start gap-5 px-6 py-5 rounded-xl'>
            <div className='w-full'>
              <div className='w-full flex justify-between items-center'>
                <p className='text-lg text-white'>Selecionar convidados</p>
                <XIcon
                  className='h-5 w-5 text-zinc-400 cursor-pointer'
                  onClick={() => setShowUserModal(false)}
                />
              </div>
              <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

            <div className='w-full flex justify-start items-center flex-wrap gap-2'>
              {users.map((user, index) => (
                <div key={index} className='bg-zinc-800 text-zinc-300 flex px-2.5 py-1.5 justify-start items-center gap-2.5 rounded-md'>
                  <p>{user}</p>
                  <XIcon
                    className='h-4 w-4 text-zinc-400 cursor-pointer'
                    onClick={() => setUsers(users.filter(u => u !== user))}
                  />
                </div>
              ))}
            </div>

            <div className='w-full h-0.5 bg-zinc-800'></div>
            <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const userEmail = e.target.userEmail.value
                  if (userEmail) {
                    setUsers([...users, userEmail])
                    e.target.userEmail.value = ''
                  }
                }}
                className='contents'>
                <div className='flex flex-1 justify-start items-center gap-2'>
                  <AtSignIcon className='h-5 w-5 text-zinc-400' />
                  <input
                    name='userEmail'
                    className='bg-transparent placeholder:text-zinc-400 outline-none'
                    type="text"
                    placeholder="Digite o email do convidado" />
                </div>
                <button
                  type='submit'
                  className='bg-lime-300 hover:bg-lime-400 h-9 text-lime-950 rounded-lg flex items-center justify-center gap-2 px-5 py-2'>
                  <p>Convidar</p>
                  <PlusIcon className='h-5 w-5' />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className='inset-0 fixed bg-black w-full h-full bg-opacity-60 flex items-center justify-center'>
          <div className='w-[640px] bg-zinc-900 flex flex-col justify-start items-start gap-5 px-6 py-5 rounded-xl'>
            <div className='w-full'>
              <div className='w-full flex justify-between items-center'>
                <p className='text-lg text-white'>Confirmar criação da viagem</p>
                <XIcon
                  className='h-5 w-5 text-zinc-400 cursor-pointer'
                  onClick={() => setShowConfirmModal(false)}
                />
              </div>
              <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <strong className='text-zinc-100'>Florianópolis, Brasil</strong> nas datas de <strong className='text-zinc-100'>16 a 27 de Agosto de 2024</strong> preencha seus dados abaixo:</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const userEmail = e.target.userEmail.value
                if (userEmail) {
                  setUsers([...users, userEmail])
                  e.target.userEmail.value = ''
                }
              }}
              className='w-full flex flex-col justify-start items-start gap-2'>
              <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
                <div className='flex flex-1 justify-start items-center gap-2'>
                  <UserIcon className='h-5 w-5 text-zinc-400' />
                  <input
                    name='name'
                    className='bg-transparent placeholder:text-zinc-400 outline-none'
                    type="text"
                    placeholder="Seu nome completo" />
                </div>
              </div>
              <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
                <div className='flex flex-1 justify-start items-center gap-2'>
                  <MailIcon className='h-5 w-5 text-zinc-400' />
                  <input
                    name='email'
                    className='bg-transparent placeholder:text-zinc-400 outline-none'
                    type="text"
                    placeholder="Seu e-mail pessoal" />
                </div>
              </div>
              <button
                type='submit'
                className='bg-lime-300 w-full hover:bg-lime-400 h-9 text-lime-950 rounded-lg flex items-center justify-center gap-2 px-5 py-2'>
                <p>Confirmar criação da viagem</p>
              </button>
            </form>
          </div>
        </div>
      )
      }
    </main >
  )
}
