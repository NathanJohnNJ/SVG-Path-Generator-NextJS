import Image from "next/image";
import Link from "next/link";
import { RainbowPanel } from '@/components/ui/panels/RainbowPanel';
import '@/styles/globals.css';
import { deletePath } from "@/lib/mongodb/path/mongodb";



export default async function Home() {
  await deletePath();
  return (
    <main className="flex w-full flex-col items-center justify-between h-full">
      <div className="z-10 w-full flex">

        <div className="w-full h-40 justify-center rounded-2xl bg-gradient-to-b from-zinc-800/30 via-zinc-500/50 backdrop-blur-2xl md:h-20 lg:h-40 sm:h-20">
          <div className="mt-2 h-8 md:mt-6 lg:mt-2 sm:mt-6" >
            <code className="font-mono font-bold text-2xl text-center">
              SVG Path Generator
            </code>
          </div>
          <div id="logo" className="flex h-20 justify-center sm:invisible md:invisible lg:visible">
            <Link
              className="items-center"
              href="https://www.njtd.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code className="font-mono font-bold text-xs text-center">
                Brought To You By{" "}
              </code>
              <Image
                src="/images/logoBlack.svg"
                width={100}
                height={100}
                className="ml-2"
                alt="NJTD Logo"
                priority
              />
            </Link>
          </div>
        </div>


        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:hidden">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8"
            href="https://www.njtd.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
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
      
      <div className="flex w-full mt-5 h-full items-center">
        <div className="flex mr-4 w-fit h-fit min-w-40">
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
        <div className="flex mr-3 ml-2 w-fit h-fit min-w-40">
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
              Edit an existing path by pasting in your code and changing each command individually.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="flex mr-2 ml-3 w-fit h-fit min-w-40">
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
              View the help pages offered by MDN to understand the different commands used for an SVG path.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="flex ml-4 w-fit h-fit min-w-40 min-h-48">
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