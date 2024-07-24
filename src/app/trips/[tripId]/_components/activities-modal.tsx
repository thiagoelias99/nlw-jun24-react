'use client'

import { Button } from '@/components/Button'
import { Modal } from '@/components/modal'
import { IActivity } from '@/models/trip'
import { api } from '@/utils/api'
import { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import { CalendarIcon, Clock12Icon, Link2Icon, TagIcon, Trash2Icon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  tripId: string | undefined
  selectedActivity: IActivity | undefined
}

export default function ActivitiesModal({ onOpenChange, open, selectedActivity, tripId }: Props) {
  const [title, setTitle] = useState<string | undefined>(selectedActivity?.title)
  const [date, setDate] = useState<string | undefined>(selectedActivity?.dateTime.toString())
  const [time, setTime] = useState<string | undefined>(selectedActivity?.dateTime.toString())

  useEffect(() => {
    console.log('selectedActivity: ', selectedActivity)
    
    if (!selectedActivity) {
      return
    }

    setTitle(selectedActivity?.title || '')
    setDate(format(new Date(selectedActivity?.dateTime.toString() || ''), 'yyyy-MM-dd'))
    setTime(format(new Date(selectedActivity?.dateTime.toString() || ''), 'HH:mm'))
  }, [selectedActivity])

  async function handleSubmit() {
    const dateTime = new Date(`${date}T${time}`)

    try {
      let response: AxiosResponse<any, any>

      if (selectedActivity) {
        response = await api.put('/activities', {
          title,
          dateTime,
          tripId,
          activityId: selectedActivity.id
        })
      } else {
        response = await api.post('/activities', {
          title,
          dateTime,
          tripId
        })
      }

      if ((response.status === 201 || response.status === 200) && response.data) {
        alert('Atividade adicionada com sucesso')

        window.location.reload()
      } else {
        alert(`Erro ao adicionar atividade: ${response.statusText}`)
      }

    } catch (error) {
      alert('Erro ao adicionar atividade')
      console.error('Error adding activity: ', error)
    }
  }

  async function handleDelete() {
    try {
      const response = await api.delete('/activities', {
        data: {
          title,
          dateTime: selectedActivity?.dateTime.toString(),
          tripId,
          activityId: selectedActivity?.id
        }
      })

      if (response.status === 200 && response.data) {
        alert('Atividade deletada com sucesso')

        window.location.reload()
      } else {
        alert(`Erro ao deletar atividade: ${response.statusText}`)
      }

    } catch (error) {
      alert('Erro ao deletar atividade')
      console.error('Error deleting activity: ', error)
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className='w-full'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-white'>Cadastrar Atividade</p>
          <div className='flex flex-row-reverse justify-end gap-4'>
            <XIcon
              className='h-5 w-5 text-zinc-400 cursor-pointer'
              onClick={() => onOpenChange(false)}
            />
            {selectedActivity && (
              <Trash2Icon
                onClick={handleDelete}
                className='h-5 w-5 text-red-400 cursor-pointer'
              />
            )}
          </div>
        </div>
        <p className='text-sm text-zinc-400'>Todos os convidados podem visualizar as atividades.</p>
      </div>
      <form className='w-full space-y-2'>
        <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
          <div className='flex flex-1 justify-start items-center gap-2'>
            <TagIcon className='h-5 w-5 text-zinc-400' />
            <input
              name='title'
              onChange={e => setTitle(e.target.value)}
              value={title}
              className='text-zinc-400 bg-transparent placeholder:text-zinc-400 outline-none'
              type="text"
              placeholder="Qual atividade?" />
          </div>
        </div>
        <div className='w-full flex justify-between items-start gap-4'>
          <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
            <div className='flex flex-1 justify-start items-center gap-2'>
              <CalendarIcon className='h-5 w-5 text-zinc-400' />
              <input
                name='date'
                onChange={e => setDate(e.target.value)}
                value={date}
                className='text-zinc-400 bg-transparent placeholder:text-zinc-400 outline-none'
                type="date"
                placeholder="Dia" />
            </div>
          </div>
          <div className='w-full flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-black h-16 rounded-xl shadow-shape'>
            <div className='flex flex-1 justify-start items-center gap-2'>
              <Clock12Icon className='h-5 w-5 text-zinc-400' />
              <input
                name='time'
                onChange={e => setTime(e.target.value)}
                value={time}
                className='text-zinc-400 bg-transparent placeholder:text-zinc-400 outline-none'
                type="time"
                placeholder="Horário" />
            </div>
          </div>
        </div>
        <Button
          type='button'
          onClick={handleSubmit}
          size='full'>Salvar Atividade</Button>
      </form>

    </Modal>
  )
}
