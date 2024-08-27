'use client';
import { createContext, useState } from 'react';

export const PathContext = createContext();

export default function PathLayout({ children }){
  const [path, setPath] = useState();
  return (
    <PathContext.Provider value={[ path, setPath ]}>
    <section>
      {children}
    </section>
    </PathContext.Provider>
  )
}