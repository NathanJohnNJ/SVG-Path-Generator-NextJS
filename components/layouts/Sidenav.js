'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const [isOpen, setIsOpen]= useContext(SidebarContext)

  return (
    <div className=" flex flex-col px-3 py-1 mt-20 md:px-2">
      {pathname==="/path/viewPath"?
        <button type="button" onClick={()=>setIsOpen(!isOpen)} className="group mb-2 flex h-fit items-center justify-center rounded-md bg-gray-400 p-4 hover:bg-gray-300 w-1/2 self-center md:w-1/4 md:sticky md:self-start  lg:w-1/4 lg:self-start">
          <Bars3Icon className="group w-6 text-slate-700 hover:text-slate-300 hover:rotate-90" />
        </button>:
        <>
        <Link
        className="invisible mb-2 flex h-0 items-center justify-center rounded-md bg-gray-400 p-4 md:h-40 hover:bg-gray-300 md:visible"
        href="/"
        >
          <div className="w-32">
            <Image
            src="/images/logoBlack.svg"
            width={250}
            height={250}
            className="image"
            alt="NJTD Logo - Black version."
            priority
            />
          </div>
        </Link>
        <button type="button" onClick={()=>setIsOpen(!isOpen)} className="group mb-2 flex h-fit items-center justify-center rounded-md bg-gray-400 p-4 hover:bg-gray-300 w-1/2 self-center md:w-full">
          <Bars3Icon className="group w-6 text-slate-700 hover:text-slate-300 hover:rotate-90" />
        </button>
      </>}
      {isOpen &&
        <div className="flex grow flex-row justify-start gap-1 space-x-2 md:flex-col md:space-x-0 md:space-y-1">
          <NavLinks close={()=>setIsOpen(false)} />
        </div>
      }
      
    </div>
  );
}
