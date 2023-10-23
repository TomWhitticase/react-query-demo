import React from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className='w-full flex mt-8 justify-center'>
    <div className="border-black border-2 rounded-md text-2xl w-[500px]">
      <div className="text-xs border-black border-r-2 border-b-2 rounded-br-md px-1 w-min whitespace-nowrap">
        App.tsx
      </div>
      <div className="p-2">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <div className="border-red-500 border-2 rounded-md text-2xl">
            <div className="text-xs text-red-500 border-red-500 border-r-2 border-b-2 rounded-br-md px-1 w-min whitespace-nowrap">
              QueryClientProvider
            </div>
            <div className=" flex flex-col gap-4 p-6">
              <Header />
              <Todos />
              <AddTodo />
            </div>
          </div>
        </QueryClientProvider>
      </div>
    </div>
    </div>
  );
}
