import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from 'react-icons/cg';
import apiService from "../apiService";
import { Todo } from "../types/Todo";

const Header = () => {
  const queryClient = useQueryClient();
  
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: apiService.fetchTodos
  });

  const { mutate: clearAllTodos, isPending: clearAllIsPending } = useMutation({
    mutationFn: apiService.clearTodos,
    onSuccess: () => queryClient.setQueryData(['todos'], [])
  });

  const { mutate: clearCompletedTodos, isPending: clearCompletedIsPending } = useMutation({
    mutationFn: apiService.clearCompletedTodos,
    onSuccess: () => queryClient.setQueryData(['todos'], (todos: Todo[]) => todos.filter((todo:Todo) => !todo.completed ))
  });

  return (
    <div className="border-black border-2 rounded-md text-2xl">
      <div className="text-xs border-black border-r-2 border-b-2 rounded-br-md px-1 w-min whitespace-nowrap">
        Header.tsx
      </div>
      <div className="p-2 flex gap-2 items-center">
        <div className='flex-1 text-sm'>
          {data 
            ? `You have ${data.length} Todos` 
            : (<div className="animate-pulse">Loading...</div>)
          }
        </div>
        <button onClick={() => clearAllTodos()} className='bg-black rounded text-white text-base w-20 h-8'>
          {clearAllIsPending 
            ? <div className="animate-spin flex items-center justify-center"><CgSpinner size={20}/></div>
            : 'Clear All' 
          }
        </button>
        <button onClick={() => clearCompletedTodos()} className='bg-black rounded text-white text-base w-36 h-8'>
          {clearCompletedIsPending 
            ? <div className="animate-spin flex items-center justify-center"><CgSpinner size={20}/></div>
            : 'Clear Completed'
          }
        </button>
      </div>
    </div>
  );
};

export default Header;
