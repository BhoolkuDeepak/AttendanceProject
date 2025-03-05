import { createContext, useContext, useState } from "react";

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const [fetchTrigger, setFetchTrigger] = useState(null);

  return (
    <FetchContext.Provider value={{ fetchTrigger, setFetchTrigger }}>
      {children}
    </FetchContext.Provider>
  );
}

export function useFetchTrigger() {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetchTrigger must be used within a FetchProvider");
  }
  return context;
}
