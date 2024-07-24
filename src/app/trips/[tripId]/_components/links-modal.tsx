'use client'

import { Button } from '@/components/Button'
import { Modal } from '@/components/modal'
import { ITripLinks } from '@/models/trip'
import { api } from '@/utils/api'
import { AxiosResponse } from 'axios'
import { DeleteIcon, Link2Icon, TagIcon, Trash2Icon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  tripId?: string
  selectedLink: ITripLinks | undefined
}

export default function LinksModal({ onOpenChange, open, tripId, selectedLink }: Props) {
  const [title, setTitle] = useState<string | undefined>(selectedLink?.title)
  const [url, setUrl] = useState<string | undefined>(selectedLink?.url)
  const linkId = selectedLink?.id

  useEffect(() => {
    setTitle(selectedLink?.title || '')
    setUrl(selectedLink?.url || '')
  }, [selectedLink])

  async function handleSubmit() {
    try {
      let response: AxiosResponse<any, any>

      if (linkId) {
        response = await api.put('/links', {
          title,
          url,
          tripId,
          linkId
        })
      } else {
        response = await api.post('/links', {
          title,
          url,
          tripId
        })
      }

      if ((response.status === 201 || response.status === 200) && response.data) {
        alert('Link adicionado com sucesso')

        window.location.reload()
      } else {
        alert(`Erro ao adicionar link: ${response.statusText}`)
      }

    } catch (error) {
      alert('Erro ao adicionar link')
      console.error('Error adding link: ', error)
    }
  }

  async function handleDelete() {
    try {
      const response = await api.delete('/links', {
        data: {
          title,
          url,
          tripId,
          linkId
        }
      })

      if (response.status === 200 && response.data) {
        alert('Link deletado com sucesso')

        window.location.reload()
      } else {
        alert(`Erro ao deletar link: ${response.statusText}`)
      }

    } catch (error) {
      alert('Erro ao deletar link')
      console.error('Error deleting link: ', error)
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className='w-full'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-white'>Cadastrar Link</p>
          <div className='flex flex-row-reverse justify-end gap-4'>
            <XIcon
              className='h-5 w-5 text-zinc-400 cursor-pointer'
              onClick={() => onOpenChange(false)}
            />
            {linkId && (
              <Trash2Icon
                onClick={handleDelete}
                className='h-5 w-5 text-red-400 cursor-pointer'
              />
            )}
          </div>
        </div>
        <p className='text-sm text-zinc-400'>Todos os convidados podem visualizar links importantes.</p>
      </div>
      <form className='w-full space-y-2'>
        <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
          <div className='flex flex-1 justify-start items-center gap-2'>
            <TagIcon className='h-5 w-5 text-zinc-400' />
            <input
              name='name'
              onChange={e => setTitle(e.target.value)}
              value={title}
              className='text-zinc-400 bg-transparent placeholder:text-zinc-400 outline-none'
              type="title"
              placeholder="Título do link" />
          </div>
        </div>
        <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
          <div className='flex flex-1 justify-start items-center gap-2'>
            <Link2Icon className='h-5 w-5 text-zinc-400' />
            <input
              name='name'
              onChange={e => setUrl(e.target.value)}
              value={url}
              className='text-zinc-400 bg-transparent placeholder:text-zinc-400 outline-none'
              type="text"
              placeholder="URL" />
          </div>
        </div>
        <Button onClick={handleSubmit} size='full'>Salvar Link</Button>
      </form>

    </Modal>
  )
}
