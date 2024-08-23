'use client';
import Image from "next/image";
import Link from "next/link";
import { RainbowPanel } from '@/components/ui/panels/RainbowPanel';
import '@/styles/globals.css';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between h-full">
      <div className="z-10 w-full items-center justify-between font-mono  lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">
            SVG Path Generator
          </code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 "
            href="https://www.njtd.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/images/logoBlack.svg"
              width={125}
              height={125}
              className="image"
              alt="NJTD Logo"
              priority
            />
          </Link>
        </div>
      </div>

      <div className="flex w-full h-full">
        <div className="mr-4 w-fit h-60">
      <RainbowPanel>
        <Link
          href='newPath'
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors text-left pl-0"
        >
          <h2 className="mb-3 text-xl font-semibold">
            Create{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Create a new SVG path. You can define your own starting point if you know it, or start with the default one.
          </p>
        </Link>
        </RainbowPanel>
        </div>
        <div className="mr-3 ml-2 w-fit h-60">
        <RainbowPanel>
          <Link
            href="/editPath"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Edit{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
              Edit an existing path by pasting in your code and changing each command individually, or viewing it as a whole and moving the control and end points around.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="mr-2 ml-3 w-fit h-60">
        <RainbowPanel>
          <Link
            href='https://developer.mozilla.org/en-US/docs/Web/SVG'
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Help{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              View the help pages offered by MDN to understand the different aspects and commands used for an SVG path.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="ml-4 w-fit h-60">
        <RainbowPanel>
          <Link
            href="https://www.njtd.xyz"
            className="group rounded-lg border border-transparent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              NJTD{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Check out the rest of my portfolio on my website <span className="siteLink">www.njtd.xyz</span>
            </p>
          </Link>
        </RainbowPanel>
        </div>
      </div>  
    </main>   
  );
}