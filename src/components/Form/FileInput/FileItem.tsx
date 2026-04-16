import { Button } from '@/components/ui/button'
import { CheckCircle2, Image as ImageIcon, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const fileItem = tv({
  slots: {
    base: 'group flex items-start gap-4 rounded-lg border border-neutral-700 p-4',
    icon: 'relative rounded-full border-4 border-neutral-700 bg-neutral-800 p-2 text-neutral-500',
    deleteButton: 'text-neutral-500 hover:text-amber-500',
  },
  variants: {
    state: {
      progress: {
        base: 'border-neutral-700',
      },
      complete: {
        base: 'border-amber-500/30',
      },
      error: {
        base: 'bg-error-500/5 border-error-500/30',
        icon: 'border-error-500/30 bg-error-500/5 text-error-400',
        deleteButton: 'text-error-400 hover:text-error-300',
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
            <span className="text-sm font-medium text-error-400">
              Upload failed, please try again
            </span>
            <span className="text-sm text-error-500">
              {name}
            </span>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-error-400 hover:text-error-300"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col leading-relaxed">
            <span className="text-sm font-medium text-neutral-100">
              {name}
            </span>
            <span className="text-sm text-neutral-400">
              {fileSize}
            </span>
          </div>

          <div className="flex w-full items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-neutral-700">
              <div
                className="h-2 rounded-full bg-amber-500"
                style={{ width: uploadProgress }}
              />
            </div>
            <span className="text-sm font-medium text-neutral-300">
              {uploadProgress}
            </span>
          </div>
        </div>
      )}

      {state === 'complete' ? (
        <CheckCircle2 className="h-5 w-5 fill-amber-500 text-neutral-950" />
      ) : (
        <Button type="button" variant="ghost" className={deleteButton()}>
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
