import React from "react"
import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KPICards from "./Component/KPICards";

const queryClient = new QueryClient();


function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
    <KPICards></KPICards>
    </QueryClientProvider>
  )
}

export default App
