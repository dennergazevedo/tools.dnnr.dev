'use client'

import { User } from 'lucide-react'
import { useFileInput } from './Root'
import { useMemo } from 'react'

export interface ImagePreviewProps {}

export function ImagePreview(props: ImagePreviewProps) {
  const { multiple, files } = useFileInput()

  if (multiple) {
    throw new Error(
      'Cannot use <ImagePreview /> component alongside multiple file upload input.',
    )
  }

  const previewURL = useMemo(() => {
    if (files.length === 0) {
      return null
    }

    return URL.createObjectURL(files[0])
  }, [files])

  if (previewURL === null) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
        <User className="h-8 w-8 text-neutral-400" />
      </div>
    )
  } else {
    return (
      <img
        className="h-16 w-16 rounded-full bg-neutral-800 object-cover"
        src={previewURL}
        alt=""
      />
    )
  }
}
