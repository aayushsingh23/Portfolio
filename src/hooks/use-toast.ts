import { toast } from "sonner"

type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: any
  variant?: "default" | "destructive"
}

const listeners: Array<(toast: ToasterToast) => void> = []

let memoryState: {
  toasts: ToasterToast[]
} = {
  toasts: [],
}

export const useToast = () => {
  return {
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      toast(props.title as string, {
        description: props.description as string,
      })
      return { id }
    },
    dismiss: (toastId?: string) => {
      toast.dismiss(toastId)
    },
    toasts: memoryState.toasts,
  }
}
