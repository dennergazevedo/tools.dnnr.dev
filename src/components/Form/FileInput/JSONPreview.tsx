'use client'

import { useFileInput } from './Root'
import { Dispatch, SetStateAction, useEffect } from 'react'

export interface JSONPreviewProps {
  sendData: Dispatch<SetStateAction<string>>
}

export function JSONPreview({ sendData }: JSONPreviewProps) {
  const { multiple, files } = useFileInput()

  if (multiple) {
    throw new Error(
      'Cannot use <JSONPreview /> component alongside multiple file upload input.',
    )
  }

  useEffect(() => {
    if (files.length === 0) {
      sendData('')
      return
    }

    const file = files[0]
    
    if (file.type !== 'application/json' && file.type !== 'text/csv') {
      console.error('Selected file is not a JSON file.')
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const result = event.target?.result
        if (typeof result === 'string') {
          sendData(result)
        }
      } catch (error) {
        console.error('Failed to parse JSON:', error)
      }
    }

    reader.readAsText(file)

  }, [files])

  return <></>
}
