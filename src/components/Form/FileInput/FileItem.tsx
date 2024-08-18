import { Button } from '@/components/Button'
import { CheckCircle2, Image as ImageIcon, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const fileItem = tv({
  slots: {
    base: 'group flex items-start gap-4 rounded-lg border border-zinc-200 p-4',
    icon: 'relative rounded-full border-4 border-sky-100 bg-sky-200 p-2 text-sky-600 border-zinc-700 bg-zinc-800 text-zinc-500',
    deleteButton: 'text-zinc-500 hover:text-sky-500',
  },
  variants: {
    state: {
      progress: {
        base: 'border-zinc-700',
      },
      complete: {
        base: 'border-sky-500 border-sky-300/20',
      },
      error: {
        base: 'bg-error-25 border-error-300 bg-error-500/5 border-error-500/30',
        icon: 'border-error-50 bg-error-100 text-error-600 bg-error-500/5 border-error-500/30 text-error-400',
        deleteButton:
          'text-error-700 hover:text-error-900 text-error-400 hover:text-error-300',
      },
    },
  },
  defaultVariants: {
    state: 'progress',
  },
})

export interface FileItemProps extends VariantProps<typeof fileItem> {
  name: string
  size: number
  type: string
}

export function FileItem({ state, name, size, type }: FileItemProps) {
  const uploadProgress = state === 'complete' ? '100%' : '25%'

  const fileSize = useMemo(() => {
    const fileSizeInKB = size / 1024

    if (fileSizeInKB > 1024) {
      const fileSizeInMB = fileSizeInKB / 1024

      return fileSizeInMB.toFixed(1).concat(' MB')
    }

    return fileSizeInKB.toFixed(1).concat(' KB')
  }, [size])

  const { base, icon, deleteButton } = fileItem({ state })

  return (
    <div className={base()}>
      <span className={icon()}>
        <ImageIcon className="h-4 w-4" />
      </span>

      {state === 'error' ? (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col leading-relaxed">
            <span className="text-sm font-medium text-error-700 text-error-400">
              Upload failed, please try again
            </span>
            <span className="text-sm text-error-600 text-error-500">
              {name}
            </span>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-error-700 hover:text-error-900 text-error-400 hover:text-error-300"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col leading-relaxed">
            <span className="text-sm font-medium text-zinc-700 text-zinc-100">
              {name}
            </span>
            <span className="text-sm text-zinc-500 text-zinc-400">
              {fileSize}
            </span>
          </div>

          <div className="flex w-full items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-zinc-100 bg-zinc-600">
              <div
                className="h-2 rounded-full bg-sky-600 bg-sky-400"
                style={{ width: uploadProgress }}
              />
            </div>
            <span className="text-sm font-medium text-zinc-700 text-zinc-300">
              {uploadProgress}
            </span>
          </div>
        </div>
      )}

      {state === 'complete' ? (
        <CheckCircle2 className="h-5 w-5 fill-sky-600 text-white fill-sky-300 text-zinc-900" />
      ) : (
        <Button type="button" variant="ghost" className={deleteButton()}>
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
