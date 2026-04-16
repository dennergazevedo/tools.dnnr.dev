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
      className="group flex w-full flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border px-6 py-4 text-center border-neutral-800 text-neutral-400 group-focus-within:border-amber-500 group-focus-within:ring-4 group-focus-within:ring-amber-500/10 hover:border-neutral-700 hover:bg-neutral-800 hover:text-amber-300"
    >
      <span className="relative rounded-full border-6 p-2 border-neutral-700 bg-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-700">
        <UploadCloud className="h-5 w-5 text-neutral-600 group-hover:text-amber-500" />
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-semibold text-amber-400">
            Click to upload
          </span>{' '}
          or drag and drop
        </span>

        <span className="text-xs">{props.type}</span>
      </div>
    </label>
  )
}
