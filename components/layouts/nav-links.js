'use client';
import {
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  PaintBrushIcon,
  HomeIcon,
  ArrowUpOnSquareIcon,
  ArrowPathIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

const links = [
  // { name: 'Export', href: '/path/exportPath', icon: ArrowUpOnSquareIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon }
];

export default function NavLinks(props) {
  const pathname = usePathname();
  const [navCommands, setCommands] = useState(null);

  useEffect(() => {
    let storedValue = localStorage.getItem('path');
    if (storedValue) {
      storedValue = JSON.parse(storedValue) || {}
      const commands = storedValue.commands || []
      setCommands(commands)
    } else {
      setCommands(null);
    }
  }, []);
  return (
    <div className="flex lg:flex-col md:flex-col gap-2 max-w-screen">
    <Link
      key='Home'
      href='/'
      rel="noopener noreferrer"
      onClick={props.close}
      className={clsx(
        'flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/',
        },
      )}
      style={{minWidth: '100px', maxWidth: '180px'}}
    >
      <HomeIcon className="w-6" style={{width: '50px'}} />
      Home
    </Link>
    {navCommands?
      <>
      <Link
      key='Path'
      href='/path/viewPath'
      rel="noopener noreferrer"
      onClick={props.close}
      className={clsx(
        'flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/viewPath',
        },
      )}
      style={{minWidth: '100px', maxWidth: '180px'}}
      >
        <PresentationChartLineIcon className="w-6" style={{minWidth: '50px'}} />
        View Path
      </Link>
      <div className="group relative flex flex-col gap-4">
        <p className={clsx('group flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        { 'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/viewPath' })}
        style={{minWidth: '100px', maxWidth: '180px', minHeight: '65px'}}>
          <ArrowPathIcon className="w-6" style={{width: '50px'}} />
          Start Again?
        </p>
        <div className="hidden group-hover:flex flex-row md:flex-col gap-4 absolute md:left-[160px] md:top-[0px] top-[70px]">
          <Link
          key='Create'
          href='/path/newPath'
          rel="noopener noreferrer"
          onClick={props.close}
          className={clsx('group flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-500 to-99% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
          { 'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/path/newPath' })}
          style={{minWidth: '100px', maxWidth: '180px'}}
          >
            <PaintBrushIcon className="w-6" style={{minWidth: '50px'}} />
            Create Path
          </Link>
          <Link
          key='Edit'
          href='/path/editPath'
          rel="noopener noreferrer"
          onClick={props.close}
          className={clsx('group flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-500 to-99% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3', { 'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/path/editPath' })}
          style={{minWidth: '100px', maxWidth: '180px'}}
          >
            <PencilSquareIcon className="w-6" style={{minWidth: '50px'}} />
            Edit Path
          </Link>
        </div>
      </div>
    </>
      :
      <>
        <Link
        key='Create'
        href='/path/newPath'
        rel="noopener noreferrer"
        onClick={props.close}
        className={clsx('flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/path/createPath'})}
        style={{minWidth: '100px', maxWidth: '180px'}}
        >
          <PaintBrushIcon className="w-6" style={{minWidth: '50px'}} />
          Create Path
        </Link>
        <Link
        key='Edit'
        href='/path/editPath'
        rel="noopener noreferrer"
        onClick={props.close}
        className={clsx('flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',  {'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/path/editPath'})}
        style={{minWidth: '100px', maxWidth: '180px'}}
        >
          <PencilSquareIcon className="w-6" style={{minWidth: '50px'}} />
          Edit Path
        </Link>
      </>
      }
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
          key={link.name}
          href={link.href}
          target={link.target?link.target:null}
          rel="noopener noreferrer"
          onClick={props.close}
          className={clsx('flex opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none h-min grow items-center justify-center rounded-md  p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3', {'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === link.href})}
          style={{minWidth: '100px', maxWidth: '180px'}}
          >
            <LinkIcon style={{width: '50px'}} />
            {link.name}
          </Link>
        );
      })}
      <Link
      key='NJTD'
      href="https://www.njtd.xyz"
      target="_blank"
      rel="noopener noreferrer"
      onClick={props.close}
      className='flex opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none h-min grow items-center justify-center rounded-md  p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
      style={{minWidth: '100px', maxWidth: '180px'}}>
        <Image src="/images/logoBlack.svg" width={50} height={50} alt="NJTD Logo - Black version." />
        NJTD
      </Link>
    </div>
  );
}
