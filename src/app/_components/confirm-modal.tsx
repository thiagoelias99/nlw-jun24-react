import { Button } from '@/components/Button'
import { XIcon, UserIcon, MailIcon } from 'lucide-react'
import React from 'react'

interface ConfirmModalProps {
  setShowConfirmModal: (show: boolean) => void
}

export default function ConfirmModal({ setShowConfirmModal }: ConfirmModalProps) {
  return (
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
          <Button
            type='submit'
            size='full'
          >
            <p>Confirmar criação da viagem</p>
          </Button>
        </form>
      </div>
    </div>
  )
}
