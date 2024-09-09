'use client';
import {
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  PaintBrushIcon,
  HomeIcon,
  ArrowUpOnSquareIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { path } from '@/lib/store';

const links = [
  { name: 'Create', href: '/path/newPath', icon: PaintBrushIcon },
  { name: 'Edit', href: '/path/editPath', icon: PencilSquareIcon },
  { name: 'Export', href: '/path/exportPath', icon: ArrowUpOnSquareIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon }
];

export default function NavLinks(props) {
  const pathname = usePathname();
  return (
    <>
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
    >
      <HomeIcon className="w-6" style={{width: '50px'}} />
      Home
    </Link>
    {path.length>=1?
      <Link
      key='Path'
      href='/viewPath'
      rel="noopener noreferrer"
      onClick={props.close}
      className={clsx(
        'flex h-min items-center justify-center rounded-md opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === '/viewPath',
        },
      )}
      style={{minWidth: '130px'}}
    >
      <PresentationChartLineIcon className="w-6" style={{minWidth: '50px'}} />
      View Path
    </Link>
      :<></>}
      {links.map((link) => {
        const LinkIcon = link.icon;
        
        return (
          <Link
            key={link.name}
            href={link.href}
            target={link.target?link.target:null}
            rel="noopener noreferrer"
            onClick={props.close}
            className={clsx(
              'flex opacity-95 bg-gradient-to-r from-gray-400 to-50% to-bg-none h-min grow items-center justify-center rounded-md  p-1 text-sm font-medium hover:to-85% hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-r from-gray-500 to-75% to-bg-none text-blue-800': pathname === link.href,
              },
            )}
          >
            <LinkIcon style={{width: '50px'}} />
            {link.name}
          </Link>
        );
      })}
      
    </>
  );
}
