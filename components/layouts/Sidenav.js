import Link from 'next/link';
import NavLinks from './nav-links';
import Image from 'next/image';

export default function SideNav(props) {
  return (
    <div className="flex h-full flex-col px-3 py-1 mt-20 md:px-2">
      <Link
        className="mb-2 flex h-32 items-center justify-center rounded-md bg-gray-400 p-4 md:h-40 hover:bg-gray-300"
        href="/"
      >
        <div className="w-32 md:w-40">
          <Image
          src="/images/logoBlack.svg"
          width={250}
          height={250}
          className="image"
          alt="NJTD Logo - Black version."
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-start gap-1 space-x-2 md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks path={props.path} />
      </div>
    </div>
  );
}
