import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CgSpinner } from "react-icons/cg";
import apiService from "../apiService";
import { Todo } from "../types/Todo";

const AddTodo = () => {
  const queryClient = useQueryClient();

  const [todoInput, setTodoInput] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: apiService.addTodo,
    onSuccess: (newTodo) => {
      setTodoInput(''); 
      // Update the cached todos with the new todo
      queryClient.setQueryData(['todos'], (todos: Todo[]) => [...todos, newTodo])
    }
  });

  const handleAddTodo = () => {
    if (todoInput.trim() !== '') {
      mutate(todoInput); 
    }
  };

  return (
    <div className="border-black border-2 rounded-md text-xl">
      <div className="text-xs border-black border-r-2 border-b-2 rounded-br-md px-1 w-min whitespace-nowrap">
        AddTodo.tsx
      </div>
      <div className="p-2 flex items-center gap-2">
        <input 
          type="text" 
          className='border-b-2 flex-1 border-black border-dashed outline-none' 
          onChange={(e) => setTodoInput(e.target.value)} 
          value={todoInput} 
        />
        <button 
          disabled={isPending} 
          onClick={handleAddTodo} 
          className='bg-black rounded text-white text-base w-20 h-8'
        >
          {isPending 
            ? <div className="animate-spin flex items-center justify-center">
                <CgSpinner size={20}/>
              </div> 
            : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
