'use client'

import { UploadCloud } from 'lucide-react'
import { useFileInput } from './Root'
import { Fragment } from 'react'

export interface TriggerProps {
  type: string
}

export function Trigger(props: TriggerProps) {
  const { id, files } = useFileInput()

  if(files?.length){
    return <Fragment />
  }

  return (
    <label
      htmlFor={id}
      className="group flex w-full flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border px-6 py-4 text-center group-focus-within:ring-4 group-focus-within:ring-sky-100 hover:bg-sky-25 border-zinc-800 text-zinc-400 group-focus-within:border-sky-500 group-focus-within:ring-sky-500/10 hover:border-zinc-700 hover:bg-zinc-800 hover:text-sky-300"
    >
      <span className="relative rounded-full border-6 p-2 border-zinc-700 bg-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-700">
        <UploadCloud className="h-5 w-5 text-zinc-600 group-hover:text-sky-600" />
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-semibold text-sky-300">
            Click to upload
          </span>{' '}
          or drag and drop
        </span>

        <span className="text-xs">{props.type}</span>
      </div>
    </label>
  )
}
