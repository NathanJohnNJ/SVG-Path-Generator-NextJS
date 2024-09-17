'use client';
import NavLinks from './nav-links';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { createContext, useContext, useState } from 'react';
import clsx from 'clsx';

const SidebarContext = createContext();

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState();

  return (
    <SidebarContext.Provider value={[ isOpen, setIsOpen ]}>
      <SideNav />
    </SidebarContext.Provider>
  );
}

 function SideNav() {
  const [isOpen, setIsOpen]= useContext(SidebarContext);

  return (
    <div className=" flex flex-col py-1">
      <div className="flex mt-12 z-20 items-center justify-center relative group opacity-100 transition duration-700 bg-gradient-to-tr from-transparent via-50% via-stone-600 to-transparent lg:w-1/4 h-14 rounded-md w-1/2 self-center md:w-1/4 md:sticky md:self-start lg:self-start mb-2 hover:cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
        <Bars3Icon className={clsx(
        'w-6 z-50 absolute opacity-100 transition-all duration-700 group-hover:transition-all group-hover:duration-700 text-slate-700 translate-x-0 rotate-0 group-hover:text-rose-300 group-hover:-translate-x-[0.5px] group-hover:rotate-45 group-hover:cursor-pointer', {
          'open' : isOpen === true
        }
      )} />
        <Bars3Icon className={clsx(
        'w-6 z-50 absolute opacity-100 translate-x-0 transition-all duration-700 rotate-0 text-slate-700 group-hover:transition-all group-hover:duration-700 group-hover:text-rose-300 group-hover:-rotate-45 group-hover:translate-x-1 group-hover:cursor-pointer', {
          'open2': isOpen === true
        }
      )} />
        <button type="button" className="absolute z-40 inset-0 h-full w-full items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-bl from-zinc-300 to-90% to-stone-600 p-4 " />
      </div>
      {isOpen &&
        <div className="flex grow flex-row justify-center gap-1 space-x-2 md:flex-col md:space-x-0 md:space-y-1">
          <NavLinks close={()=>setIsOpen(false)} />
        </div>
      }
    </div>
  );
}
