'use client'

import { FileCheck } from 'lucide-react'
import { useFileInput } from './Root'
import { Fragment, useEffect, useMemo } from 'react'

export interface TriggerSelectedProps {
  reset?: boolean
}

export function TriggerSelected({ reset = false }: TriggerSelectedProps) {
  const { id, files, multiple, onFilesSelected } = useFileInput()

  const fileData = useMemo(() => {
    if(!multiple && files?.length > 0){
      return files[0];
    }
    return {
      name: '',
      size: 0
    }
  }, [files, multiple])

  useEffect(() => {
    if(reset) onFilesSelected([]);
  }, [reset])

  if(!fileData?.name){
    return <Fragment />
  }

  return (
    <label
      htmlFor={id}
      className="group flex w-full flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-200 px-6 py-4 text-center text-zinc-500 group-focus-within:border-emerald-300 group-focus-within:ring-4 group-focus-within:ring-emerald-100 hover:border-emerald-200 hover:bg-emerald-25 hover:text-emerald-500 dark:border-zinc-800 dark:text-zinc-400 dark:group-focus-within:border-emerald-500 dark:group-focus-within:ring-emerald-500/10 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-emerald-300"
    >
      <span className="relative rounded-full border-6 border-zinc-50 bg-zinc-100 p-2 group-hover:border-emerald-50 group-hover:bg-emerald-100 dark:border-zinc-700 dark:bg-zinc-800 dark:group-hover:border-zinc-600 dark:group-hover:bg-zinc-700">
        <FileCheck className="h-5 w-5 dark:text-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-semibold text-emerald-500 dark:text-emerald-500">
            {fileData.name}
          </span>{' '}
          ({fileData.size} bytes)
        </span>
      </div>
    </label>
  )
}
