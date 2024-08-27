'use client';
import { createContext, useContext, useState } from 'react';

export const PathContext = createContext();

export function PathProvider() {
  const [path, setPath] = useState();

  return (
    <PathContext.Provider value={[ path, setPath ]}>
      <PathPanel />
    </PathContext.Provider>
  );
}

function PathPanel({children}){
  const [path, setPath] = useContext(PathContext);
  return (
    {children} 
  )
}