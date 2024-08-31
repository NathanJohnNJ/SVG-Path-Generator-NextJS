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
        'flex h-min grow items-center justify-center gap-2 rounded-md bg-gray-400 p-1 text-sm font-medium hover:bg-gray-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-sky-100 text-blue-600': pathname === '/',
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
        'flex h-min items-center justify-center rounded-md bg-gray-400 p-1 text-sm font-medium hover:bg-gray-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-sky-100 text-blue-600': pathname === '/viewPath',
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
              'flex h-min grow items-center justify-center rounded-md bg-gray-400 p-1 text-sm font-medium hover:bg-gray-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
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
