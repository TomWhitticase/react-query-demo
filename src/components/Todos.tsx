import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import apiService from "../apiService";
import {BiCheckboxChecked} from 'react-icons/bi'
import{BiCheckbox} from'react-icons/bi'
import { Todo } from "../types/Todo";

const Todos = () => {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: apiService.fetchTodos
  });


  const { mutate } = useMutation({
    mutationFn: apiService.toggleComplete,
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })

  const toggleComplete = (id: string) => {
    // Optimistically update the cache before making the request.
    queryClient.setQueryData(['todos'], (oldTodos: Todo[]) => {
      return oldTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  
    // Execute the mutation.
    mutate(id);
  };
  

  if(error){
    alert('There was an error :(')
  }

  return (
    <div className="border-black border-2 rounded-md text-2xl">
      <div className="text-xs border-black border-r-2 border-b-2 rounded-br-md px-1 w-min whitespace-nowrap">
        Todos.tsx
      </div>
      {isLoading ? <div className="animate-pulse p-2">
        Loading...
      </div> : <ul className="p-2">{
      data?.map((todoItem)=> (
        <li key={todoItem.id} className='flex items-center justify-between'>
          {todoItem.title}
          <div className='cursor-pointer' onClick={() => toggleComplete(todoItem.id)}>
            {todoItem.completed ? <BiCheckboxChecked size={30}/> : <BiCheckbox size={30}/>}
          </div>
        </li>)
      )} 
      </ul>}
    </div>
  );
};
export default Todos;
