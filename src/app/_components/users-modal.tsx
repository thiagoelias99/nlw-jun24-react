import { Button } from '@/components/Button'
import { XIcon, AtSignIcon, PlusIcon } from 'lucide-react'

interface UsersModalProps {
  setShowUserModal: (show: boolean) => void
  users: string[]
  setUsers: (users: string[]) => void
}

export default function UsersModal({ setShowUserModal, setUsers, users }: UsersModalProps) {
  return (
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
            <Button
              type='submit'
            >
              <p>Convidar</p>
              <PlusIcon className='h-5 w-5' />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
