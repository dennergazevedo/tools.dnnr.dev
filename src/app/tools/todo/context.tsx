'use client'
import { api } from '@/utils/request';
import React, {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from 'react'
import { ToDoItem } from './page';
import { useAuth } from '@/app/auth/context';
import { TodoContextProps, TodoContextProviderProps } from './types';
import { toast } from 'sonner';
import { createUUID } from '@/utils/uuid';

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps)

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
  children,
  todos
}) => {
  const { token } = useAuth();

  const [list, setList] = useState<ToDoItem[]>(todos);
  

  const handleSaveTodo = useCallback(async (item: ToDoItem) => {
    if(token){
      try{
        await api.post('/api/todo/create', {
          ...item,
          token
        })
      }catch(err){
        toast("Oops!", {
          description: "Your task was not saved in the cloud, try again.",
        });
      }
    }
  }, [token])

  // const handleUpdateTodo = useCallback(async (item: ToDoItem) => {
  //   if(token){
  //     try{
  //       await api.post('/api/todo/create', {
  //         ...item,
  //         token
  //       })
  //     }catch(err){
  //       toast("Oops!", {
  //         description: "Your task was not saved in the cloud, try again.",
  //       });
  //     }
  //   }
  // }, [token])

  const handleDeleteTodo = useCallback(async (item: ToDoItem) => {
    if(token){
      try{
        await api.delete('/api/todo/delete', {
          params: {
            id: item.id,
            token
          }
        })
        toast("Success!", {
          description: "Deleted successfully!",
        });
      }catch(err){
        toast("Oops!", {
          description: "Your task was not saved in the cloud, try again.",
        });
      }
    }
  }, [token])

  const handleAddTask = useCallback((inputValue: string) => {
    if(!inputValue) return

    const newItem: ToDoItem = {
      id: createUUID(),
      completed: false,
      description: inputValue,
    }

    handleSaveTodo(newItem)

    const newList: ToDoItem[] = [
      ...list, 
      newItem
    ]
    setList(newList);
    saveLocalTodos(newList);
  }, [list, handleSaveTodo]);

  const handleRemoveTask = useCallback((removedItem: ToDoItem) => {
    const newList = list?.filter(currentItem => currentItem.id !== removedItem.id)
    handleDeleteTodo(removedItem)
    setList(newList)
    saveLocalTodos(newList)
  }, [list, handleDeleteTodo])

  const handleUpdateTask = useCallback((item: ToDoItem) => {
    const newList = list?.filter(currentItem => currentItem.id !== item.id)
    newList.push(item)
    setList(newList)
    saveLocalTodos(newList)
  }, [list])

  const saveLocalTodos = useCallback((newTodos: ToDoItem[]) => {
    localStorage.setItem('@dnnr:todo', JSON.stringify(newTodos))
  }, [])

  return (
    <TodoContext.Provider
      value={{
        saveTodo: handleSaveTodo,
        deleteTodo: handleDeleteTodo,
        addTask: handleAddTask,
        removeTask: handleRemoveTask,
        updateTask: handleUpdateTask,
        saveLocalTodos: saveLocalTodos,
        setList,
        list
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useAuth must be used inside a TodoContext')
  }

  return context
}
