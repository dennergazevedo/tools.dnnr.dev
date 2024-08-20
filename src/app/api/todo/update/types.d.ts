interface TodoCreate{
  description: string
  completed: boolean
  token: string
}

interface TodoCreateResponse{
  id: string
  description: string
  completed: boolean
}